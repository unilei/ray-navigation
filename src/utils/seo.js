/**
 * SEO 和元标签管理
 */

export const updatePageMeta = (title, description, image) => {
  document.title = title

  updateMetaTag('meta[name="description"]', 'content', description)
  updateMetaTag('meta[property="og:title"]', 'content', title)
  updateMetaTag('meta[property="og:description"]', 'content', description)
  updateMetaTag('meta[property="og:image"]', 'content', image)
  updateMetaTag('meta[name="twitter:title"]', 'content', title)
  updateMetaTag('meta[name="twitter:description"]', 'content', description)
  updateMetaTag('meta[name="twitter:image"]', 'content', image)
}

const updateMetaTag = (selector, attribute, value) => {
  let element = document.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    if (selector.includes('property')) {
      element.setAttribute(
        'property',
        selector.match(/property="([^"]+)"/)[1]
      )
    } else {
      element.setAttribute(
        'name',
        selector.match(/name="([^"]+)"/)[1]
      )
    }
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

export const structuredData = {
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '导航应用',
    description: '一个现代化的网址导航应用',
    url: 'https://example.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://example.com?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  },

  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '导航应用',
    description: '现代化网址导航应用',
    url: 'https://example.com',
    logo: 'https://example.com/logo.png',
    sameAs: [
      'https://twitter.com/navapp',
      'https://github.com/navapp',
    ],
  },
}
