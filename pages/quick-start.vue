<script setup lang="ts">
import { 
  Terminal, Server, Database, Code2, Play, 
  Check, Copy, AlertTriangle, ArrowRight, ExternalLink, Sparkles 
} from 'lucide-vue-next'

useSeoMeta({
  title: '快速启动文档｜睿易制造平台 - 15分钟从零拉起前后端',
  description: '面向开发者与工厂 IT 工程师的快速上手指南：环境准备、Docker-Compose 依赖拉起、PostgreSQL 16 初始化、后端 Spring Boot 4 与前端启动。'
})

const copiedIndex = ref<number | null>(null)

const copyCode = (code: string, idx: number) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code)
    copiedIndex.value = idx
    setTimeout(() => {
      copiedIndex.value = null
    }, 2000)
  }
}

const envTable = [
  { item: 'JDK', req: '17', desc: '推荐 OpenJDK 17 / Eclipse Temurin 17' },
  { item: 'Maven', req: '3.8+', desc: '用于后端多模块依赖管理与编译' },
  { item: 'PostgreSQL', req: '16.0+', desc: '核心主库（必须具备 JSONB 原生支持）' },
  { item: 'Redis', req: '7.0+', desc: '用于 Sa-Token 会话、菜单版本与临时上下文' },
  { item: 'Node.js', req: '18+ / 20+ / 22+', desc: '用于前端项目编译构建' },
  { item: 'pnpm', req: '9.x+ / 11.x', desc: '前端包管理工具（推荐 pnpm）' },
  { item: 'IDE', req: 'IDEA 2023+ / VS Code', desc: '推荐 IntelliJ IDEA 配合 Lombok 插件' }
]

