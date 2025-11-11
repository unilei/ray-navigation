# 调试资源 (Debug Resources)

精选的调试学习资源和工具。

## 📚 官方文档

### Vue 3
- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue DevTools](https://devtools.vuejs.org/)
- [Vue 3 调试指南](https://cn.vuejs.org/guide/scaling-up/testing.html)

### 浏览器开发者工具
- [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools/)
- [Firefox 开发者工具](https://firefox-source-docs.mozilla.org/devtools-user/)
- [Edge DevTools](https://docs.microsoft.com/en-us/microsoft-edge/devtools-guide-chromium/)
- [Safari Web Inspector](https://webkit.org/web-inspector/)

### Vite
- [Vite 官方文档](https://cn.vitejs.dev/)
- [Vite 调试配置](https://cn.vitejs.dev/guide/features.html#debugging)

---

## 🎬 视频教程（推荐）

### 中文教程

**Vue 3 调试**
- [Vue 3 开发者工具使用教程](https://www.bilibili.com/)
- [Vue 3 项目调试技巧](https://www.bilibili.com/)
- [从零开始学 Vue DevTools](https://www.bilibili.com/)

**浏览器调试**
- [Chrome 开发者工具完全指南](https://www.bilibili.com/)
- [前端调试技巧大全](https://www.bilibili.com/)
- [JavaScript 断点调试详解](https://www.bilibili.com/)

### 英文教程

- [Debugging JavaScript - Chrome DevTools 101](https://www.youtube.com/watch?v=H0XScE08hy8)
- [Vue.js Debugging in Chrome and VS Code](https://www.youtube.com/watch?v=VB3ZRFn8qh0)
- [Master Chrome DevTools](https://www.youtube.com/playlist?list=PLNYkxOF6rcICgS7eFJrGDhMBwWtdTgzpx)

---

## 🛠️ 调试工具

### 浏览器扩展

| 工具 | 用途 | 链接 |
|------|------|------|
| Vue DevTools | Vue 应用调试 | [Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) / [Firefox](https://addons.mozilla.org/firefox/addon/vue-js-devtools/) |
| React DevTools | 对比学习 | [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) |
| Redux DevTools | 状态管理调试 | [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) |
| Lighthouse | 性能分析 | Chrome 内置 |

### VSCode 扩展

| 扩展 | 用途 | 安装 |
|------|------|------|
| ESLint | 代码检查 | `ext install dbaeumer.vscode-eslint` |
| Prettier | 代码格式化 | `ext install esbenp.prettier-vscode` |
| Volar | Vue 3 支持 | `ext install Vue.volar` |
| Debugger for Chrome | Chrome 调试 | `ext install msjsdiag.debugger-for-chrome` |
| Error Lens | 行内显示错误 | `ext install usernamehw.errorlens` |

### 在线工具

- [Vue SFC Playground](https://play.vuejs.org/) - 在线测试 Vue 组件
- [CodePen](https://codepen.io/) - 在线代码测试
- [JSFiddle](https://jsfiddle.net/) - 在线 JS 调试
- [StackBlitz](https://stackblitz.com/) - 在线 IDE

---

## 📖 推荐阅读

### 调试技巧文章

**中文**
- [前端调试技巧与实践](https://juejin.cn/post/7030584939020042254)
- [Vue 3 开发调试技巧](https://juejin.cn/post/6963988980428488711)
- [Chrome DevTools 使用详解](https://juejin.cn/post/6844904162602254350)
- [前端性能调试指南](https://juejin.cn/post/6904517485349830670)

**英文**
- [The Art of Debugging](https://www.freecodecamp.org/news/the-art-of-debugging/)
- [Debugging JavaScript in Chrome](https://javascript.info/debugging-chrome)
- [Vue.js Debugging Tips](https://vuejs.org/guide/best-practices/production-deployment.html)

### 书籍推荐

- **《JavaScript 高级程序设计》** - 第 4 版，包含调试章节
- **《Vue.js 设计与实现》** - 深入理解 Vue 原理
- **《Debugging: The 9 Indispensable Rules》** - 调试方法论

---

## 🎯 实践项目

### 调试挑战

尝试在项目中实现这些调试任务：

1. **性能优化**
   - 使用 Performance 面板分析渲染性能
   - 优化搜索算法
   - 减少不必要的重渲染

2. **错误追踪**
   - 添加全局错误处理
   - 实现错误日志收集
   - 友好的错误提示

3. **用户行为分析**
   - 追踪用户点击
   - 记录搜索历史
   - 分析热门链接

---

## 🌐 社区资源

### 中文社区

- [Vue.js 中文论坛](https://forum.vuejs.org/c/chinese/14)
- [掘金 - 前端](https://juejin.cn/frontend)
- [思否 - SegmentFault](https://segmentfault.com/t/vue.js)
- [V2EX - 程序员](https://www.v2ex.com/go/programmer)

### 英文社区

- [Stack Overflow - Vue.js](https://stackoverflow.com/questions/tagged/vue.js)
- [Vue.js Discord](https://discord.com/invite/vue)
- [Reddit - r/vuejs](https://www.reddit.com/r/vuejs/)
- [Dev.to - Vue](https://dev.to/t/vue)

---

## 🔧 开发工具推荐

### 代码编辑器

- **VSCode** - 推荐（本项目优化）
- **WebStorm** - 强大的 IDE
- **Sublime Text** - 轻量级
- **Vim/Neovim** - 高效编辑

### 终端工具

```bash
# 更好的日志查看
npm install -g pino-pretty

# HTTP 请求调试
npm install -g httpie

# JSON 格式化
npm install -g fx

# 进程监控
npm install -g pm2
```

### 浏览器推荐

调试推荐使用：
1. **Chrome** - DevTools 最强大
2. **Firefox** - 优秀的开发者工具
3. **Edge** - 基于 Chromium，兼容 Chrome 扩展

---

## 📊 性能分析工具

### 在线工具

- [WebPageTest](https://www.webpagetest.org/) - 网页性能测试
- [PageSpeed Insights](https://pagespeed.web.dev/) - Google 性能分析
- [GTmetrix](https://gtmetrix.com/) - 性能和优化建议

### 本地工具

```bash
# Lighthouse CLI
npm install -g lighthouse

# 运行分析
lighthouse http://localhost:5173 --view

# Bundle 分析
npm install -g vite-bundle-visualizer
```

---

## 💡 调试技巧集锦

### Chrome DevTools 快捷键

```
Ctrl/Cmd + Shift + I    打开 DevTools
Ctrl/Cmd + Shift + J    打开 Console
Ctrl/Cmd + Shift + C    选择元素
Ctrl/Cmd + ]            下一个面板
Ctrl/Cmd + [            上一个面板
Ctrl/Cmd + P            快速打开文件
Ctrl/Cmd + Shift + P    命令面板
```

### Console API 技巧

```javascript
// 1. 样式化输出
console.log('%c标题', 'color: blue; font-size: 20px;')

// 2. 分组输出
console.group('用户信息')
console.log('姓名:', name)
console.log('年龄:', age)
console.groupEnd()

// 3. 条件输出（仅当条件为 false 时）
console.assert(user !== null, '用户不存在')

// 4. 清空控制台
console.clear()

// 5. 计数
console.count('点击次数')
```

---

## 🎓 学习路径

### 新手（0-3个月）

1. 学习浏览器 DevTools 基础
2. 掌握 console.log 调试
3. 学习设置断点
4. 了解元素检查器

### 进阶（3-6个月）

1. 掌握 Vue DevTools
2. 学习网络请求调试
3. 理解性能面板
4. 学习 Source Maps

### 高级（6个月+）

1. 掌握高级断点技巧
2. 性能优化和分析
3. 内存泄漏检测
4. 自动化调试脚本

---

## 🔗 有用的链接

### 备忘单

- [Chrome DevTools Cheatsheet](https://devhints.io/chrome-devtools)
- [Vue 3 Cheatsheet](https://www.vuemastery.com/vue-3-cheatsheet/)
- [JavaScript Debugging Cheatsheet](https://overapi.com/javascript)

### API 参考

- [Console API Reference](https://developer.mozilla.org/zh-CN/docs/Web/API/Console)
- [Performance API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)
- [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)

---

## 📧 获取帮助

如果你在调试过程中遇到问题：

1. 查看本项目的 [调试指南](DEBUG.md)
2. 搜索 [Stack Overflow](https://stackoverflow.com/questions/tagged/vue.js)
3. 访问 [Vue 论坛](https://forum.vuejs.org/)
4. 提交 [GitHub Issue](https://github.com/yourusername/nav-app/issues)

---

**提示**: 收藏这个页面，随时查阅调试资源！📌
