# 调试示例 (Debug Examples)

本文档提供实际的调试代码示例，帮助你快速在项目中实施调试。

## 目录

- [使用调试工具函数](#使用调试工具函数)
- [组件调试示例](#组件调试示例)
- [性能调试示例](#性能调试示例)
- [数据追踪示例](#数据追踪示例)
- [错误处理示例](#错误处理示例)

---

## 使用调试工具函数

项目包含 `src/utils/debug.js` 调试工具库，提供便捷的调试函数。

### 基础日志输出

```javascript
import { devLog, devWarn, devError } from './utils/debug'

// 普通日志（仅在开发模式下输出）
devLog('用户点击了搜索按钮')

// 警告日志
devWarn('搜索查询为空')

// 错误日志
devError('无法加载导航数据', error)
```

### 表格数据展示

```javascript
import { devTable } from './utils/debug'

// 以表格形式展示数组数据
const categories = [
  { id: 1, name: '搜索引擎', count: 4 },
  { id: 2, name: '社交媒体', count: 6 }
]
devTable(categories, '分类数据')
```

### 分组日志

```javascript
import { devGroup } from './utils/debug'

devGroup('搜索功能执行', () => {
  console.log('搜索查询:', query)
  console.log('过滤结果数量:', results.length)
  console.log('执行时间:', duration)
})
```

### 性能计时

```javascript
import { devTimer } from './utils/debug'

const stopTimer = devTimer('搜索操作')
// 执行需要计时的操作
performSearch()
stopTimer() // 输出: ⏱️ [Dev] 搜索操作 - 完成 (15.42ms)
```

---

## 组件调试示例

### 1. 在 App.vue 中添加调试

```vue
<script>
import { ref, computed, onMounted, watch } from 'vue'
import { navigationData } from './data/navigation'
import { devLog, devTable, debugLifecycle, debugRef } from './utils/debug'

export default {
  name: 'App',
  setup() {
    const searchQuery = ref('')
    const darkMode = ref(false)
    
    // 添加生命周期调试
    const { onMounted: debugOnMounted, onUpdated: debugOnUpdated } = debugLifecycle('App')
    
    onMounted(() => {
      debugOnMounted()
      
      // 打印初始数据
      devLog('应用已挂载')
      devTable(navigationData.categories, '导航分类')
      
      // 追踪响应式数据变化
      debugRef(searchQuery, 'searchQuery')
      debugRef(darkMode, 'darkMode')
    })
    
    // 调试计算属性
    const filteredCategories = computed(() => {
      devLog('计算 filteredCategories')
      
      if (!searchQuery.value.trim()) {
        return navigationData.categories
      }
      
      const query = searchQuery.value.toLowerCase()
      const result = navigationData.categories
        .map(category => ({
          ...category,
          links: category.links.filter(link => 
            link.name.toLowerCase().includes(query) ||
            link.description.toLowerCase().includes(query)
          )
        }))
        .filter(category => category.links.length > 0)
      
      devLog(`搜索 "${query}" 找到 ${result.length} 个分类`)
      return result
    })
    
    return {
      searchQuery,
      darkMode,
      filteredCategories
    }
  }
}
</script>
```

### 2. 调试搜索功能

```javascript
const performSearch = () => {
  devLog('执行搜索:', searchQuery.value)
  
  const stopTimer = devTimer('搜索过滤')
  
  const results = filteredCategories.value
  
  stopTimer()
  
  devGroup('搜索结果', () => {
    console.log('查询:', searchQuery.value)
    console.log('找到分类数:', results.length)
    console.log('总链接数:', results.reduce((sum, cat) => sum + cat.links.length, 0))
  })
  
  if (results.length === 0) {
    devWarn('没有找到匹配结果')
  }
}
```

### 3. 调试本地存储

```javascript
import { storage } from './utils/storage'
import { devLog, devError, checkLocalStorage } from './utils/debug'

onMounted(() => {
  // 检查 localStorage 可用性
  if (!checkLocalStorage()) {
    devError('LocalStorage 不可用，设置将无法保存')
    return
  }
  
  // 加载设置
  const savedDarkMode = storage.get('darkMode', false)
  devLog('加载的深色模式设置:', savedDarkMode)
  
  darkMode.value = savedDarkMode
})

watch(darkMode, (newVal) => {
  devLog('深色模式变化:', newVal)
  storage.set('darkMode', newVal)
  devLog('已保存到 localStorage')
})
```

---

## 性能调试示例

### 1. 组件渲染性能

```javascript
import { getComponentStats } from './utils/debug'

export default {
  name: 'App',
  setup() {
    const stats = getComponentStats('App')
    
    onMounted(() => {
      const startTime = stats.startRender()
      
      // 组件初始化操作
      loadData()
      setupEventListeners()
      
      stats.endRender(startTime)
    })
    
    onUpdated(() => {
      const startTime = stats.startRender()
      
      // 组件更新操作
      
      stats.endRender(startTime)
    })
    
    // 获取统计数据
    onUnmounted(() => {
      const performanceData = stats.getStats()
      console.log('组件性能统计:', performanceData)
    })
  }
}
```

### 2. 搜索性能优化

```javascript
import { devTimer, devLog } from './utils/debug'

const filteredCategories = computed(() => {
  const stopTimer = devTimer('过滤计算')
  
  if (!searchQuery.value.trim()) {
    stopTimer()
    return navigationData.categories
  }
  
  const query = searchQuery.value.toLowerCase()
  const startCount = navigationData.categories.reduce(
    (sum, cat) => sum + cat.links.length, 0
  )
  
  const result = navigationData.categories
    .map(category => ({
      ...category,
      links: category.links.filter(link => 
        link.name.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query)
      )
    }))
    .filter(category => category.links.length > 0)
  
  const endCount = result.reduce((sum, cat) => sum + cat.links.length, 0)
  
  stopTimer()
  devLog(`过滤: ${startCount} → ${endCount} 个链接`)
  
  return result
})
```

---

## 数据追踪示例

### 1. 追踪用户交互

```javascript
const handleLinkClick = (link, category) => {
  devLog('链接点击', {
    链接名称: link.name,
    所属分类: category,
    URL: link.url,
    时间: new Date().toLocaleTimeString()
  })
  
  analytics.trackClick(link.name, category)
  
  // 更新最近访问
  updateRecentLinks(link, category)
}

const updateRecentLinks = (link, category) => {
  devLog('更新最近访问列表')
  
  const before = recentLinks.value.length
  
  // 更新逻辑...
  
  const after = recentLinks.value.length
  devLog(`最近访问: ${before} → ${after}`)
  
  devTable(recentLinks.value.slice(0, 5), '最近访问的链接（前5个）')
}
```

### 2. 追踪设置变化

```javascript
watch(darkMode, (newVal, oldVal) => {
  devGroup('主题切换', () => {
    console.log('旧值:', oldVal)
    console.log('新值:', newVal)
    console.log('当前 HTML class:', document.documentElement.className)
  })
  
  storage.set('darkMode', newVal)
  document.documentElement.classList.toggle('dark', newVal)
})

watch(gridColumns, (newVal, oldVal) => {
  devLog(`网格列数变化: ${oldVal} → ${newVal}`)
  storage.set('gridColumns', newVal)
  document.documentElement.style.setProperty('--grid-columns', newVal)
})
```

---

## 错误处理示例

### 1. 安全的数据加载

```javascript
import { devError, devWarn } from './utils/debug'

const loadNavigationData = () => {
  try {
    devLog('加载导航数据...')
    
    if (!navigationData || !navigationData.categories) {
      throw new Error('导航数据格式错误')
    }
    
    if (navigationData.categories.length === 0) {
      devWarn('导航数据为空')
    }
    
    devLog(`成功加载 ${navigationData.categories.length} 个分类`)
    return navigationData
    
  } catch (error) {
    devError('加载导航数据失败:', error)
    // 返回默认数据
    return { categories: [] }
  }
}
```

### 2. LocalStorage 错误处理

```javascript
const saveSettings = (key, value) => {
  try {
    storage.set(key, value)
    devLog(`设置已保存: ${key} = ${value}`)
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      devError('LocalStorage 空间不足')
      // 清理旧数据
      cleanupOldData()
    } else {
      devError('保存设置失败:', error)
    }
  }
}
```

### 3. 搜索错误处理

```javascript
const performSearch = () => {
  try {
    if (!searchQuery.value) {
      devWarn('搜索查询为空')
      return
    }
    
    devLog('执行搜索:', searchQuery.value)
    
    const results = filteredCategories.value
    
    if (results.length === 0) {
      devLog('没有找到匹配结果')
    } else {
      devLog(`找到 ${results.length} 个匹配分类`)
    }
    
    analytics.trackSearch(searchQuery.value)
    
  } catch (error) {
    devError('搜索失败:', error)
  }
}
```

---

## 实际调试场景

### 场景 1: 调试搜索不工作

```javascript
// 在 App.vue 中添加
const filteredCategories = computed(() => {
  console.log('=== 搜索调试 ===')
  console.log('1. 搜索查询:', searchQuery.value)
  console.log('2. 是否为空:', !searchQuery.value.trim())
  
  if (!searchQuery.value.trim()) {
    console.log('3. 返回所有分类')
    return navigationData.categories
  }
  
  const query = searchQuery.value.toLowerCase()
  console.log('4. 小写查询:', query)
  
  const result = navigationData.categories.map(category => {
    console.log(`5. 处理分类: ${category.name}`)
    
    const filteredLinks = category.links.filter(link => {
      const matchName = link.name.toLowerCase().includes(query)
      const matchDesc = link.description.toLowerCase().includes(query)
      const match = matchName || matchDesc
      
      console.log(`  - ${link.name}: ${match} (名称:${matchName}, 描述:${matchDesc})`)
      return match
    })
    
    console.log(`  → 找到 ${filteredLinks.length} 个链接`)
    
    return { ...category, links: filteredLinks }
  }).filter(category => {
    const hasLinks = category.links.length > 0
    console.log(`6. ${category.name} 有链接: ${hasLinks}`)
    return hasLinks
  })
  
  console.log('7. 最终结果:', result.length, '个分类')
  console.log('=== 搜索调试结束 ===')
  
  return result
})
```

### 场景 2: 调试深色模式不保存

```javascript
// 添加详细的深色模式调试
watch(darkMode, (newVal) => {
  console.log('=== 深色模式变化 ===')
  console.log('新值:', newVal)
  
  // 检查 localStorage
  console.log('LocalStorage 测试:', checkLocalStorage())
  
  try {
    storage.set('darkMode', newVal)
    console.log('已保存到 localStorage')
    
    // 验证保存
    const saved = storage.get('darkMode')
    console.log('验证读取:', saved)
    console.log('保存成功:', saved === newVal)
  } catch (error) {
    console.error('保存失败:', error)
  }
  
  // 应用样式
  document.documentElement.classList.toggle('dark', newVal)
  console.log('HTML class:', document.documentElement.className)
  
  console.log('=== 调试结束 ===')
})
```

### 场景 3: 调试响应式断点

```javascript
// 在 main.js 或 App.vue 中添加
import { devLog } from './utils/debug'

const logViewport = () => {
  const width = window.innerWidth
  let breakpoint = 'unknown'
  
  if (width >= 1200) breakpoint = 'Desktop (≥1200px)'
  else if (width >= 768) breakpoint = 'Tablet (768px-1199px)'
  else if (width >= 481) breakpoint = 'Mobile (481px-767px)'
  else breakpoint = 'Small Mobile (<480px)'
  
  devLog(`视口大小: ${width}px - ${breakpoint}`)
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  logViewport()
})

// 初始化时打印
onMounted(() => {
  logViewport()
})
```

---

## 生产环境注意事项

⚠️ **重要**: 所有 `devLog`, `devWarn`, `devError` 等调试函数仅在开发模式下生效。

生产构建时，这些调试代码不会执行，不会影响性能或泄露信息。

如果需要在生产环境中保留某些日志，使用原生 `console.log`：

```javascript
// 开发环境日志（生产环境不输出）
devLog('这条日志只在开发时显示')

// 生产环境也输出
console.log('这条日志始终显示')

// 条件日志
if (import.meta.env.PROD) {
  console.log('这条日志只在生产环境显示')
}
```

---

## 相关文档

- [调试指南](./DEBUG.md) - 完整的调试指南
- [快速开始](../QUICKSTART.md) - 项目快速开始
- [用户指南](./GUIDE.md) - 用户使用指南
