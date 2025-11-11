/**
 * 本地存储工具
 */

const PREFIX = 'nav_app_'

export const storage = {
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value)
      localStorage.setItem(PREFIX + key, serializedValue)
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  },

  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(PREFIX + key)
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  },

  clear() {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach((key) => {
        if (key.startsWith(PREFIX)) {
          localStorage.removeItem(key)
        }
      })
      return true
    } catch (error) {
      console.error('Storage clear error:', error)
      return false
    }
  },
}
