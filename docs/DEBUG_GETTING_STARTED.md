# 调试入门 - 5分钟快速上手

最快的方式开始调试导航应用。

## 🚀 方法 1: 浏览器开发者工具（推荐新手）

### 步骤 1: 启动应用

```bash
npm run dev
```

应用会在 http://localhost:5173 打开。

### 步骤 2: 打开开发者工具

- **Windows/Linux**: 按 `F12`
- **Mac**: 按 `Cmd + Option + I`

### 步骤 3: 使用 Console 面板

在任何组件中添加 console.log：

```javascript
// 在 src/App.vue 中
const handleLinkClick = (link, category) => {
  console.log('点击的链接:', link.name)  // 👈 添加这行
  // ... 其他代码
}
```

刷新页面，点击链接，在 Console 面板中查看输出。

### 步骤 4: 检查元素

1. 右键点击页面上的任意元素
2. 选择"检查"或"检查元素"
3. 在 Elements 面板中查看 HTML 和 CSS

---

## 🔍 方法 2: 使用内置调试工具

### 步骤 1: 导入调试工具

```javascript
// 在 src/App.vue 的 <script> 部分顶部添加
import { devLog, devTable, devTimer } from './utils/debug'
```

### 步骤 2: 添加调试代码

```javascript
// 调试搜索功能
const performSearch = () => {
  devLog('搜索查询:', searchQuery.value)  // 👈 添加调试
  
  const results = filteredCategories.value
  devLog('找到结果:', results.length)     // 👈 添加调试
}

// 调试数据加载
onMounted(() => {
  devTable(navigationData.categories, '导航分类')  // 👈 表格显示
})
```

### 步骤 3: 查看输出

打开浏览器 Console (按 `F12`)，你会看到带有 🔍 标记的调试信息。

---

## 🐛 方法 3: 使用断点调试

### 在代码中设置断点

```javascript
const handleLinkClick = (link, category) => {
  debugger  // 👈 添加这行，代码会在这里暂停
  console.log('点击链接:', link.name)
}
```

### 在浏览器中设置断点

1. 按 `F12` 打开 DevTools
2. 切换到 Sources 面板
3. 找到文件（按 `Ctrl+P` 搜索 "App.vue"）
4. 点击行号左侧设置断点

### 调试控制

- **继续**: `F8`
- **单步跳过**: `F10`
- **单步进入**: `F11`
- **单步跳出**: `Shift+F11`

---

## 🎯 方法 4: Vue DevTools（推荐）

### 安装 Vue DevTools

**Chrome/Edge**:
访问 https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd

**Firefox**:
访问 https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/

### 使用 Vue DevTools

1. 打开开发者工具（`F12`）
2. 选择 "Vue" 标签
3. 浏览组件树
4. 查看组件的 data、computed、props
5. 实时修改数据测试

---

## 💻 方法 5: VSCode 调试

### 步骤 1: 打开项目

```bash
code .
```

### 步骤 2: 安装推荐扩展

VSCode 会提示安装推荐扩展，点击"安装"。

### 步骤 3: 启动开发服务器

```bash
npm run dev
```

### 步骤 4: 开始调试

1. 在代码中设置断点（点击行号左侧）
2. 按 `F5` 或点击左侧调试图标
3. 选择 "🚀 Launch Chrome (Dev)"
4. 代码会在断点处暂停

---

## 🎓 常见调试场景

### 场景 1: 搜索功能不工作

```javascript
// 在 App.vue 中添加
const filteredCategories = computed(() => {
  console.log('搜索查询:', searchQuery.value)  // 👈 检查查询
  
  if (!searchQuery.value.trim()) {
    return navigationData.categories
  }
  
  const result = /* ... 过滤逻辑 ... */
  
  console.log('找到分类:', result.length)  // 👈 检查结果
  return result
})
```

### 场景 2: 深色模式不保存

```javascript
// 检查 localStorage
watch(darkMode, (newVal) => {
  console.log('深色模式变化:', newVal)  // 👈 检查变化
  storage.set('darkMode', newVal)
  console.log('已保存:', localStorage.getItem('darkMode'))  // 👈 验证保存
})
```

### 场景 3: 样式不生效

1. 右键点击元素 → 检查
2. 在 Styles 面板查看应用的样式
3. 查看 Computed 标签看计算后的样式
4. 检查是否被其他样式覆盖

---

## ⚡ 快速技巧

### 1. 快速查看变量

```javascript
console.log({ searchQuery, darkMode, gridColumns })
// 输出: { searchQuery: "vue", darkMode: true, gridColumns: 4 }
```

### 2. 表格显示数组

```javascript
console.table(navigationData.categories)
```

### 3. 追踪函数调用

```javascript
const myFunction = () => {
  console.trace('myFunction 被调用')  // 显示调用堆栈
}
```

### 4. 计时操作

```javascript
console.time('搜索')
performSearch()
console.timeEnd('搜索')  // 输出: 搜索: 15.23ms
```

### 5. 条件断点

在浏览器 Sources 面板：
1. 右键点击断点
2. 选择 "Edit breakpoint"
3. 输入条件，如 `searchQuery.value === "vue"`

---

## 🆘 遇到问题？

### 控制台有红色错误？
- 仔细阅读错误信息
- 点击错误信息跳转到出错位置
- 检查文件名和行号

### 样式不对？
- 检查浏览器缓存（`Ctrl + Shift + R` 强制刷新）
- 检查深色模式是否影响
- 使用元素检查器查看实际样式

### 数据不更新？
- 确保使用了 `ref()` 或 `reactive()`
- 检查 Vue DevTools 中的数据
- 查看是否正确监听了数据变化

---

## 📚 下一步

- 📖 查看完整 [调试指南](DEBUG.md)
- 💡 浏览 [调试示例](DEBUG_EXAMPLES.md)
- ⚡ 使用 [调试速查表](DEBUG_CHEATSHEET.md)

---

**记住**: 调试是开发的重要技能，多练习会越来越熟练！🎯