const dockerComposeYaml = `version: '3.8'
services:
  ruiyi-postgres:
    image: postgres:16-alpine
    container_name: ruiyi-postgres
    restart: always
    environment:
      POSTGRES_DB: ruiyi_mdp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
    ports:
      - "5432:5432"
    volumes:
      - ./data/postgres:/var/lib/postgresql/data

  ruiyi-redis:
    image: redis:7-alpine
    container_name: ruiyi-redis
    restart: always
    command: redis-server --requirepass root
    ports:
      - "6379:6379"
    volumes:
      - ./data/redis:/data`
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Page Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="section-kicker">Quick Start Guide</span>
        <h1 class="section-title">快速启动与部署实战</h1>
        <p class="section-copy mx-auto">
          面向开发者与工厂 IT 工程师。预计 15~30 分钟即可在本地或私有服务器完整拉起前后端全套服务。
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Main Content -->
        <div class="lg:col-span-8 space-y-8">
          <!-- Step 1: Env Check -->
          <div id="step-1" class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
            <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-md bg-[var(--vp-c-brand-1)] text-white flex items-center justify-center text-xs font-bold font-mono">01</span>
              <span>环境准备与依赖要求</span>
            </h2>
            <p class="text-xs text-[var(--vp-c-text-3)] mb-4">在开始前，请确保您的开发机或服务器已安装以下基础运行环境：</p>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse">
                <thead>
                  <tr class="border-b border-[var(--vp-c-divider)] text-[var(--vp-c-text-3)]">
                    <th class="py-2.5 px-3">环境组件</th>
                    <th class="py-2.5 px-3 text-[var(--vp-c-brand-1)] font-mono">要求版本</th>
                    <th class="py-2.5 px-3">说明与建议</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--vp-c-divider)]">
                  <tr v-for="row in envTable" :key="row.item" class="hover:bg-[var(--vp-c-bg-soft)] transition">
                    <td class="py-2.5 px-3 text-[var(--vp-c-text-1)] font-bold">{{ row.item }}</td>
                    <td class="py-2.5 px-3 text-[var(--vp-c-brand-1)] font-mono">{{ row.req }}</td>
                    <td class="py-2.5 px-3 text-[var(--vp-c-text-2)]">{{ row.desc }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Step 2: One-Click Docker -->
          <div id="step-2" class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] flex items-center gap-2.5">
                <span class="w-6 h-6 rounded-md bg-[var(--vp-c-brand-1)] text-white flex items-center justify-center text-xs font-bold font-mono">02</span>
                <span>一键启动基础中间件 (Docker-Compose)</span>
              </h2>
              <span class="tag">推荐方式</span>
            </div>
            <p class="text-xs text-[var(--vp-c-text-3)] mb-4">使用 Docker 极速拉起 PostgreSQL 16 与 Redis 7，无需手动安装繁琐服务：</p>

            <div class="relative rounded-lg p-4 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] font-mono text-xs text-[var(--vp-c-text-1)]">
              <button
                @click="copyCode(dockerComposeYaml, 1)"
                class="absolute top-2.5 right-2.5 py-1 px-2 rounded bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] hover:border-[var(--vp-c-brand-1)] text-[var(--vp-c-text-2)] text-[11px] flex items-center gap-1 transition cursor-pointer"
              >
                <Check v-if="copiedIndex === 1" :size="12" class="text-[var(--vp-c-brand-1)]" />
                <Copy v-else :size="12" />
                <span>{{ copiedIndex === 1 ? '已复制' : '复制代码' }}</span>
              </button>
              <pre class="overflow-x-auto pr-16 leading-relaxed"><code>{{ dockerComposeYaml }}</code></pre>
            </div>

            <div class="mt-3.5 p-3 bg-[var(--vp-c-brand-soft)] border border-[var(--vp-c-brand-1)] rounded-lg text-xs text-[var(--vp-c-brand-1)] flex items-center gap-2">
              <Terminal :size="14" />
              <span>运行命令：<code>docker-compose up -d</code> 即可就绪数据库与缓存。</span>
            </div>
          </div>

          <!-- Step 3: DB Init -->
          <div id="step-3" class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
            <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-md bg-[var(--vp-c-brand-1)] text-white flex items-center justify-center text-xs font-bold font-mono">03</span>
              <span>数据库初始化与 SQL 导入</span>
            </h2>
            <p class="text-xs text-[var(--vp-c-text-3)] mb-4">连接至 PostgreSQL 数据库，按序执行初始化脚本：</p>

            <div class="space-y-2.5 text-xs text-[var(--vp-c-text-2)]">
              <div class="p-3 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] flex items-start gap-2.5">
                <div class="w-5 h-5 rounded bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] flex items-center justify-center font-mono font-bold text-[10px]">1</div>
                <div>
                  <strong class="text-[var(--vp-c-text-1)] block mb-0.5">主表结构与初始数据：</strong>
                  <code class="text-[var(--vp-c-brand-1)]">sql/postgresql/ruoyi-vue-pro.sql</code>（包含用户、角色与基础表）。
                </div>
              </div>
              <div class="p-3 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] flex items-start gap-2.5">
                <div class="w-5 h-5 rounded bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] flex items-center justify-center font-mono font-bold text-[10px]">2</div>
                <div>
                  <strong class="text-[var(--vp-c-text-1)] block mb-0.5">制造平台 235 个完整菜单与权限：</strong>
                  <code class="text-[var(--vp-c-brand-1)]">sql/postgresql/制造业管理系统_完整菜单SQL_v2.sql</code>。
                </div>
              </div>
              <div class="p-3 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] flex items-start gap-2.5">
                <div class="w-5 h-5 rounded bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] flex items-center justify-center font-mono font-bold text-[10px]">3</div>
                <div>
                  <strong class="text-[var(--vp-c-text-1)] block mb-0.5">执行增量迁移脚本（如需）：</strong>
                  <code class="text-[var(--vp-c-brand-1)]">sql/migration/postgresql/</code> 目录下的最新增量 SQL。
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Backend Run -->
          <div id="step-4" class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
            <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-md bg-[var(--vp-c-brand-1)] text-white flex items-center justify-center text-xs font-bold font-mono">04</span>
              <span>后端工程启动 (ruiyi-boot4-pro)</span>
            </h2>
            <p class="text-xs text-[var(--vp-c-text-3)] mb-4">在 IntelliJ IDEA 中打开后端工程，完成依赖构建与启动：</p>

            <div class="p-3.5 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] font-mono text-xs text-[var(--vp-c-text-1)] mb-3">
              <div class="text-[var(--vp-c-text-3)] mb-1"># 启动类位置</div>
              <div>ruiyi-server/src/main/java/cn/code/ruiyi/server/RuiyiServerApplication.java</div>
            </div>

            <div class="text-xs text-[var(--vp-c-text-2)]">
              启动成功后访问 Knife4j 接口文档：<code class="text-[var(--vp-c-brand-1)] font-mono">http://localhost:48080/doc.html</code>。
            </div>
          </div>

          <!-- Step 5: Frontend Run -->
          <div id="step-5" class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
            <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
              <span class="w-6 h-6 rounded-md bg-[var(--vp-c-brand-1)] text-white flex items-center justify-center text-xs font-bold font-mono">05</span>
              <span>前端工程启动 (ruiyi-web-vue3)</span>
            </h2>
            <p class="text-xs text-[var(--vp-c-text-3)] mb-4">在前端工程根目录运行 pnpm 命令安装依赖并启动热更新：</p>

            <div class="p-3.5 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] font-mono text-xs text-[var(--vp-c-text-1)] mb-3">
              <div class="text-[var(--vp-c-brand-1)]">pnpm install && pnpm dev</div>
            </div>

            <div class="text-xs text-[var(--vp-c-text-2)]">
              打开 <code class="text-[var(--vp-c-brand-1)] font-mono">http://localhost:80</code>，使用管理员账号 <code class="font-bold text-[var(--vp-c-text-1)]">admin / 123456</code> 登录。
            </div>
          </div>
        </div>

        <!-- Right TOC -->
        <div class="lg:col-span-4 space-y-4">
          <div class="p-5 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] sticky top-24">
            <h3 class="text-xs font-bold text-[var(--vp-c-text-1)] uppercase tracking-wider mb-3">
              本页目录
            </h3>
            <nav class="space-y-1.5 text-xs text-[var(--vp-c-text-2)]">
              <a href="#step-1" class="block py-1 hover:text-[var(--vp-c-brand-1)] transition">01. 环境准备与依赖要求</a>
              <a href="#step-2" class="block py-1 hover:text-[var(--vp-c-brand-1)] transition">02. 一键启动 Docker 中间件</a>
              <a href="#step-3" class="block py-1 hover:text-[var(--vp-c-brand-1)] transition">03. 数据库初始化 SQL 导入</a>
              <a href="#step-4" class="block py-1 hover:text-[var(--vp-c-brand-1)] transition">04. 后端启动 (Spring Boot 4)</a>
              <a href="#step-5" class="block py-1 hover:text-[var(--vp-c-brand-1)] transition">05. 前端启动 (Vue 3)</a>
            </nav>

            <div class="mt-5 pt-4 border-t border-[var(--vp-c-divider)]">
              <NuxtLink to="/architecture" class="text-xs text-[var(--vp-c-brand-1)] font-semibold flex items-center gap-1 hover:underline">
                <span>深入 V5.0 架构总纲</span>
                <ArrowRight :size="12" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
