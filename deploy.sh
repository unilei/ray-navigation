#!/bin/bash

# 导航应用部署脚本
# 用于快速部署到 GitHub Pages

set -e

echo "🚀 开始部署导航应用..."

# 检查是否有未提交的更改
if [[ -n $(git status -s) ]]; then
    echo "⚠️  检测到未提交的更改"
    read -p "是否继续部署？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 部署已取消"
        exit 1
    fi
fi

# 检查当前分支
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 当前分支: $CURRENT_BRANCH"

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
rm -rf dist

# 安装依赖
echo "📦 安装依赖..."
npm install

# 代码检查
echo "🔍 运行代码检查..."
npm run lint || {
    echo "❌ 代码检查失败，请修复错误后重试"
    exit 1
}

# 构建项目
echo "🔨 构建项目..."
NODE_ENV=production npm run build || {
    echo "❌ 构建失败"
    exit 1
}

# 检查 dist 目录
if [ ! -d "dist" ]; then
    echo "❌ dist 目录不存在"
    exit 1
fi

echo "✅ 构建成功！"

# 选择部署方式
echo ""
echo "请选择部署方式："
echo "1) 推送到 main 分支（触发自动部署）"
echo "2) 仅构建，不部署"
echo "3) 退出"
read -p "请输入选项 (1-3): " -n 1 -r
echo

case $REPLY in
    1)
        echo "📤 准备推送到 main 分支..."
        
        # 如果不在 main 分支，切换到 main
        if [ "$CURRENT_BRANCH" != "main" ]; then
            echo "⚠️  当前不在 main 分支"
            read -p "是否切换到 main 分支？(y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                git checkout main
                git pull origin main
            else
                echo "❌ 部署已取消"
                exit 1
            fi
        fi
        
        # 提交并推送
        git add .
        read -p "请输入提交信息: " COMMIT_MSG
        if [ -z "$COMMIT_MSG" ]; then
            COMMIT_MSG="部署: $(date '+%Y-%m-%d %H:%M:%S')"
        fi
        
        git commit -m "$COMMIT_MSG" || echo "没有需要提交的更改"
        git push origin main
        
        echo "✅ 代码已推送到 main 分支"
        echo "🔄 GitHub Actions 将自动构建和部署"
        echo "📊 查看部署状态: https://github.com/unilei/ray-navigation/actions"
        echo "🌐 部署完成后访问: https://unilei.github.io/ray-navigation/"
        ;;
    2)
        echo "✅ 构建完成，文件位于 dist 目录"
        echo "💡 你可以运行 'npm run preview' 预览构建结果"
        ;;
    3)
        echo "👋 再见！"
        exit 0
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "🎉 完成！"
