#!/usr/bin/env bash
# ==============================================================================
# deploy.sh - 睿易门户网站生产环境首次部署脚本
# ==============================================================================

set -e

echo "🚀 开始执行睿易门户生产环境初始化部署..."

# 检查 Node 环境
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到 Node.js，请安装 Node.js 18 或 20+"
    exit 1
fi

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 正在全局安装 pnpm..."
    npm install -g pnpm
fi

# 检查 pm2
if ! command -v pm2 &> /dev/null; then
    echo "⚙️ 正在全局安装 PM2 进程守护工具..."
    npm install -g pm2
fi

echo "📦 正在安装工程生产依赖..."
pnpm install

echo "🔨 正在执行 Nuxt 3 生产构建..."
pnpm build

echo "🚀 正在启动 PM2 多核集群服务..."
pm2 start ecosystem.config.cjs
pm2 save

echo "✨ ========================================================"
echo "🎉 睿易门户网站生产环境部署完成！"
echo "👉 PM2 状态查看命令: pm2 status"
echo "👉 运行日志查看命令: pm2 logs ruiyi-portal"
echo "✨ ========================================================"
