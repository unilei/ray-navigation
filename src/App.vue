<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🧭</span>
          <h1>导航应用</h1>
        </div>
        <div class="search-box">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="搜索网站..."
            @keyup.enter="performSearch"
          >
          <button @click="performSearch">搜索</button>
        </div>
        <div class="header-actions">
          <button class="btn-settings" @click="showSettings = !showSettings" title="设置">
            ⚙️
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="categories-container">
        <div v-for="category in filteredCategories" :key="category.id" class="category">
          <div class="category-header">
            <h2>{{ category.icon }} {{ category.name }}</h2>
            <span class="item-count">{{ category.links.length }}</span>
          </div>
          <div class="links-grid">
            <a 
              v-for="link in category.links" 
              :key="link.id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="link-card"
              :title="link.description"
              @click="handleLinkClick(link, category.name)"
            >
              <div class="link-icon">{{ link.icon }}</div>
              <div class="link-content">
                <h3>{{ link.name }}</h3>
                <p>{{ link.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div v-if="filteredCategories.length === 0 && searchQuery" class="no-results">
        <p>没有找到匹配的网站</p>
      </div>
    </main>

    <footer class="footer">
      <p>© 2024 导航应用 | 让您快速访问最常用的网站</p>
    </footer>

    <div v-if="showSettings" class="settings-modal">
      <div class="modal-overlay" @click="showSettings = false"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>设置</h2>
          <button class="close-btn" @click="showSettings = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="setting-item">
            <label>
              <input type="checkbox" v-model="darkMode">
              深色模式
            </label>
          </div>
          <div class="setting-item">
            <label>
              显示分类数量
              <input type="checkbox" v-model="showCategories">
            </label>
          </div>
          <div class="setting-item">
            <label>
              网格列数
              <select v-model.number="gridColumns">
                <option :value="2">2列</option>
                <option :value="3">3列</option>
                <option :value="4">4列</option>
                <option :value="5">5列</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { navigationData } from './data/navigation'
import { storage } from './utils/storage'
import { analytics } from './utils/analytics'

export default {
  name: 'App',
  setup() {
    const searchQuery = ref('')
    const showSettings = ref(false)
    const darkMode = ref(false)
    const showCategories = ref(true)
    const gridColumns = ref(4)
    const recentLinks = ref([])

    // Load settings from localStorage
    onMounted(() => {
      const savedDarkMode = storage.get('darkMode', false)
      const savedGridColumns = storage.get('gridColumns', 4)
      const savedRecentLinks = storage.get('recentLinks', [])
      
      darkMode.value = savedDarkMode
      gridColumns.value = savedGridColumns
      recentLinks.value = savedRecentLinks
      
      // Apply dark mode if previously enabled
      if (darkMode.value) {
        document.documentElement.classList.add('dark')
      }
      document.documentElement.style.setProperty('--grid-columns', gridColumns.value)
    })

    // Save settings to localStorage
    watch(darkMode, (newVal) => {
      storage.set('darkMode', newVal)
      document.documentElement.classList.toggle('dark', newVal)
      analytics.trackSettingChange('darkMode', newVal)
    })

    watch(gridColumns, (newVal) => {
      storage.set('gridColumns', newVal)
      document.documentElement.style.setProperty('--grid-columns', newVal)
      analytics.trackSettingChange('gridColumns', newVal)
    })

    const filteredCategories = computed(() => {
      if (!searchQuery.value.trim()) {
        return navigationData.categories
      }

      const query = searchQuery.value.toLowerCase()
      return navigationData.categories
        .map(category => ({
          ...category,
          links: category.links.filter(link => 
            link.name.toLowerCase().includes(query) ||
            link.description.toLowerCase().includes(query)
          )
        }))
        .filter(category => category.links.length > 0)
    })

    const handleLinkClick = (link, category) => {
      analytics.trackClick(link.name, category)
      
      // Add to recent links
      const recentLinkIndex = recentLinks.value.findIndex(l => l.id === link.id)
      if (recentLinkIndex !== -1) {
        recentLinks.value.splice(recentLinkIndex, 1)
      }
      recentLinks.value.unshift({
        ...link,
        category: category
      })
      if (recentLinks.value.length > 20) {
        recentLinks.value.pop()
      }
      storage.set('recentLinks', recentLinks.value)
    }

    const performSearch = () => {
      analytics.trackSearch(searchQuery.value)
      // Search functionality - already handled by computed property
    }

    const clearSearch = () => {
      searchQuery.value = ''
    }

    return {
      searchQuery,
      showSettings,
      darkMode,
      showCategories,
      gridColumns,
      filteredCategories,
      recentLinks,
      performSearch,
      clearSearch,
      handleLinkClick
    }
  }
}
</script>

<style scoped lang="scss">
// Styles are in main.scss to maintain organization
</style>
