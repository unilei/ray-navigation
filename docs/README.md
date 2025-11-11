# 文档中心 (Documentation Hub)

欢迎来到导航应用的文档中心！这里汇集了所有帮助文档。

## 📚 文档导航

### 🚀 快速开始

| 文档 | 描述 | 适合人群 |
|------|------|---------|
| [快速开始指南](../QUICKSTART.md) | 5分钟快速上手项目 | 所有人 |
| [用户使用指南](GUIDE.md) | 详细的功能说明 | 用户/开发者 |
| [项目总结](../PROJECT_SUMMARY.md) | 项目概览和技术栈 | 开发者 |

### 🐛 调试文档

| 文档 | 描述 | 适合人群 |
|------|------|---------|
| [调试入门](DEBUG_GETTING_STARTED.md) | 5分钟学会调试（推荐新手） | 新手 |
| [调试速查表](DEBUG_CHEATSHEET.md) | 快速参考调试命令 | 所有人 |
| [调试指南](DEBUG.md) | 完整的调试文档 | 开发者 |
| [调试示例](DEBUG_EXAMPLES.md) | 实用代码示例 | 开发者 |
| [调试资源](DEBUG_RESOURCES.md) | 学习资源和工具 | 所有人 |

### 🤝 贡献

| 文档 | 描述 |
|------|------|
| [贡献指南](../CONTRIBUTING.md) | 如何为项目做贡献 |
| [检查清单](../CHECKLIST.md) | 开发检查清单 |

---

## 🎯 根据您的需求选择

### 我是新手，刚接触项目

1. 先阅读 [快速开始指南](../QUICKSTART.md)
2. 浏览 [用户使用指南](GUIDE.md)
3. 学习 [调试入门](DEBUG_GETTING_STARTED.md)

### 我遇到了问题，需要调试

1. 查看 [调试速查表](DEBUG_CHEATSHEET.md) - 快速找到解决方案
2. 参考 [调试指南](DEBUG.md) - 详细的问题排查
3. 查看 [调试示例](DEBUG_EXAMPLES.md) - 实际代码示例

### 我想深入学习调试技巧

1. 完整阅读 [调试指南](DEBUG.md)
2. 实践 [调试示例](DEBUG_EXAMPLES.md) 中的代码
3. 探索 [调试资源](DEBUG_RESOURCES.md) 中的学习材料

### 我想为项目贡献代码

1. 阅读 [贡献指南](../CONTRIBUTING.md)
2. 查看 [检查清单](../CHECKLIST.md)
3. 参考 [调试指南](DEBUG.md) 确保代码质量

---

## 📖 调试文档详解

### 🌱 调试入门 (新手必读)

**适合**: 从未调试过或经验较少的开发者

**内容**:
- 5种最常用的调试方法
- 每种方法的详细步骤
- 3个常见场景的解决方案
- 快速上手技巧

[➡️ 开始学习](DEBUG_GETTING_STARTED.md)

---

### ⚡ 调试速查表 (随时查阅)

**适合**: 所有开发者

**内容**:
- 快捷键速查
- 常用命令
- 常见问题快速修复
- 调试技巧汇总

[➡️ 查看速查表](DEBUG_CHEATSHEET.md)

---

### 📘 调试指南 (完整文档)

**适合**: 想要深入了解的开发者

**内容**:
- 开发环境调试配置
- 浏览器 DevTools 详解
- Vue DevTools 使用
- 性能调试技巧
- 常见问题解决方案

[➡️ 阅读完整指南](DEBUG.md)

---

### 💡 调试示例 (实战代码)

**适合**: 需要实际代码参考的开发者

**内容**:
- 组件调试示例
- 性能优化示例
- 错误处理示例
- 真实场景调试

[➡️ 查看代码示例](DEBUG_EXAMPLES.md)

---

### 🎓 调试资源 (学习材料)

**适合**: 想要系统学习的开发者

**内容**:
- 官方文档链接
- 视频教程推荐
- 调试工具介绍
- 学习路径规划
- 社区资源

