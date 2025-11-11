# 如何调试 (How to Debug)

快速链接到调试文档。

## 🚀 我是新手

从这里开始：[调试入门 - 5分钟快速上手](docs/DEBUG_GETTING_STARTED.md)

学习内容：
- 5种最常用的调试方法
- 浏览器 DevTools 使用
- Vue DevTools 使用
- VSCode 调试配置
- 常见场景解决方案

## ⚡ 我需要快速参考

查看：[调试速查表](docs/DEBUG_CHEATSHEET.md)

包含内容：
- 快捷键速查
- 常用控制台命令
- 调试工具函数
- 常见问题快速修复

## 📘 我想深入学习

阅读：[完整调试指南](docs/DEBUG.md)

涵盖内容：
- 开发环境配置
- 浏览器 DevTools 详解
- Vue DevTools 完整教程
- 性能调试技巧
- 样式调试方法

## 💡 我需要代码示例

参考：[调试示例代码](docs/DEBUG_EXAMPLES.md)

提供示例：
- 组件调试代码
- 性能优化示例
- 错误处理示例
- 真实场景调试

## 🎓 我想学习更多

浏览：[调试学习资源](docs/DEBUG_RESOURCES.md)

资源包括：
- 官方文档链接
- 视频教程推荐
- 调试工具介绍
- 学习路径规划

## 📚 所有文档

访问：[文档中心](docs/README.md)

---

## 快速开始调试

### 方法 1: 浏览器控制台（最简单）

```bash
# 启动应用
npm run dev
```

在代码中添加：
```javascript
console.log('调试信息', 变量)
```

按 `F12` 打开浏览器控制台查看输出。

### 方法 2: 使用内置调试工具

```javascript
import { devLog, devTable } from './utils/debug'

devLog('调试信息')
devTable(data, '数据标题')
```

### 方法 3: 使用断点

在浏览器 DevTools 的 Sources 面板设置断点，或在代码中添加：
```javascript
debugger  // 代码会在这里暂停
```

### 方法 4: Vue DevTools

1. 安装 [Vue DevTools 扩展](https://devtools.vuejs.org/)
2. 按 `F12` 打开开发者工具
3. 选择 "Vue" 标签
4. 检查组件状态和数据

### 方法 5: VSCode 调试

1. 确保开发服务器运行：`npm run dev`
2. 在 VSCode 中按 `F5`
3. 选择 "🚀 Launch Chrome (Dev)"
4. 在代码中设置断点

---

## 常见问题

### 页面空白？
1. 打开控制台（`F12`）
2. 查看是否有错误信息
3. 参考 [调试指南](docs/DEBUG.md#常见问题)

### 搜索不工作？
查看 [调试示例 - 搜索功能](docs/DEBUG_EXAMPLES.md#场景-1-调试搜索不工作)

### 样式问题？
查看 [调试指南 - 样式调试](docs/DEBUG.md#样式调试)

### 性能问题？
查看 [调试指南 - 性能调试](docs/DEBUG.md#性能调试)

---

## 获取帮助

- 📖 查看 [完整文档列表](docs/README.md)
- 🐛 提交 [GitHub Issue](https://github.com/yourusername/nav-app/issues)
- 💬 访问 [Vue 论坛](https://forum.vuejs.org/)

---

**祝调试顺利！** 🎯
