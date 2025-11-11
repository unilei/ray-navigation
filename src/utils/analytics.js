/**
 * 简单的统计工具
 */

export const analytics = {
  trackClick(linkName, category) {
    const event = {
      type: 'link_click',
      name: linkName,
      category: category,
      timestamp: new Date().toISOString(),
    }

    // 可以在这里添加到服务器的跟踪逻辑
    console.log('Analytics event:', event)
  },

  trackSearch(query) {
    const event = {
      type: 'search',
      query: query,
      timestamp: new Date().toISOString(),
    }

    console.log('Analytics event:', event)
  },

  trackSettingChange(setting, value) {
    const event = {
      type: 'setting_change',
      setting: setting,
      value: value,
      timestamp: new Date().toISOString(),
    }

    console.log('Analytics event:', event)
  },
}
