const { createClient } = require('@sanity/client')

const sanity = createClient({
  projectId: 'tqrrtmwq',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

module.exports = function (eleventyConfig) {
  // Pass through all static assets unchanged
  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPassthroughCopy('uploads')
  eleventyConfig.addPassthroughCopy('tokens')
  eleventyConfig.addPassthroughCopy('styles.css')
  eleventyConfig.addPassthroughCopy('components.css')
  eleventyConfig.addPassthroughCopy('image-slot.js')

  // Global data: fetch all CMS-driven content from Sanity at build time
  eleventyConfig.addGlobalData('serviceTimes', async () => {
    return sanity.fetch(`
      *[_type == "serviceTime" && active == true] | order(order asc) {
        name, day, time, description, group
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

  // Nunjucks filter: join bio paragraphs into <p> tags
  eleventyConfig.addFilter('bioParagraphs', (bioArray) => {
    if (!bioArray || !bioArray.length) return ''
    return bioArray.map(t => `<p>${t}</p>`).join('')
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
