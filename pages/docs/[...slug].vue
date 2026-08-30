<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { multiSidebars, type DocCategory, type DocItem } from '~/data/docsData'
import { 
  Search, ChevronRight, BookOpen, AlertTriangle, 
  Terminal, ArrowRight, ExternalLink, Check, Copy 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// Parse route params: /docs/quick-start/start or /docs/product/overview
const categoryKey = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params) && params.length > 0) {
    return params[0] || 'product'
  }
  return 'product'
})

const itemSlug = computed(() => {
  const params = route.params.slug
  if (Array.isArray(params) && params.length > 1) {
    return params[1] || ''
  }
  // Default to first item of first group
  const cat = multiSidebars[categoryKey.value] || multiSidebars['product']
  return cat.groups[0]?.items[0]?.id || 'overview'
})

// Current Category Data
const currentCategory = computed<DocCategory>(() => {
  return multiSidebars[categoryKey.value] || multiSidebars['product']
})

// Current Active Doc Item
const activeDoc = computed<{ item: DocItem; groupTitle: string }>(() => {
  for (const group of currentCategory.value.groups) {
    const found = group.items.find(i => i.id === itemSlug.value)
    if (found) return { item: found, groupTitle: group.title }
  }
  // Fallback to first item
  const firstGroup = currentCategory.value.groups[0]
  const firstItem = firstGroup?.items[0] || { id: 'overview', title: '概述', desc: '' }
  return { item: firstItem, groupTitle: firstGroup?.title || '概述' }
})

// Sidebar Search Filter
const searchKeyword = ref('')
const filteredGroups = computed(() => {
  if (!searchKeyword.value.trim()) return currentCategory.value.groups
  const kw = searchKeyword.value.toLowerCase()
  return currentCategory.value.groups.map(g => ({
    ...g,
    items: g.items.filter(i => i.title.toLowerCase().includes(kw) || (i.desc && i.desc.toLowerCase().includes(kw)))
  })).filter(g => g.items.length > 0)
})

// Copy code utility
const copied = ref(false)
const copyCode = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

useSeoMeta({
  title: computed(() => `${activeDoc.value.item.title}｜${currentCategory.value.name} - 睿易制造平台技术文档`),
  description: computed(() => activeDoc.value.item.desc || '睿易制造平台技术文档')
})
</script>

