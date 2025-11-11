# 快速开始

只需几分钟即可运行导航应用！

## 前置要求

- Node.js 14+ 
- npm 或 yarn

## 1️⃣ 克隆和安装

```bash
# 克隆仓库
git clone <repository>
cd nav-app

# 安装依赖
npm install
```

## 2️⃣ 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 打开。

## 3️⃣ 生产构建

```bash
npm run build
```

构建产物在 `dist/` 目录中。

## 4️⃣ 本地预览

```bash
npm run preview
```

## 📝 下一步

- 编辑 `src/data/navigation.js` 来自定义导航
- 查看 [docs/GUIDE.md](docs/GUIDE.md) 了解更多功能
- 阅读 [README.md](README.md) 获取完整文档

## 🚀 部署

### 部署到 Vercel

```bash
# 使用 Vercel CLI
vercel
```

### 部署到 GitHub Pages

```bash
# 构建静态文件
npm run build

# 推送 dist 目录到 gh-pages 分支
```

### 部署到其他平台

只需将 `dist` 文件夹上传到任何静态文件托管服务：
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- 或任何 Web 服务器

## 📦 Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## ⚙️ 配置

### 环境变量

复制 `.env.example` 到 `.env.local` 并修改：

```bash
cp .env.example .env.local
```

### 自定义导航

编辑 `src/data/navigation.js`:

```javascript
export const navigationData = {
  categories: [
    {
      id: 'my-category',
      name: '我的分类',
      icon: '📌',
      links: [
        {
          id: 'my-link',
          name: 'My Website',
          url: 'https://example.com',
          icon: '🌐',
          description: 'My website description'
        }
      ]
    }
  ]
}
```

## 🐛 常见问题

**端口 5173 已被占用？**
```bash
npm run dev -- --port 3000
```

**需要清除缓存？**
```bash
# 清除 node_modules
rm -rf node_modules
npm install
```

**样式没有加载？**
```bash
# 确保已安装 Sass
npm install sass
```

## 📚 有用的链接

- [Vue 3 文档](https://v3.vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [SCSS 文档](https://sass-lang.com/)

## 💡 提示

- 使用 `npm run lint` 检查代码质量
- 使用 `npm run format` 格式化代码
- 在提交前运行 `npm run build` 确保构建成功

---

**祝您开发愉快！** 🎉
