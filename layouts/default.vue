<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon, Search, ChevronDown, Github } from 'lucide-vue-next'

const isDark = ref(false)
const isGuideOpen = ref(false)
const isBlogOpen = ref(false)
const isMobileMenuOpen = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.documentElement.classList.add('light')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="site-wrapper min-h-screen flex flex-col justify-between">
    <!-- VitePress Standard Top Navigation Bar -->
    <header class="vp-nav">
      <div class="vp-container vp-nav-inner">
        <!-- Brand Title -->
        <NuxtLink to="/" class="vp-nav-brand">
          <span class="vp-nav-brand-logo">R</span>
          <span>睿易 MDP 文档</span>
        </NuxtLink>

        <!-- Center Search Trigger Button -->
        <div class="vp-nav-search hidden md:flex" @click="$router.push('/docs/quick-start/start')">
          <Search :size="14" />
          <span>搜索文档</span>
          <span class="vp-nav-search-kbd">Ctrl K</span>
        </div>

        <!-- Navigation Links matching ruoyioffice -->
        <nav class="vp-nav-links hidden lg:flex">
          <NuxtLink to="/" class="vp-nav-link" active-class="active">首页</NuxtLink>
          <!-- Product Dropdown -->
          <div class="relative group">
            <NuxtLink to="/docs/product/overview" class="vp-nav-link flex items-center gap-1" active-class="active">
              <span>产品功能</span>
              <ChevronDown :size="13" class="transition group-hover:rotate-180" />
            </NuxtLink>
            <div
              class="hidden group-hover:flex absolute top-full left-0 w-64 p-2 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] shadow-xl z-50 flex-col gap-1 text-xs"
            >
              <NuxtLink to="/docs/product/overview" class="p-2.5 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                <div class="flex items-center justify-between">
                  <strong class="text-[var(--vp-c-brand-1)]">睿易 MDP</strong>
                  <span class="tag text-[10px]">开源旗舰</span>
                </div>
                <span class="text-[11px] text-[var(--vp-c-text-3)]">离散机加工 / 零部件 / 装配数字化</span>
              </NuxtLink>
              <NuxtLink to="/docs/product/mouldlink" class="p-2.5 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)] border-t border-[var(--vp-c-divider)]">
                <div class="flex items-center justify-between">
                  <strong class="text-purple-600 dark:text-purple-400">睿易模界 (MouldLink)</strong>
                  <span class="tag bg-purple-500/10 text-purple-600 border-purple-500/30 text-[10px] font-bold">✨ 预热</span>
                </div>
                <span class="text-[11px] text-[var(--vp-c-text-3)]">模具协同 / 外协 Supplier MES / 试模闭环</span>
              </NuxtLink>
            </div>
          </div>
          <NuxtLink to="/docs/quick-start/start" class="vp-nav-link" active-class="active">快速开始</NuxtLink>
          
          <!-- Guide Dropdown -->
          <div class="relative group" @mouseenter="isGuideOpen = true" @mouseleave="isGuideOpen = false">
            <NuxtLink to="/docs/guide/bpm-guide" class="vp-nav-link flex items-center gap-1" active-class="active">
              <span>开发指南</span>
              <ChevronDown :size="13" class="transition group-hover:rotate-180" />
            </NuxtLink>
            <div
              v-show="isGuideOpen"
              class="absolute top-full left-0 w-44 p-2 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] shadow-xl z-50 flex flex-col gap-1 text-xs"
            >
              <NuxtLink to="/docs/guide/bpm-guide" class="p-2 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                工作流 BPM 手册
              </NuxtLink>
              <NuxtLink to="/docs/guide/form-dev" class="p-2 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                表单开发
              </NuxtLink>
              <NuxtLink to="/docs/guide/plm-dev" class="p-2 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                PLM 工艺包二开
              </NuxtLink>
            </div>
          </div>

          <!-- Blog Dropdown -->
          <div class="relative group" @mouseenter="isBlogOpen = true" @mouseleave="isBlogOpen = false">
            <NuxtLink to="/docs/blog/list" class="vp-nav-link flex items-center gap-1" active-class="active">
              <span>博客文章</span>
              <ChevronDown :size="13" class="transition group-hover:rotate-180" />
            </NuxtLink>
            <div
              v-show="isBlogOpen"
              class="absolute top-full left-0 w-44 p-2 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] shadow-xl z-50 flex flex-col gap-1 text-xs"
            >
              <NuxtLink to="/docs/blog/list" class="p-2 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                文章总览
              </NuxtLink>
              <NuxtLink to="/docs/blog/snapshot-article" class="p-2 rounded hover:bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                工艺快照隔离实战
              </NuxtLink>
            </div>
          </div>

          <NuxtLink to="/docs/demo/home" class="vp-nav-link" active-class="active">在线体验</NuxtLink>
          <NuxtLink to="/kb" class="vp-nav-link" active-class="active">知识库</NuxtLink>
          <NuxtLink to="/docs/commercial/diff" class="vp-nav-link" active-class="active">商业版</NuxtLink>
          <NuxtLink to="/hosting" class="vp-nav-link" active-class="active">开源代码</NuxtLink>
        </nav>

        <!-- Right Tools: Theme Switch & Github -->
        <div class="vp-nav-tools">
          <button
            @click="toggleTheme"
            class="vp-tool-btn"
            type="button"
            :title="isDark ? '切换至浅色模式' : '切换至暗色模式'"
          >
            <Sun v-if="isDark" :size="18" />
            <Moon v-else :size="18" />
          </button>

          <a
            href="https://github.com/pk87654/ruiyi-boot4-pro"
            target="_blank"
            class="vp-tool-btn"
            title="GitHub 仓库"
          >
            <Github :size="18" />
          </a>

          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="lg:hidden p-2 text-[var(--vp-c-text-1)]"
            type="button"
          >
            <span class="text-xl">☰</span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div v-if="isMobileMenuOpen" class="lg:hidden p-4 bg-[var(--vp-c-bg-elv)] border-b border-[var(--vp-c-border)] flex flex-col gap-3 text-sm">
        <NuxtLink to="/" @click="isMobileMenuOpen = false">首页</NuxtLink>
        <NuxtLink to="/docs/product/overview" @click="isMobileMenuOpen = false">产品功能</NuxtLink>
        <NuxtLink to="/docs/quick-start/start" @click="isMobileMenuOpen = false">快速开始</NuxtLink>
        <NuxtLink to="/docs/guide/bpm-guide" @click="isMobileMenuOpen = false">开发指南</NuxtLink>
        <NuxtLink to="/docs/blog/list" @click="isMobileMenuOpen = false">博客文章</NuxtLink>
        <NuxtLink to="/docs/demo/home" @click="isMobileMenuOpen = false">在线体验</NuxtLink>
        <NuxtLink to="/kb" @click="isMobileMenuOpen = false">知识库</NuxtLink>
        <NuxtLink to="/docs/commercial/diff" @click="isMobileMenuOpen = false">商业版</NuxtLink>
        <NuxtLink to="/hosting" @click="isMobileMenuOpen = false">开源代码</NuxtLink>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-body pt-16 flex-1">
      <slot />
    </main>

    <!-- VitePress Standard Footer -->
    <footer class="vp-footer">
      <div class="vp-container vp-footer-inner">
        <div>
          <strong class="text-[var(--vp-c-text-1)]">睿易制造平台 (Ruiyi MDP)</strong>
          <span class="ml-2 text-[var(--vp-c-text-3)]">面向开发者与工厂 IT 的开源数字制造平台与开发文档。</span>
        </div>
        <div>
          <span class="text-[var(--vp-c-text-3)]">Released under the Apache-2.0 License. © {{ new Date().getFullYear() }} Ruiyi OS</span>
        </div>
      </div>
    </footer>

    <!-- Floating Contact & Community Widget -->
    <FloatingContact />
  </div>
</template>
