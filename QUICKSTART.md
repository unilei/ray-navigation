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

### 自动部署到 GitHub Pages（推荐）

最简单的部署方式：

```bash
# 使用部署脚本
npm run deploy:auto
# 或
./deploy.sh
```

脚本会自动：
1. ✅ 检查代码
2. 🔨 构建项目
3. 📤 推送到 main 分支
4. 🚀 触发 GitHub Actions 自动部署

**或者手动推送**：

```bash
git add .
git commit -m "部署更新"
git push origin main
```

代码推送后，GitHub Actions 会自动构建和部署。

**部署地址**: https://unilei.github.io/ray-navigation/

### 部署到 Vercel

```bash
# 使用 Vercel CLI
vercel
```

### 部署到 Netlify

```bash
# 使用 Netlify CLI
netlify deploy --prod
```

### 部署到其他平台

只需将 `dist` 文件夹上传到任何静态文件托管服务：
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- 或任何 Web 服务器

📚 **完整部署文档**: [DEPLOY.md](DEPLOY.md)  
✅ **部署检查清单**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

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

## 🐛 调试

遇到问题？我们提供了完整的调试工具和文档：

**使用内置调试工具**
```javascript
import { devLog, devTable, devTimer } from './utils/debug'

devLog('调试信息')
devTable(data, '数据标题')
const stop = devTimer('操作名称')
// ... 代码 ...
stop()
```

**VSCode 调试**
1. 启动开发服务器：`npm run dev`
2. 按 `F5` 启动调试
3. 在代码中设置断点

**浏览器 DevTools**
- 按 `F12` 打开开发者工具
- 安装 [Vue DevTools](https://devtools.vuejs.org/) 扩展
- 查看 Console、Network、Performance 面板

📖 查看完整的 [调试指南](docs/DEBUG.md) 和 [调试示例](docs/DEBUG_EXAMPLES.md)

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
