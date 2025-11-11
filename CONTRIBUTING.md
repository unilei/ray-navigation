# 贡献指南

感谢您对导航应用的贡献！我们很高兴能有您的参与。

## 行为准则

请在所有交互中保持尊重和包容。我们承诺提供一个欢迎所有人的环境。

## 如何做出贡献

### 报告错误

在报告错误时，请提供以下信息：
- 您使用的浏览器和操作系统
- 详细的错误描述
- 重现问题的步骤
- 预期行为与实际行为

### 建议功能

我们很乐意听到您的想法！请在提出功能请求时：
- 清晰地描述建议的功能
- 解释为什么这个功能会有用
- 列出类似功能的示例

### 提交代码

1. Fork 仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 代码风格

- 使用 ESLint 检查代码
- 使用 Prettier 格式化代码
- 遵循现有的代码风格
- 添加必要的注释解释复杂逻辑

## 提交消息

提交消息应该清晰简洁：
- 使用现在时态 ("Add feature" 而不是 "Added feature")
- 限制第一行为 72 个字符以内
- 如果需要，提供详细的描述

## 开发流程

1. 克隆仓库并安装依赖
   ```bash
   git clone <repository>
   cd nav-app
   npm install
   ```

2. 创建功能分支
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. 进行更改并测试
   ```bash
   npm run dev
   npm run lint
   npm run build
   ```

4. 提交并推送
   ```bash
   git commit -am 'Add feature'
   git push origin feature/your-feature-name
   ```

5. 在 GitHub 创建 Pull Request

## 审查流程

- 所有 Pull Request 都需要至少一个维护者的审查
- 审查者可能会要求更改
- 一旦获得批准，代码将被合并

## 问题

- 新功能相关的讨论应在相应的 issue 中进行
- 确保您的代码通过所有检查

感谢您的贡献！
