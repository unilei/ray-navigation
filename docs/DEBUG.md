# 调试指南 (How to Debug)

本文档提供了调试导航应用的完整指南，包括常见问题和解决方案。

## 目录

- [开发环境调试](#开发环境调试)
- [浏览器开发者工具](#浏览器开发者工具)
- [Vue DevTools](#vue-devtools)
- [常见问题](#常见问题)
- [性能调试](#性能调试)
- [网络请求调试](#网络请求调试)
- [样式调试](#样式调试)

---

## 开发环境调试

### 启动开发服务器

```bash
npm run dev
```

开发服务器会在 `http://localhost:5173` 启动，并自动打开浏览器。

### 开启 Source Maps（开发模式）

开发模式下，Vite 默认开启 source maps，你可以在浏览器中直接调试源代码。

如果需要在生产构建中启用 source maps，编辑 `vite.config.js`：

```javascript
export default defineConfig({
  build: {
    sourcemap: true  // 改为 true
  }
})
```

### 启用详细日志

在 `src/main.js` 中添加：

```javascript
// 开发环境启用详细警告
if (import.meta.env.DEV) {
  console.log('🚀 开发模式启动')
  console.log('环境变量:', import.meta.env)
}
```

---

## 浏览器开发者工具

### Chrome/Edge DevTools

#### 1. 打开开发者工具
- **Windows/Linux**: `F12` 或 `Ctrl + Shift + I`
- **Mac**: `Cmd + Option + I`

#### 2. Console（控制台）调试

在组件中添加调试信息：

```javascript
// 在 App.vue 或其他组件中
console.log('当前导航数据:', navigationData)
console.log('搜索关键词:', searchQuery.value)
console.table(categories)  // 表格形式显示数组
```

#### 3. Debugger 断点

在代码中添加断点：

```javascript
export default {
  setup() {
    const handleSearch = (query) => {
      debugger  // 执行到这里时会暂停
      console.log('搜索:', query)
    }
  }
}
```

#### 4. Sources（源代码）面板

- 点击行号设置断点
- 使用 `Ctrl + P` (Mac: `Cmd + P`) 快速打开文件
- 查看调用堆栈和作用域变量

---

## Vue DevTools

### 安装 Vue DevTools

**Chrome/Edge 扩展**:
1. 访问 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
2. 点击"添加至 Chrome/Edge"

**Firefox 扩展**:
1. 访问 [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
2. 点击"添加至 Firefox"

### 使用 Vue DevTools

#### 1. 组件检查器

- 查看组件层次结构
- 检查组件的 props、data、computed 值
- 实时编辑数据测试不同状态

#### 2. Timeline（时间线）

- 追踪事件触发
- 查看组件更新
- 性能分析

#### 3. 路由检查器（如果使用 Vue Router）

- 查看当前路由
- 检查路由参数和查询

---

## 常见问题

### 1. 页面空白/组件不显示

**检查步骤**：

```javascript
// 在 App.vue 的 setup() 中
import { onMounted } from 'vue'

onMounted(() => {
  console.log('App 组件已挂载')
  console.log('导航数据:', navigationData)
})
```

**可能原因**：
- JavaScript 错误（查看 Console）
- 数据未正确加载
- CSS 样式问题（元素透明或隐藏）

### 2. 搜索功能不工作

```javascript
// 在 App.vue 中添加
const filteredCategories = computed(() => {
  console.log('🔍 搜索查询:', searchQuery.value)
  
  const result = categories.map(category => {
    const filteredItems = category.items.filter(item => {
      const match = item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                   item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      console.log(`检查 ${item.name}:`, match)
      return match
    })
    return { ...category, items: filteredItems }
  })
  
  console.log('过滤结果:', result)
  return result
})
```

### 3. 本地存储不工作

```javascript
// 测试 localStorage
try {
  localStorage.setItem('test', 'test')
  console.log('✅ localStorage 可用')
  localStorage.removeItem('test')
} catch (e) {
  console.error('❌ localStorage 不可用:', e)
}

// 检查保存的数据
console.log('已保存的主题:', localStorage.getItem('theme'))
```

### 4. 样式不生效

```javascript
// 检查 CSS 是否加载
const styles = document.styleSheets
console.log('已加载的样式表:', styles.length)

for (let i = 0; i < styles.length; i++) {
  console.log(`样式表 ${i}:`, styles[i].href)
}
```

### 5. 响应式数据不更新

确保使用 `ref` 或 `reactive`：

```javascript
import { ref, reactive } from 'vue'

// ✅ 正确
const count = ref(0)
const state = reactive({ count: 0 })

// ❌ 错误
let count = 0  // 不是响应式的
```

---

## 性能调试

### 1. 使用 Performance API

```javascript
// 测量组件渲染时间
performance.mark('render-start')

// 你的代码...

performance.mark('render-end')
performance.measure('render-time', 'render-start', 'render-end')

const measure = performance.getEntriesByName('render-time')[0]
console.log(`渲染时间: ${measure.duration}ms`)
```

### 2. 使用 Chrome Performance 面板

1. 打开 DevTools → Performance
2. 点击录制按钮
3. 执行需要测试的操作
4. 停止录制
5. 分析火焰图

### 3. 检查重复渲染

```javascript
import { onUpdated } from 'vue'

export default {
  setup() {
    onUpdated(() => {
      console.log('⚠️ 组件更新了')
      console.trace()  // 显示调用堆栈
    })
  }
}
```

---

## 网络请求调试

### 检查静态资源加载

打开 DevTools → Network 面板：

- 查看所有资源的加载时间
- 检查 404 错误（资源未找到）
- 查看资源大小

### 模拟慢速网络

1. 打开 Network 面板
2. 点击 "No throttling" 下拉菜单
3. 选择 "Slow 3G" 或 "Fast 3G"

---

## 样式调试

### 1. 检查元素样式

- 右键点击元素 → "检查"
- 在 Elements 面板查看应用的样式
- 查看计算后的样式（Computed 标签）

### 2. 实时编辑样式

- 在 Styles 面板直接编辑 CSS
- 测试不同的值
- 复制修改后的 CSS

### 3. 深色模式调试

```javascript
// 手动切换主题
document.documentElement.setAttribute('data-theme', 'dark')

// 检查当前主题
const currentTheme = document.documentElement.getAttribute('data-theme')
console.log('当前主题:', currentTheme)
```

### 4. 响应式设计调试

1. 打开 DevTools
2. 点击 Toggle device toolbar（`Ctrl + Shift + M`）
3. 选择不同设备或自定义尺寸

---

## VSCode 调试配置

在 `.vscode/launch.json` 中添加：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug in Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

使用步骤：
1. 启动开发服务器：`npm run dev`
2. 在 VSCode 中按 `F5` 启动调试
3. 在代码中设置断点

---

## 调试技巧总结

### ✅ 最佳实践

1. **使用 console.log 前先检查 DevTools Console**
2. **善用 Vue DevTools 检查组件状态**
3. **使用断点而不是到处打印日志**
4. **检查浏览器控制台的错误和警告**
5. **使用 console.table() 查看数组/对象数据**
6. **使用 console.group() 组织日志输出**

### 🔧 调试工具快捷键

| 操作 | Windows/Linux | Mac |
|------|---------------|-----|
| 打开 DevTools | `F12` 或 `Ctrl + Shift + I` | `Cmd + Option + I` |
| 打开 Console | `Ctrl + Shift + J` | `Cmd + Option + J` |
| 打开元素检查器 | `Ctrl + Shift + C` | `Cmd + Shift + C` |
| 切换设备模式 | `Ctrl + Shift + M` | `Cmd + Shift + M` |
| 搜索文件 | `Ctrl + P` | `Cmd + P` |
| 全局搜索 | `Ctrl + Shift + F` | `Cmd + Shift + F` |

### 📝 调试清单

遇到问题时，按以下顺序检查：

- [ ] 检查浏览器控制台是否有错误
- [ ] 确认开发服务器正在运行
- [ ] 检查网络请求是否成功
- [ ] 使用 Vue DevTools 检查组件状态
- [ ] 验证数据格式是否正确
- [ ] 检查 localStorage 中的数据
- [ ] 测试不同浏览器
- [ ] 清除缓存后重试
- [ ] 检查 CSS 样式是否正确应用

---

## 获取帮助

如果问题仍未解决：

1. 查看 [GitHub Issues](https://github.com/yourusername/nav-app/issues)
2. 创建新的 Issue，包含：
   - 问题描述
   - 重现步骤
   - 错误信息截图
   - 浏览器和版本信息
   - 控制台日志

---

## 相关文档

- [快速开始指南](../QUICKSTART.md)
- [用户使用指南](./GUIDE.md)
- [贡献指南](../CONTRIBUTING.md)
