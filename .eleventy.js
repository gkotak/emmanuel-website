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

function loadSitePages() {
  const pagesDir = path.join(CMS, 'pages')
  if (fs.existsSync(pagesDir)) {
    const out = {}
    for (const name of fs.readdirSync(pagesDir)) {
      if (!name.endsWith('.json')) continue
      const page = JSON.parse(fs.readFileSync(path.join(pagesDir, name), 'utf8'))
      if (page.pageId) out[page.pageId] = page
    }
    return out
  }
  const list = readJson('sitePages.json', [])
  return list.reduce((acc, p) => {
    if (p.pageId) acc[p.pageId] = p
    return acc
  }, {})
}

function loadSiteImages() {
  const list = readJson('siteImages.json', [])
  return list.reduce((acc, i) => {
    if (i.key) acc[i.key] = i
    return acc
  }, {})
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({assets: 'assets'})
  eleventyConfig.addPassthroughCopy({uploads: 'uploads'})
  eleventyConfig.addPassthroughCopy({tokens: 'tokens'})
  eleventyConfig.addPassthroughCopy({'styles.css': 'styles.css'})
  eleventyConfig.addPassthroughCopy({'components.css': 'components.css'})
  eleventyConfig.addPassthroughCopy({'image-slot.js': 'image-slot.js'})
  eleventyConfig.addPassthroughCopy({ui_kits: 'ui_kits'})
  // CloudCannon preview root → website kit
  eleventyConfig.addPassthroughCopy({'index.html': 'index.html'})

  eleventyConfig.addGlobalData('cmsMeta', () => readJson('_meta.json', {}))

  eleventyConfig.addGlobalData('serviceTimes', () => {
    const all = readJson('serviceTimes.json', [])
    return all.filter((s) => s.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  eleventyConfig.addGlobalData('people', () => {
    return readJson('people.json', []).sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  eleventyConfig.addGlobalData('roomRates', () => {
    return readJson('roomRates.json', []).sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  eleventyConfig.addGlobalData('events', () => readJson('events.json', []))

  eleventyConfig.addGlobalData('news', () => readJson('news.json', []))

  eleventyConfig.addGlobalData('siteImages', () => loadSiteImages())

  eleventyConfig.addGlobalData('sitePages', () => loadSitePages())

  eleventyConfig.addFilter('bioParagraphs', (bioArray) => {
    if (!bioArray || !bioArray.length) return ''
    return bioArray.map((t) => `<p>${t}</p>`).join('')
  })

  // Same shape as Sanity portable text (exported blocks)
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