<template>
  <div class="vp-docs-layout min-h-[calc(100vh-64px)] flex">
    <!-- 1. Left Multi-Sidebar (VPSidebar matching ruoyioffice) -->
    <aside class="vp-docs-sidebar w-[280px] flex-shrink-0 border-r border-[var(--vp-c-divider)] bg-[var(--vp-c-bg)] sticky top-16 h-[calc(100vh-64px)] overflow-hidden flex flex-col">
      <!-- Top Category Title & Search Box -->
      <div class="p-3.5 border-b border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)]">
        <div class="flex items-center justify-between mb-2 px-1">
          <span class="text-sm font-bold text-[var(--vp-c-text-1)]">{{ currentCategory.name }} 文档</span>
          <span class="tag text-xs font-mono">v5.0</span>
        </div>
        <div class="relative">
          <Search :size="14" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--vp-c-text-3)]" />
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索当前文档..."
            class="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] text-[var(--vp-c-text-1)] placeholder-[var(--vp-c-text-3)] outline-none focus:border-[var(--vp-c-brand-1)] transition"
          />
        </div>
      </div>

      <!-- Navigation Tree -->
      <div class="flex-1 overflow-y-auto p-3.5 space-y-6">
        <div v-for="group in filteredGroups" :key="group.title" class="space-y-1.5">
          <div class="text-xs font-bold text-[var(--vp-c-text-3)] uppercase tracking-wider px-2 py-1">
            {{ group.title }}
          </div>
          <div class="space-y-1">
            <NuxtLink
              v-for="item in group.items"
              :key="item.id"
              :to="`/docs/${categoryKey}/${item.id}`"
              :class="[
                'flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition cursor-pointer',
                itemSlug === item.id
                  ? 'bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] font-bold'
                  : 'text-[var(--vp-c-text-2)] hover:text-[var(--vp-c-text-1)] hover:bg-[var(--vp-c-bg-soft)]'
              ]"
            >
              <span class="truncate">{{ item.title }}</span>
              <ChevronRight v-if="itemSlug === item.id" :size="14" class="flex-shrink-0" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </aside>

    <!-- 2. Center Document Content Area (VPDoc) -->
    <main class="flex-1 min-w-0 py-10 px-6 md:px-14">
      <div class="max-w-4xl mx-auto">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-2 text-xs text-[var(--vp-c-text-3)] mb-5">
          <NuxtLink to="/" class="hover:underline">首页</NuxtLink>
          <span>/</span>
          <NuxtLink :to="`/docs/${categoryKey}`" class="hover:underline">{{ currentCategory.name }}</NuxtLink>
          <span>/</span>
          <span>{{ activeDoc.groupTitle }}</span>
          <span>/</span>
          <span class="text-[var(--vp-c-text-1)] font-semibold">{{ activeDoc.item.title }}</span>
        </div>

        <!-- Document Main Title (# Title Header matching ruoyioffice) -->
        <div class="pb-6 border-b border-[var(--vp-c-divider)] mb-8">
          <h1 class="vp-doc-h1">
            <span class="hash-anchor">#</span>
            <span>{{ activeDoc.item.title }}</span>
          </h1>
          <p v-if="activeDoc.item.desc" class="vp-doc-lead">
            {{ activeDoc.item.desc }}
          </p>
        </div>

        <!-- Warning Callout Block matching ruoyioffice screenshot -->
        <div
          v-if="categoryKey === 'commercial' || categoryKey === 'quick-start'"
          class="vp-callout-warning"
        >
          <AlertTriangle :size="18" class="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong>说明</strong>：社区开源版源码已同步至 Gitee / GitHub。如需生产环境落地、工艺快照隔离或多工厂排程支持，请参考架构总纲与二开指南。
          </div>
        </div>

        <!-- Lead Callout Block if exists -->
        <div
          v-if="activeDoc.item.content?.lead"
          class="vp-callout-tip"
        >
          {{ activeDoc.item.content.lead }}
        </div>

        <!-- Document Sections -->
        <div v-if="activeDoc.item.content?.sections" class="space-y-8 text-base leading-relaxed text-[var(--vp-c-text-1)]">
          <section
            v-for="(sec, idx) in activeDoc.item.content.sections"
            :key="idx"
            class="space-y-3.5"
          >
            <h2 class="vp-doc-h2">
              {{ sec.title }}
            </h2>
            <p v-if="sec.body" class="vp-doc-p whitespace-pre-line">
              {{ sec.body }}
            </p>

            <!-- Markdown Table Render -->
            <div v-if="sec.table" class="overflow-x-auto my-6">
              <table class="w-full text-left text-sm border-collapse border border-[var(--vp-c-border)] rounded-lg overflow-hidden">
                <thead class="bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                  <tr>
                    <th
                      v-for="h in sec.table.headers"
                      :key="h"
                      class="p-3.5 border-b border-[var(--vp-c-border)] font-bold"
                    >
                      {{ h }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--vp-c-divider)]">
                  <tr
                    v-for="(row, rIdx) in sec.table.rows"
                    :key="rIdx"
                    class="hover:bg-[var(--vp-c-bg-soft)] transition"
                  >
                    <td
                      v-for="(cell, cIdx) in row"
                      :key="cIdx"
                      :class="[
                        'p-3.5',
                        cIdx === 0 ? 'font-bold text-[var(--vp-c-text-1)]' : 'text-[var(--vp-c-text-2)]'
                      ]"
                    >
                      {{ cell }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Code Block Render -->
            <div v-if="sec.code" class="relative rounded-lg p-5 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] font-mono text-xs md:text-sm text-[var(--vp-c-text-1)] my-5">
              <button
                @click="copyCode(sec.code.snippet)"
                class="absolute top-3 right-3 py-1.5 px-3 rounded bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] hover:border-[var(--vp-c-brand-1)] text-[var(--vp-c-text-2)] text-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Check v-if="copied" :size="13" class="text-[var(--vp-c-brand-1)]" />
                <Copy v-else :size="13" />
                <span>{{ copied ? '已复制' : '复制代码' }}</span>
              </button>
              <pre class="overflow-x-auto pr-16 leading-relaxed"><code>{{ sec.code.snippet }}</code></pre>
            </div>
          </section>
        </div>

        <!-- Fallback Placeholder when content is to be added -->
        <div v-else class="space-y-6 text-base leading-relaxed text-[var(--vp-c-text-1)]">
          <div class="p-4 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-soft)] text-sm text-[var(--vp-c-text-3)]">
            本章节详细技术实现与二开指南正在依据 <code>ruiyi-boot4-pro</code> 源码持续更新，欢迎在开源社区共同完善。
          </div>

          <section class="space-y-3.5">
            <h2 class="vp-doc-h2">一、功能概述</h2>
            <p class="vp-doc-p">针对中小型离散制造车间的作业环境，提供标准化、高内聚的工业级设计，打通全流程数字主线。</p>
          </section>

          <section class="space-y-3.5">
            <h2 class="vp-doc-h2">二、二开建议</h2>
            <div class="p-4 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] font-mono text-sm text-[var(--vp-c-brand-1)]">
              // 模块源码路径：cn.code.ruiyi.module.{{ activeDoc.item.id }}
            </div>
          </section>
        </div>

        <!-- Document Footer Pagination -->
        <div class="mt-16 pt-8 border-t border-[var(--vp-c-divider)] flex justify-between items-center text-sm">
          <NuxtLink :to="`/docs/${categoryKey}`" class="vp-btn vp-btn-alt text-xs py-2 px-4">
            <span>← 上一篇</span>
          </NuxtLink>
          <NuxtLink to="/quick-start" class="vp-btn vp-btn-brand text-xs py-2 px-4">
            <span>下一篇 →</span>
          </NuxtLink>
        </div>
      </div>
    </main>

    <!-- 3. Right TOC Outline (VPDocAside) -->
    <aside class="hidden xl:block w-[240px] flex-shrink-0 p-8 sticky top-16 h-[calc(100vh-64px)] text-sm">
      <div class="font-bold text-xs text-[var(--vp-c-text-1)] uppercase tracking-wider mb-4">
        On this page
      </div>
      <nav class="space-y-2.5 text-xs text-[var(--vp-c-text-3)]">
        <a href="#" class="block hover:text-[var(--vp-c-brand-1)] transition">文档总览</a>
        <a v-if="activeDoc.item.content?.sections" v-for="(s, idx) in activeDoc.item.content.sections" :key="idx" href="#" class="block hover:text-[var(--vp-c-brand-1)] transition truncate">
          {{ s.title }}
        </a>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
@media (max-width: 860px) {
  .vp-docs-sidebar {
    display: none;
  }
}
</style>
