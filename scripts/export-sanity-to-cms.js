/**
 * One-way snapshot: Sanity → local _data/cms (does not write to Sanity).
 * Run from site-cloudcannon: node scripts/export-sanity-to-cms.js
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

function write(name, data) {
  const file = path.join(OUT, name)
  fs.mkdirSync(path.dirname(file), {recursive: true})
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
  console.log(`  wrote ${name} (${Array.isArray(data) ? data.length + ' items' : typeof data})`)
}

async function run() {
  fs.mkdirSync(OUT, {recursive: true})
  console.log('Exporting Sanity →', OUT)

  const serviceTimes = await client.fetch(`
    *[_type == "serviceTime"] | order(order asc) {
      _id, name, day, time, description, group, order, active
    }
  `)
  write('serviceTimes.json', serviceTimes)

  const people = await client.fetch(`
    *[_type == "person"] | order(order asc) {
      _id, name, role, group, email, order,
      "bio": bio[].children[].text,
      "photoUrl": photo.asset->url
    }
  `)
  write('people.json', people)

  const roomRates = await client.fetch(`
    *[_type == "roomHireRate"] | order(order asc) {
      _id, room, note, rate, capacity, featured, order
    }
  `)
  write('roomRates.json', roomRates)

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
  // Unique by slug (skip empty / placeholder tests)
  const eventSlugs = new Set()
  const eventsUnique = []
  for (const e of events) {
    const slug = e.slug || ''
    if (!slug || slug === 'test' || (e.title || '').trim().toLowerCase() === 'test') continue
    if (eventSlugs.has(slug)) continue
    eventSlugs.add(slug)
    eventsUnique.push(e)
  }
  write('events.json', eventsUnique)

  const news = await client.fetch(`
    *[_type == "newsPost"] | order(date desc) {
      _id, title, "slug": slug.current, date, summary, body,
      "imageUrl": image.asset->url
    }
  `)
  write('news.json', news)

  const siteImages = await client.fetch(`
    *[_type == "siteImage"] | order(key asc) {
      _id, key, label, alt, "url": image.asset->url
    }
  `)
  write('siteImages.json', siteImages)

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
  write('sitePages.json', sitePages)

  // Per-page files for CloudCannon (one document = one editable page)
  const pagesDir = path.join(OUT, 'pages')
  fs.mkdirSync(pagesDir, {recursive: true})
  for (const page of sitePages) {
    const id = page.pageId || page._id
    write(`pages/${id}.json`, page)
  }

  write('_meta.json', {
    exportedAt: new Date().toISOString(),
    source: 'sanity:tqrrtmwq/production',
    note: 'Snapshot for CloudCannon experiment. Does not sync back to Sanity.',
  })

  console.log('Done.')
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
