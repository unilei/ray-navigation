# 部署指南

本文档详细说明如何将导航应用部署到不同的平台。

## 📋 目录

- [GitHub Pages 部署](#github-pages-部署)
- [Vercel 部署](#vercel-部署)
- [Netlify 部署](#netlify-部署)
- [手动部署](#手动部署)

---

## 🚀 GitHub Pages 部署

### 自动部署（推荐）

项目已配置自动部署，当代码推送到 `main` 分支时会自动触发部署。

#### 步骤 1：启用 GitHub Pages

1. 访问仓库的 **Settings** 页面
2. 点击左侧菜单的 **Pages**
3. 在 **Source** 部分，选择 **GitHub Actions**
4. 保存设置

#### 步骤 2：推送代码

```bash
git add .
git commit -m "准备部署"
git push origin main
```

#### 步骤 3：查看部署状态

1. 访问仓库的 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流的运行状态
3. 部署成功后，应用将在以下地址可访问：
   ```
   https://unilei.github.io/ray-navigation/
   ```

### 手动触发部署

1. 访问仓库的 **Actions** 标签页
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 **Run workflow** 按钮
4. 选择分支并点击 **Run workflow**

---

## ⚡ Vercel 部署

### 通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **生产部署**
   ```bash
   vercel --prod
   ```

### 通过 Vercel 网站

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 导入 GitHub 仓库 `unilei/ray-navigation`
4. 配置构建设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: `NODE_ENV=production`
5. 点击 "Deploy"

---

## 🌐 Netlify 部署

### 通过 Netlify CLI

1. **安装 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登录 Netlify**
   ```bash
   netlify login
   ```

3. **初始化部署**
   ```bash
   netlify init
   ```

4. **部署**
   ```bash
   netlify deploy --prod
   ```

### 通过 Netlify 网站

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Add new site" > "Import an existing project"
3. 连接 GitHub 并选择 `unilei/ray-navigation` 仓库
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 点击 "Deploy site"

### 创建 netlify.toml

你也可以在项目根目录创建 `netlify.toml` 配置文件：

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 🛠️ 手动部署

### 本地构建

1. **安装依赖**
   ```bash
   npm install
   ```

2. **构建项目**
   ```bash
   npm run build
   ```

3. **预览构建结果**
   ```bash
   npm run preview
   ```

### 部署到任意静态主机

构建后，`dist` 目录包含所有静态文件。你可以将这个目录上传到任何静态文件托管服务：

- **Nginx**: 将 `dist` 目录内容复制到 `/var/www/html`
- **Apache**: 将 `dist` 目录内容复制到 `/var/www/html` 或 `htdocs`
- **CDN**: 上传到 OSS、S3 等对象存储服务

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # 缓存静态资源
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔧 配置说明

### Base URL 配置

项目使用环境变量来设置 base URL：

- **开发环境**: `/`
- **生产环境**: `/ray-navigation/`（GitHub Pages）

如果部署到根路径（如自定义域名），需要修改 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/', // 改为根路径
  // ...
})
```

### 环境变量

如需配置环境变量，创建 `.env.production` 文件：

```env
VITE_APP_TITLE=导航应用
VITE_API_BASE_URL=https://api.example.com
```

---

## 📊 部署检查清单

部署前请确认：

- ✅ 运行 `npm run lint` 无错误
- ✅ 运行 `npm run build` 构建成功
- ✅ 运行 `npm run preview` 本地预览正常
- ✅ 检查所有链接和资源是否正确加载
- ✅ 测试在不同浏览器的兼容性
- ✅ 检查响应式设计在移动设备上的表现
- ✅ 确认深色模式切换正常工作
- ✅ 测试搜索功能
- ✅ 检查 localStorage 功能

---

## 🐛 常见问题

### 1. 页面空白或资源 404

**原因**: base URL 配置不正确

**解决方案**: 
- 检查 `vite.config.js` 中的 `base` 配置
- 确保与部署路径一致

### 2. GitHub Pages 部署失败

**原因**: 可能是权限配置问题

**解决方案**:
1. 检查仓库 Settings > Actions > General
2. 确认 "Workflow permissions" 设置为 "Read and write permissions"
3. 启用 "Allow GitHub Actions to create and approve pull requests"

### 3. 路由刷新后 404

**原因**: 单页应用需要服务器配置

**解决方案**:
- GitHub Pages: 使用 hash 路由或添加 404.html
- Netlify/Vercel: 自动处理，无需配置
- 自建服务器: 配置服务器重定向到 index.html

---

## 📞 获取帮助

如遇到部署问题：

1. 查看项目的 [GitHub Issues](https://github.com/unilei/ray-navigation/issues)
2. 参考相关文档：
   - [GitHub Pages 文档](https://docs.github.com/pages)
   - [Vercel 文档](https://vercel.com/docs)
   - [Netlify 文档](https://docs.netlify.com)
3. 查看构建日志获取详细错误信息

---

## 🎉 部署成功

部署成功后，你的导航应用将在以下地址可访问：

**GitHub Pages**: https://unilei.github.io/ray-navigation/

享受你的导航应用吧！🚀
