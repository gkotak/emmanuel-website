/**
 * CloudCannon experiment build — reads local `_data/cms` only.
 * Does NOT call Sanity at build time (Sanity on `site/` / main is untouched).
 */
const fs = require('fs')
const path = require('path')

const CMS = path.join(__dirname, '_data/cms')

function readJson(file, fallback) {
  const full = path.join(CMS, file)
  if (!fs.existsSync(full)) return fallback
  return JSON.parse(fs.readFileSync(full, 'utf8'))
}

function readJsonDir(dir) {
  const full = path.join(CMS, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((n) => n.endsWith('.json'))
    .map((n) => {
      const data = JSON.parse(fs.readFileSync(path.join(full, n), 'utf8'))
      data._slug = n.replace(/\.json$/, '')
      return data
    })
}

function loadSitePages() {
  const pages = readJsonDir('pages')
  return pages.reduce((acc, p) => {
    if (p.pageId) acc[p.pageId] = p
    return acc
  }, {})
}

function loadSiteImages() {
  return readJsonDir('site-images').reduce((acc, i) => {
    if (i.key) acc[i.key] = i
    return acc
  }, {})
}

/** Map legacy `day` strings onto `days[]` + ensure `pauses` exists (main calendar shape). */
function normalizeServiceTime(s) {
  const RANGE = {
    'Mon–Thu': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    'Mon-Thu': ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  }
  if (!Array.isArray(s.days) || !s.days.length) {
    if (s.day && RANGE[s.day]) s.days = RANGE[s.day]
    else if (s.day) s.days = [s.day]
    else s.days = []
  }
  if (!Array.isArray(s.pauses)) s.pauses = []
  return s
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({assets: 'assets'})
  eleventyConfig.addPassthroughCopy({uploads: 'uploads'})
  eleventyConfig.addPassthroughCopy({tokens: 'tokens'})
  eleventyConfig.addPassthroughCopy({'styles.css': 'styles.css'})
  eleventyConfig.addPassthroughCopy({'components.css': 'components.css'})
  eleventyConfig.addPassthroughCopy({'image-slot.js': 'image-slot.js'})
  eleventyConfig.addPassthroughCopy({ui_kits: 'ui_kits'})
  eleventyConfig.addPassthroughCopy({'index.html': 'index.html'})

  eleventyConfig.addGlobalData('cmsMeta', () => readJson('_meta.json', {}))

  eleventyConfig.addGlobalData('serviceTimes', () => {
    return readJsonDir('service-times')
      .filter((s) => s.active !== false)
      .map((s) => normalizeServiceTime(s))
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  eleventyConfig.addGlobalData('people', () => {
    return readJsonDir('people').sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  eleventyConfig.addGlobalData('roomRates', () => {
    return readJsonDir('room-rates').sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  eleventyConfig.addGlobalData('events', () => {
    return readJsonDir('events').sort((a, b) => String(b.sortDate || '').localeCompare(String(a.sortDate || '')))
  })

  eleventyConfig.addGlobalData('news', () => readJsonDir('news'))

  eleventyConfig.addGlobalData('siteImages', () => loadSiteImages())

  eleventyConfig.addGlobalData('sitePages', () => loadSitePages())

  // Nunjucks filter: render a list of weekday names as readable text.
  // Consecutive runs collapse into a range: Mon,Tue,Wed,Thu -> "Mon–Thu".
  eleventyConfig.addFilter('dayLabel', (days) => {
    const ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const list = (days || []).filter((d) => ORDER.includes(d))
    if (!list.length) return ''
    if (list.length === 1) return list[0]
    if (list.length === 7) return 'Every day'
    // Order Monday-first so weekday ranges read naturally
    const weekOrder = ORDER.slice(1).concat(ORDER[0])
    const idx = list.map((d) => weekOrder.indexOf(d)).sort((a, b) => a - b)
    const short = (i) => weekOrder[i].slice(0, 3)
    const runs = []
    let start = idx[0],
      prev = idx[0]
    for (let i = 1; i <= idx.length; i++) {
      if (i < idx.length && idx[i] === prev + 1) {
        prev = idx[i]
        continue
      }
      runs.push(
        start === prev
          ? weekOrder[start]
          : prev - start === 1
            ? `${short(start)} & ${short(prev)}`
            : `${short(start)}\u2013${short(prev)}`
      )
      if (i < idx.length) {
        start = idx[i]
        prev = idx[i]
      }
    }
    return runs.join(', ')
  })

  eleventyConfig.addFilter('bioParagraphs', (bioArray) => {
    if (!bioArray || !bioArray.length) return ''
    return bioArray.map((t) => `<p>${t}</p>`).join('')
  })

  /** Look up one collection item by filename slug (e.g. sung-eucharist). */
  eleventyConfig.addFilter('bySlug', (items, slug) => {
    if (!items || !slug) return null
    return items.find((i) => i._slug === slug || i.pageId === slug) || null
  })

  /** Resolve [{slug, body?}, ...] against serviceTimes (optional page body override). */
  eleventyConfig.addFilter('resolveServices', (refs, serviceTimes) => {
    if (!refs || !refs.length) return []
    return refs
      .map((ref) => {
        const slug = typeof ref === 'string' ? ref : ref.slug
        const svc = (serviceTimes || []).find((s) => s._slug === slug)
        if (!svc) return null
        const body = typeof ref === 'object' && ref.body ? ref.body : svc.description
        return Object.assign({}, svc, {cardBody: body})
      })
      .filter(Boolean)
  })

  /** Resolve [slug | {slug}, ...] against people collection. */
  eleventyConfig.addFilter('resolvePeople', (slugs, people) => {
    if (!slugs || !slugs.length) return []
    return slugs
      .map((ref) => {
        const slug = typeof ref === 'string' ? ref : ref && ref.slug
        return (people || []).find((p) => p._slug === slug)
      })
      .filter(Boolean)
  })

  eleventyConfig.addFilter('portableText', (blocks) => {
    if (!blocks || !blocks.length) return ''
    return blocks
      .map((block) => {
        if (block._type !== 'block') return ''
        const tag = block.style === 'h2' ? 'h2' : block.style === 'h3' ? 'h3' : 'p'
        const html = (block.children || [])
          .map((span) => {
            let text = (span.text || '')
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
            if (!span.marks || !span.marks.length) return text
            if (span.marks.includes('strong')) text = `<strong>${text}</strong>`
            if (span.marks.includes('em')) text = `<em>${text}</em>`
            if (block.markDefs) {
              block.markDefs.forEach((def) => {
                if (span.marks.includes(def._key) && def._type === 'link') {
                  text = `<a href="${def.href}">${text}</a>`
                }
              })
            }
            return text
          })
          .join('')
        return `<${tag}>${html}</${tag}>`
      })
      .join('\n')
  })

  return {
    dir: {
      input: '_templates',
      output: 'dist',
      includes: '_includes',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
