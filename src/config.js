/**
 * 应用配置
 */

export const config = {
  app: {
    name: '导航应用',
    version: '1.0.0',
    description: '一个现代化的网址导航应用，参考了nav.iowen.cn的设计风格',
  },

  features: {
    search: true,
    darkMode: true,
    gridColumns: true,
    recentLinks: true,
    analytics: true,
    importExport: true,
  },

  defaults: {
    gridColumns: 4,
    darkMode: false,
  },

  storage: {
    prefix: 'nav_app_',
    maxRecentLinks: 20,
  },

  ui: {
    animationDuration: 300,
    autoSave: true,
  },

  api: {
    // 如果需要后端支持，在此添加API配置
    // baseUrl: process.env.VITE_API_BASE_URL,
  },

  seo: {
    title: '导航应用 - 快速访问您喜爱的网站',
    description:
      '一个简洁高效的网址导航网站，收集最流行和最有用的网站导航。提供搜索引擎、社交媒体、开发工具等多个分类。',
    keywords:
      '导航, 网址导航, 网站导航, 快速导航, 上网导航',
  },
}
