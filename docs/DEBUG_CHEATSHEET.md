# 调试速查表 (Debug Cheatsheet)

快速参考调试命令和技巧。

## 🔧 快捷键

| 操作 | Windows/Linux | Mac |
|------|---------------|-----|
| 打开 DevTools | `F12` | `Cmd + Option + I` |
| 打开 Console | `Ctrl + Shift + J` | `Cmd + Option + J` |
| 检查元素 | `Ctrl + Shift + C` | `Cmd + Shift + C` |
| 设备模式 | `Ctrl + Shift + M` | `Cmd + Shift + M` |
| 搜索文件 | `Ctrl + P` | `Cmd + P` |
| 全局搜索 | `Ctrl + Shift + F` | `Cmd + Shift + F` |

## 📝 控制台命令

```javascript
// 基础日志
console.log('消息')
console.warn('警告')
console.error('错误')

// 表格显示
console.table([{name: 'A', value: 1}, {name: 'B', value: 2}])

// 分组
console.group('组名')
console.log('内容')
console.groupEnd()

// 计时
console.time('标签')
// 代码...
console.timeEnd('标签')

// 追踪堆栈
console.trace()

// 断点
debugger
```

## 🔍 调试工具函数

```javascript
import { 
  devLog,      // 日志
  devWarn,     // 警告
  devError,    // 错误
  devTable,    // 表格
  devGroup,    // 分组
  devTimer     // 计时
} from './utils/debug'

// 使用示例
devLog('用户点击了按钮')
devTable(data, '数据标题')
const stop = devTimer('操作')
// ... 代码 ...
stop()
```

## 🎯 常见调试场景

### 检查响应式数据
```javascript
import { watch } from 'vue'

watch(myRef, (newVal, oldVal) => {
  console.log('变化:', oldVal, '→', newVal)
})
```

### 检查计算属性
```javascript
const myComputed = computed(() => {
  console.log('计算中...')
  const result = // 计算逻辑
  console.log('结果:', result)
  return result
})
```

### 检查组件生命周期
```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => console.log('已挂载'))
onUpdated(() => console.log('已更新'))
onUnmounted(() => console.log('已卸载'))
```

### 检查 DOM
```javascript
// 选择元素
const el = document.querySelector('.my-class')
console.log('元素:', el)
console.log('样式:', getComputedStyle(el))

// 查看所有样式表
console.log(document.styleSheets)
```

### 检查本地存储
```javascript
// 查看所有
console.log(localStorage)

// 查看特定键
console.log(localStorage.getItem('darkMode'))

// 清空
localStorage.clear()
```

## 🐛 常见问题快速修复

| 问题 | 检查 | 解决 |
|------|------|------|
| 页面空白 | Console 错误 | 修复 JS 错误 |
| 样式不生效 | Elements 面板 | 检查 CSS 选择器 |
| 数据不更新 | Vue DevTools | 确保使用 ref/reactive |
| 搜索无结果 | Console 日志 | 调试过滤逻辑 |
| localStorage 失效 | 浏览器设置 | 检查隐私模式 |

## 📊 性能分析

```javascript
// Performance API
performance.mark('start')
// 代码...
performance.mark('end')
performance.measure('操作', 'start', 'end')

const measures = performance.getEntriesByType('measure')
console.log(measures)
```

## 🌐 网络调试

打开 Network 面板：
- 查看请求状态
- 检查响应内容
- 模拟慢速网络
- 查看时间线

## 🎨 样式调试

```javascript
// 检查计算后的样式
const el = document.querySelector('.element')
const styles = window.getComputedStyle(el)
console.log('颜色:', styles.color)
console.log('字体:', styles.fontSize)

// 切换主题
document.documentElement.setAttribute('data-theme', 'dark')
```

## 📱 响应式调试

```javascript
// 监听窗口大小
window.addEventListener('resize', () => {
  console.log(window.innerWidth, 'x', window.innerHeight)
})

// 检查媒体查询
const mql = window.matchMedia('(min-width: 768px)')
console.log('匹配:', mql.matches)
```

## 🔗 VSCode 调试

1. 启动开发服务器
   ```bash
   npm run dev
   ```

2. 按 `F5` 启动调试

3. 在代码中设置断点（点击行号）

4. 使用调试控制台

## 📚 更多资源

- [完整调试指南](DEBUG.md)
- [调试示例](DEBUG_EXAMPLES.md)
- [Vue DevTools](https://devtools.vuejs.org/)
- [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/)

---

**提示**: 开发模式下按 `F12` 打开 DevTools 是最快的调试方法！
