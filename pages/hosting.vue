<script setup lang="ts">
import { 
  GitBranch, ExternalLink, Code2, Server, 
  Layers, Smartphone, ArrowRight, ShieldAlert, Sparkles 
} from 'lucide-vue-next'

useSeoMeta({
  title: '开源代码｜睿易制造平台 - 源码托管与生态仓库',
  description: '睿易制造平台开源代码托管于 Gitee、GitCode 与 GitHub，包含后端服务、PC前端、工位屏与移动端全套源码。'
})

const repositories = [
  {
    name: 'ruiyi-boot4-pro',
    label: '后端核心服务',
    stack: 'Spring Boot 4.0.6 + Java 17 + PostgreSQL 16 + Sa-Token + Flowable 8',
    desc: '制造业数字化平台（MDP）多租户后端基座，包含 PLM、MES、APS、QC、WMS、Tool 刀具等 19 个业务子模块。',
    links: {
      gitcode: 'https://gitcode.com/ruiyi/ruiyi-boot4-pro',
      gitee: 'https://gitee.com/ruiyi/ruiyi-boot4-pro',
      github: 'https://github.com/pk87654/ruiyi-boot4-pro'
    },
    icon: Server
  },
  {
    name: 'ruiyi-web-vue3',
    label: 'PC 调度端与工位前端',
    stack: 'Vue 3 + Vite 5 + TypeScript + Element Plus + Pinia',
    desc: '面向工厂管理后台与车间工位一体机的前端工程，支持甘特图排产、BOM 结构树与 21.5 寸工位大字号防呆界面。',
    links: {
      gitcode: 'https://gitcode.com/ruiyi/ruiyi-web-vue3',
      gitee: 'https://gitee.com/ruiyi/ruiyi-web-vue3',
      github: 'https://github.com/pk87654/ruiyi-web-vue3'
    },
    icon: Layers
  },
  {
    name: 'rouyi-os-portal',
    label: '官方门户与文档',
    stack: 'Nuxt 3 + Vue 3 + UnoCSS + TypeScript',
    desc: '展示制造数字主线、三码合一现场、多终端体验、开发指南与知识库的现代化官方门户系统。',
    links: {
      gitcode: 'https://gitcode.com/ruiyi/rouyi-os-portal',
      gitee: 'https://gitee.com/ruiyi/rouyi-os-portal',
      github: 'https://github.com/pk87654/rouyi-os-portal'
    },
    icon: Code2
  },
  {
    name: 'ruiyi-app-uniapp',
    label: '移动与 PDA 扫码端',
    stack: 'UniApp + unibest + Vue 3 + TypeScript',
    desc: '面向库房管理员手持 PDA 扫码作业、巡检员质检与车间管理层移动审批的跨端工程。',
    links: {
      gitcode: 'https://gitcode.com/ruiyi/ruiyi-app-uniapp',
      gitee: 'https://gitee.com/ruiyi/ruiyi-app-uniapp',
      github: 'https://github.com/pk87654/ruiyi-app-uniapp'
    },
    icon: Smartphone
  }
]
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Page Head -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="section-kicker">Open Source Repositories</span>
        <h1 class="section-title">开源代码与仓库矩阵</h1>
        <p class="section-copy mx-auto">
          睿易制造平台全套社区版源码托管在 Gitee、GitCode 与 GitHub，可根据团队习惯自由选择拉取与贡献。
        </p>
      </div>

      <!-- Open Source Notice -->
      <div class="p-4 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-soft)] mb-8 flex items-start gap-3.5">
        <ShieldAlert :size="18" class="text-[var(--vp-c-brand-1)] flex-shrink-0 mt-0.5" />
        <div class="text-xs text-[var(--vp-c-text-2)] leading-relaxed">
          <strong class="text-[var(--vp-c-text-1)]">开源与开发说明</strong>：社区开源版提供基础学习、架构体验与二次开发参考。所有仓库遵循统一的模块命名与 Sa-Token 权限体系规范。
        </div>
      </div>

      <!-- Repositories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div
          v-for="repo in repositories"
          :key="repo.name"
          class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] flex items-center justify-center">
                  <component :is="repo.icon" :size="18" />
                </div>
                <div>
                  <h3 class="text-sm font-bold text-[var(--vp-c-text-1)] font-mono">{{ repo.name }}</h3>
                  <span class="text-xs text-[var(--vp-c-brand-1)] font-medium">{{ repo.label }}</span>
                </div>
              </div>
              <span class="tag font-mono text-[10px]">Apache-2.0</span>
            </div>

            <div class="p-2.5 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] text-[11px] text-[var(--vp-c-text-2)] font-mono mb-3">
              {{ repo.stack }}
            </div>

            <p class="text-xs text-[var(--vp-c-text-2)] leading-relaxed mb-5">{{ repo.desc }}</p>
          </div>

          <div class="pt-3 border-t border-[var(--vp-c-divider)] flex flex-wrap items-center gap-2">
            <a
              :href="repo.links.gitcode"
              target="_blank"
              class="vp-btn vp-btn-alt text-xs py-1.5 px-2.5"
            >
              <span>GitCode</span>
              <ExternalLink :size="11" />
            </a>
            <a
              :href="repo.links.gitee"
              target="_blank"
              class="vp-btn vp-btn-alt text-xs py-1.5 px-2.5"
            >
              <span>Gitee 码云</span>
              <ExternalLink :size="11" />
            </a>
            <a
              :href="repo.links.github"
              target="_blank"
              class="vp-btn vp-btn-brand text-xs py-1.5 px-2.5"
            >
              <span>GitHub</span>
              <ExternalLink :size="11" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
