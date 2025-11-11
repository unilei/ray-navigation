# 部署检查清单 ✅

在部署到生产环境之前，请确保完成以下所有检查项。

## 📋 部署前检查

### 1. 代码质量
- [ ] 所有代码已提交到 Git
- [ ] 运行 `npm run lint` 无错误
- [ ] 运行 `npm run format:check` 格式正确
- [ ] 没有 console.log 等调试代码（或使用 debug.js 工具函数）
- [ ] 代码注释完整且准确

### 2. 构建测试
- [ ] 运行 `npm run build` 构建成功
- [ ] 检查 `dist` 目录生成正常
- [ ] 运行 `npm run preview` 本地预览无问题
- [ ] 检查构建产物大小合理

### 3. 功能测试
- [ ] 所有导航链接可以正常点击
- [ ] 搜索功能工作正常
- [ ] 深色模式切换正常
- [ ] 网格列数调整功能正常
- [ ] LocalStorage 保存设置正常
- [ ] 响应式布局在不同屏幕尺寸下正常

### 4. 浏览器兼容性
- [ ] Chrome 最新版测试通过
- [ ] Firefox 最新版测试通过
- [ ] Safari 最新版测试通过（如有 Mac）
- [ ] Edge 最新版测试通过
- [ ] 移动端浏览器测试通过

### 5. 性能检查
- [ ] 页面加载速度正常（< 3秒）
- [ ] 没有明显的性能问题
- [ ] 图片和资源正确加载
- [ ] 没有 404 错误

### 6. SEO 和元数据
- [ ] 页面标题正确
- [ ] Meta 描述完整
- [ ] Open Graph 标签设置正确
- [ ] Favicon 显示正常

### 7. GitHub 配置
- [ ] GitHub Pages 已启用
- [ ] 仓库权限设置正确
- [ ] Actions 工作流已启用
- [ ] 分支保护规则设置（可选）

### 8. 环境配置
- [ ] `vite.config.js` 中的 base URL 正确
- [ ] 环境变量配置正确（如有）
- [ ] `.nojekyll` 文件存在于 `public` 目录
- [ ] `.gitignore` 配置完整

## 🚀 部署步骤

### 方法 1：自动部署（推荐）

1. **提交所有更改**
   ```bash
   git add .
   git commit -m "准备部署"
   ```

2. **推送到 main 分支**
   ```bash
   git push origin main
   ```

3. **等待 GitHub Actions 完成**
   - 访问 https://github.com/unilei/ray-navigation/actions
   - 等待 "Deploy to GitHub Pages" 工作流完成
   - 绿色✅表示成功

4. **访问部署的应用**
   - https://unilei.github.io/ray-navigation/

### 方法 2：使用部署脚本

```bash
npm run deploy:auto
# 或
./deploy.sh
```

跟随脚本提示完成部署。

### 方法 3：手动部署

```bash
# 构建
npm run build

# 查看构建结果
npm run preview

# 提交并推送
git add .
git commit -m "部署更新"
git push origin main
```

## 📊 部署后验证

### 1. 基本功能
- [ ] 访问 https://unilei.github.io/ray-navigation/
- [ ] 页面正常加载和显示
- [ ] 所有链接可以点击
- [ ] 搜索功能正常
- [ ] 主题切换正常

### 2. 资源加载
- [ ] 打开浏览器开发者工具（F12）
- [ ] 检查 Network 标签，确认没有 404 错误
- [ ] 检查 Console 标签，确认没有 JavaScript 错误
- [ ] 所有 CSS 和 JS 文件正确加载

### 3. 移动端测试
- [ ] 打开手机浏览器访问
- [ ] 检查响应式布局
- [ ] 测试触摸交互
- [ ] 检查在不同移动设备上的显示

### 4. 性能检查
- [ ] 使用 Lighthouse 进行评分
  - Performance > 90
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90
- [ ] 页面加载速度 < 3秒
- [ ] 首次内容绘制（FCP）< 1.8秒

### 5. SEO 验证
- [ ] Google Search Console 提交网站
- [ ] robots.txt 配置（如需要）
- [ ] sitemap.xml 生成（如需要）
- [ ] 社交媒体分享预览正常

## 🐛 常见问题排查

### 问题 1：页面空白
**检查**:
- 浏览器控制台是否有错误
- Network 标签中资源是否正确加载
- base URL 配置是否正确

**解决**:
```javascript
// vite.config.js
base: '/ray-navigation/'  // 确保与仓库名一致
```

### 问题 2：GitHub Actions 失败
**检查**:
- Actions 日志中的错误信息
- 仓库权限设置
- package.json 依赖是否正确

**解决**:
1. 查看 Actions 详细日志
2. 检查构建命令是否正确
3. 确认 Node.js 版本兼容

### 问题 3：资源 404
**检查**:
- 资源路径是否正确
- base URL 配置
- 构建产物是否包含资源

**解决**:
- 确保使用相对路径
- 检查 public 目录文件
- 重新构建项目

### 问题 4：路由刷新 404
**说明**: 单页应用的常见问题

**解决**:
- GitHub Pages: 使用 hash 路由
- 或添加 404.html 重定向到 index.html

## 📞 获取帮助

如果遇到问题：

1. **查看文档**
   - [部署指南](DEPLOY.md)
   - [项目文档](README.md)
   - [调试指南](docs/DEBUG.md)

2. **检查工作流**
   - [GitHub Actions 日志](https://github.com/unilei/ray-navigation/actions)
   - 查看错误信息和堆栈跟踪

3. **社区资源**
   - [GitHub Pages 文档](https://docs.github.com/pages)
   - [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
   - [Vue.js 部署](https://vuejs.org/guide/best-practices/production-deployment.html)

4. **提交 Issue**
   - 访问 https://github.com/unilei/ray-navigation/issues
   - 提供详细的错误信息和复现步骤

## 🎉 部署成功！

恭喜！你的导航应用已成功部署！

**访问地址**: https://unilei.github.io/ray-navigation/

接下来你可以：
- 📢 分享给朋友使用
- 🌟 在 GitHub 上给项目加星
- 🤝 贡献代码和改进
- 📝 报告 bug 或提出建议

---

**最后更新**: 2024
**维护者**: Nav App Team