[➡️ 浏览学习资源](DEBUG_RESOURCES.md)

---

## 🛠️ 开发工具配置

项目已经配置好了以下调试工具：

### VSCode

- ✅ 调试配置 (`.vscode/launch.json`)
- ✅ 推荐扩展 (`.vscode/extensions.json`)
- ✅ 编辑器设置 (`.vscode/settings.json`)

按 `F5` 即可开始调试！

### 调试工具库

项目包含内置调试工具库 (`src/utils/debug.js`)：

```javascript
import { devLog, devTable, devTimer } from './utils/debug'

devLog('调试信息')           // 日志输出
devTable(data, '标题')      // 表格显示
const stop = devTimer('操作') // 性能计时
// ... 代码
stop()
```

仅在开发模式下生效，生产环境自动禁用。

---

## 🎯 调试工作流程

### 标准调试流程

```
1. 发现问题
   ↓
2. 查看 Console 错误信息
   ↓
3. 使用调试速查表快速定位
   ↓
4. 添加 console.log 或断点
   ↓
5. 分析问题原因
   ↓
6. 修复并验证
   ↓
7. 清理调试代码
```

### 性能问题调试

```
1. 使用 Performance 面板录制
   ↓
2. 分析火焰图找到瓶颈
   ↓
3. 使用 devTimer 精确计时
   ↓
4. 优化代码
   ↓
5. 对比优化前后性能
```

### 样式问题调试

```
1. 右键检查元素
   ↓
2. 查看 Styles 面板
   ↓
3. 检查计算后样式
   ↓
4. 实时修改测试
   ↓
5. 更新源代码
```

---

## 💡 最佳实践

### ✅ 推荐做法

- 使用内置的调试工具函数
- 善用 Vue DevTools 检查组件
- 设置有意义的断点
- 使用 console.table 查看数据
- 记录调试过程和解决方案

### ❌ 避免做法

- 不要在生产代码中留下 debugger
- 不要过度使用 console.log
- 不要忽视浏览器警告
- 不要修改 node_modules
- 不要禁用 ESLint 规则

---

## 🆘 获取帮助

### 文档内寻找答案

1. 使用浏览器搜索功能（`Ctrl+F`）
2. 查看调试速查表的常见问题部分
3. 浏览调试示例找相似场景

### 寻求外部帮助

1. [GitHub Issues](https://github.com/yourusername/nav-app/issues)
2. [Stack Overflow - Vue.js](https://stackoverflow.com/questions/tagged/vue.js)
3. [Vue.js 论坛](https://forum.vuejs.org/)

### 报告问题

提交 Issue 时请包含：

- 问题描述
- 重现步骤
- 预期行为 vs 实际行为
- 浏览器和版本
- 控制台错误信息
- 相关代码片段

---

## 📝 文档反馈

这些文档对您有帮助吗？

- 👍 有帮助 - Star 这个项目
- 🐛 发现错误 - 提交 Issue
- 💡 改进建议 - 提交 Pull Request
- ❓ 有疑问 - 在 Issue 中讨论

---

## 🔗 快速链接

### 项目文档
- [README](../README.md) - 项目主页
- [快速开始](../QUICKSTART.md) - 快速上手
- [贡献指南](../CONTRIBUTING.md) - 如何贡献

### 调试文档
- [调试入门](DEBUG_GETTING_STARTED.md) - 5分钟入门
- [调试速查表](DEBUG_CHEATSHEET.md) - 快速参考
- [调试指南](DEBUG.md) - 完整指南
- [调试示例](DEBUG_EXAMPLES.md) - 代码示例
- [调试资源](DEBUG_RESOURCES.md) - 学习资源

### 外部资源
- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Vue DevTools](https://devtools.vuejs.org/)

---

**开始您的学习之旅！** 🚀

选择一个文档开始阅读，如果是新手建议从 [调试入门](DEBUG_GETTING_STARTED.md) 开始。
