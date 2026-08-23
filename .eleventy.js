const { createClient } = require('@sanity/client')

const sanity = createClient({
  projectId: 'tqrrtmwq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

module.exports = function (eleventyConfig) {
  // Pass through all static assets unchanged
  // Paths are relative to the project root (not the input dir)
  eleventyConfig.addPassthroughCopy({ 'assets': 'assets' })
  eleventyConfig.addPassthroughCopy({ 'uploads': 'uploads' })
  eleventyConfig.addPassthroughCopy({ 'tokens': 'tokens' })
  eleventyConfig.addPassthroughCopy({ 'styles.css': 'styles.css' })
  eleventyConfig.addPassthroughCopy({ 'components.css': 'components.css' })
  eleventyConfig.addPassthroughCopy({ 'image-slot.js': 'image-slot.js' })
  // Static HTML pages (all pages not driven by CMS templates)
  eleventyConfig.addPassthroughCopy({ 'ui_kits': 'ui_kits' })

  // Global data: fetch all CMS-driven content from Sanity at build time
  eleventyConfig.addGlobalData('serviceTimes', async () => {
    return sanity.fetch(`
      *[_type == "serviceTime" && active == true] | order(order asc) {
        name, days, time, description, group,
        "pauses": pauses[]{ from, until }
      }
    `)
  })

  eleventyConfig.addGlobalData('people', async () => {
    return sanity.fetch(`
      *[_type == "person"] | order(order asc) {
        name, role, group, email,
        "bio": bio[].children[].text,
        "photoUrl": photo.asset->url
      }
    `)
  })

  eleventyConfig.addGlobalData('roomRates', async () => {
    return sanity.fetch(`
      *[_type == "roomHireRate"] | order(order asc) {
        room, note, rate, capacity, featured
      }
    `)
  })

  eleventyConfig.addGlobalData('events', async () => {
    return sanity.fetch(`
      *[_type == "event"] | order(sortDate desc) {
        title, "slug": slug.current, category, date, sortDate, location,
        deck, summary, featured, thumbnailUrl,
        "thumbnailUploadUrl": thumbnailUpload.asset->url,
        lede,
        "body": body[].children[].text,
        "posters": posters[]{ url, "uploadUrl": upload.asset->url, alt },
        "detailRows": detailRows[]{ label, value }
      }
    `)
  })

  // Global data: fetch replaceable site image slots from Sanity, keyed by slot
  eleventyConfig.addGlobalData('siteImages', async () => {
    const images = await sanity.fetch(`
      *[_type == "siteImage"] {
        key, alt, "url": image.asset->url
      }
    `)
    return images.reduce((acc, i) => { acc[i.key] = i; return acc }, {})
  })

  // Global data: fetch site page content (editable text blocks) from Sanity
  eleventyConfig.addGlobalData('sitePages', async () => {
    const pages = await sanity.fetch(`
      *[_type == "sitePage"] {
        pageId, headline, deck,
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
    // Index by pageId for easy lookup in templates: sitePages['weddings']
    return pages.reduce((acc, p) => { acc[p.pageId] = p; return acc }, {})
  })

  // Nunjucks filter: render a list of weekday names as readable text.
  // Consecutive runs collapse into a range: Mon,Tue,Wed,Thu -> "Mon–Thu".
  eleventyConfig.addFilter('dayLabel', (days) => {
    const ORDER = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const list = (days || []).filter(d => ORDER.includes(d))
    if (!list.length) return ''
    if (list.length === 1) return list[0]
    if (list.length === 7) return 'Every day'
    // Order Monday-first so weekday ranges read naturally
    const weekOrder = ORDER.slice(1).concat(ORDER[0])
    const idx = list.map(d => weekOrder.indexOf(d)).sort((a, b) => a - b)
    const short = i => weekOrder[i].slice(0, 3)
    const runs = []
    let start = idx[0], prev = idx[0]
    for (let i = 1; i <= idx.length; i++) {
      if (i < idx.length && idx[i] === prev + 1) { prev = idx[i]; continue }
      runs.push(start === prev ? weekOrder[start]
              : prev - start === 1 ? `${short(start)} & ${short(prev)}`
              : `${short(start)}\u2013${short(prev)}`)
      if (i < idx.length) { start = idx[i]; prev = idx[i] }
    }
    return runs.join(', ')
  })

  // Nunjucks filter: join bio paragraphs into <p> tags
  eleventyConfig.addFilter('bioParagraphs', (bioArray) => {
    if (!bioArray || !bioArray.length) return ''
    return bioArray.map(t => `<p>${t}</p>`).join('')
  })

  // Nunjucks filter: render Sanity portable text blocks into HTML
  eleventyConfig.addFilter('portableText', (blocks) => {
    if (!blocks || !blocks.length) return ''
    return blocks.map(block => {
      if (block._type !== 'block') return ''
      const tag = block.style === 'h2' ? 'h2' : block.style === 'h3' ? 'h3' : 'p'
      const html = (block.children || []).map(span => {
        let text = (span.text || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
        if (!span.marks || !span.marks.length) return text
        if (span.marks.includes('strong')) text = `<strong>${text}</strong>`
        if (span.marks.includes('em')) text = `<em>${text}</em>`
        // Handle links
        if (block.markDefs) {
          block.markDefs.forEach(def => {
            if (span.marks.includes(def._key) && def._type === 'link') {
              text = `<a href="${def.href}">${text}</a>`
            }
          })
        }
        return text
      }).join('')
      return `<${tag}>${html}</${tag}>`
    }).join('\n')
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
