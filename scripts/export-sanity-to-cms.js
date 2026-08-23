/**
 * One-way snapshot: Sanity → local `_data/cms/*/item.json` (does not write to Sanity).
 * Run: node scripts/export-sanity-to-cms.js
 */
const fs = require('fs')
const path = require('path')
const {createClient} = require('@sanity/client')

function resolveToken() {
  const candidates = [
    path.join(__dirname, '../../studio/.env'),
    path.join(__dirname, '../.env'),
    path.join(__dirname, '../../.claude/settings.json'),
  ]
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue
    const text = fs.readFileSync(file, 'utf8')
    const m = text.match(/SANITY_TOKEN=(sk[A-Za-z0-9._-]+)/) || text.match(/SANITY_TOKEN=(.+)/)
    if (m) return m[1].trim().replace(/^["']|["']$/g, '')
  }
  if (process.env.SANITY_TOKEN) return process.env.SANITY_TOKEN
  throw new Error('No SANITY_TOKEN found (studio/.env or SANITY_TOKEN env)')
}

const client = createClient({
  projectId: 'tqrrtmwq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: resolveToken(),
  useCdn: false,
})

const OUT = path.join(__dirname, '../_data/cms')

function slugify(s, fallback = 'item') {
  const base = String(s || fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return base || fallback
}

function writeCollection(dir, items, keyFields) {
  const dest = path.join(OUT, dir)
  fs.mkdirSync(dest, {recursive: true})
  for (const f of fs.readdirSync(dest).filter((n) => n.endsWith('.json'))) {
    fs.unlinkSync(path.join(dest, f))
  }
  const used = new Set()
  items.forEach((item, i) => {
    let base
    for (const k of keyFields) {
      if (item[k]) {
        base = slugify(String(item[k]))
        break
      }
    }
    base = base || `item-${i + 1}`
    let name = base
    let n = 2
    while (used.has(name)) {
      name = `${base}-${n++}`
    }
    used.add(name)
    fs.writeFileSync(path.join(dest, `${name}.json`), JSON.stringify(item, null, 2) + '\n')
  })
  console.log(`  wrote ${dir}/ (${items.length} files)`)
}

async function run() {
  fs.mkdirSync(OUT, {recursive: true})
  console.log('Exporting Sanity →', OUT)

  writeCollection(
    'service-times',
    await client.fetch(`*[_type == "serviceTime"] | order(order asc) {
      _id, name, day, time, description, group, order, active
    }`),
    ['name', '_id'],
  )

  writeCollection(
    'people',
    await client.fetch(`*[_type == "person"] | order(order asc) {
      _id, name, role, group, email, order,
      "bio": bio[].children[].text,
      "photoUrl": photo.asset->url
    }`),
    ['name', '_id'],
  )

  writeCollection(
    'room-rates',
    await client.fetch(`*[_type == "roomHireRate"] | order(order asc) {
      _id, room, note, rate, capacity, featured, order
    }`),
    ['room', '_id'],
  )

  const events = await client.fetch(`
    *[_type == "event" && !(_id in path("drafts.**"))] | order(sortDate desc) {
      _id, title, "slug": slug.current, category, date, sortDate, location,
      deck, summary, featured, thumbnailUrl,
      "thumbnailUploadUrl": thumbnailUpload.asset->url,
      lede,
      "body": body[].children[].text,
      "posters": posters[]{ url, "uploadUrl": upload.asset->url, alt },
      "detailRows": detailRows[]{ label, value }
    }
  `)
  const eventSlugs = new Set()
  const eventsUnique = []
  for (const e of events) {
    const slug = e.slug || ''
    if (!slug || slug === 'test' || (e.title || '').trim().toLowerCase() === 'test') continue
    if (eventSlugs.has(slug)) continue
    eventSlugs.add(slug)
    eventsUnique.push(e)
  }
  writeCollection('events', eventsUnique, ['slug', 'title', '_id'])

  writeCollection(
    'news',
    await client.fetch(`*[_type == "newsPost"] | order(date desc) {
      _id, title, "slug": slug.current, date, summary, body,
      "imageUrl": image.asset->url
    }`),
    ['slug', 'title', '_id'],
  )

  writeCollection(
    'site-images',
    await client.fetch(`*[_type == "siteImage"] | order(key asc) {
      _id, key, label, alt, "url": image.asset->url
    }`),
    ['key', 'label', '_id'],
  )

  const sitePages = await client.fetch(`
    *[_type == "sitePage"] | order(pageId asc) {
      _id, pageId, headline, deck,
      introBody,
      sections[]{
        _type, _key, eyebrow, heading, body, quote, cite, reverse, imageAlt, isBand, layout, imagePath,
        "imageUrl": image.asset->url,
        cards[]{ _key, eyebrow, title, body },
        people[]{ _key, role, name, bio, imagePath, "imageUrl": image.asset->url }
      },
      calloutHeading, calloutBody
    }
  `)
  const pagesDir = path.join(OUT, 'pages')
  fs.mkdirSync(pagesDir, {recursive: true})
  for (const f of fs.readdirSync(pagesDir).filter((n) => n.endsWith('.json'))) {
    fs.unlinkSync(path.join(pagesDir, f))
  }
  for (const page of sitePages) {
    const id = page.pageId || page._id
    fs.writeFileSync(path.join(pagesDir, `${id}.json`), JSON.stringify(page, null, 2) + '\n')
  }
  console.log(`  wrote pages/ (${sitePages.length} files)`)

  fs.writeFileSync(
    path.join(OUT, '_meta.json'),
    JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        source: 'sanity:tqrrtmwq/production',
        note: 'Snapshot for CloudCannon experiment. Does not sync back to Sanity.',
      },
      null,
      2,
    ) + '\n',
  )

  console.log('Done.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
