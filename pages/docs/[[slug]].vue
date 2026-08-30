<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  GitMerge, ShieldCheck, QrCode, CalendarClock, Cpu, 
  Terminal, Database, Code2, Workflow, Layers, 
  FileSpreadsheet, FileText, CheckCircle2, ArrowRight, 
  ChevronRight, BookOpen, Wrench, Smartphone, Search, Monitor, Tv 
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// Get current slug from route params
const currentSlug = computed(() => {
  const slugParam = route.params.slug
  if (Array.isArray(slugParam)) return slugParam[0] || 'overview'
  return slugParam || 'overview'
})

// Complete Technical Documentation Sidebar Tree
const docSidebar = [
  {
    title: '产品概述与定位',
    items: [
      { id: 'overview', title: '产品概述与定位', desc: '平台设计理念、面向人群与制造业痛点' },
      { id: 'values', title: '核心价值与设计原则', desc: '一体化、工艺驱动、防呆闭环与现代底座' },
      { id: 'digital-thread', title: '制造数字主线 (Digital Thread)', desc: '一数一源穿透制造全生命周期' }
    ]
  },
  {
    title: '总体架构设计',
    items: [
      { id: 'biz-arch', title: '业务架构与 19 个模块边界', desc: 'PLM、MES、APS、QMS、WMS 等模块划分' },
      { id: 'tech-arch', title: '技术架构 (SB4 + PG16 + Sa-Token)', desc: 'Java 17、PostgreSQL 16 JSONB 与轻量鉴权' },
      { id: 'snapshot-arch', title: '工单工艺快照隔离原理', desc: 'JSONB + SHA-256 防篡改与四层就绪度' },
      { id: 'deploy-arch', title: '部署架构 (单体 / Docker 容器化)', desc: '单体一键拉起与纯私有化容器部署' }
    ]
  },
  {
    title: '制造核心模块详解',
    items: [
      { id: 'plm', title: 'PLM 工艺设计与四层就绪度', desc: 'BOM 结构、工步参数与受控发布' },
      { id: 'mes', title: 'MES 制造执行与三码合一', desc: 'MFG:// 工业码、DPX 工位机与敏捷报工' },
      { id: 'aps', title: 'APS 排产与 Planning Hub', desc: '数字计划白板、基线偏差追踪与日历约束' },
      { id: 'qms', title: 'QMS 质量追溯与独立返工单', desc: '首检拦截、MRB 处置台账与产品谱系' },
      { id: 'wms', title: 'WMS 智能仓储与齐套发料', desc: '库位动态管理、齐套预检与先进先出' },
      { id: 'tool', title: 'Tool 刀具夹具全生命周期', desc: '对刀参数、寿命预警与刃磨报废' },
      { id: 'esop', title: 'E-SOP 电子作业指导书', desc: '图纸步骤动态下发与工位触控' },
      { id: 'bpm', title: 'Flowable 8 流程中心', desc: 'BPMN 2.0 工艺图纸多级签审' },
      { id: 'screen', title: '车间 4K 生产大屏与 Andon', desc: '产线节拍、机台 OEE 与实时异常呼叫' }
    ]
  },
  {
    title: '快速开始与部署',
    items: [
      { id: 'quick-start', title: '15分钟环境从零拉起', desc: 'JDK 17、PostgreSQL 16 与依赖检查' },
      { id: 'docker', title: 'Docker-Compose 一键中间件', desc: 'PG16 + Redis7 极速配置' },
      { id: 'db-init', title: '数据库初始化与 235 菜单导入', desc: 'SQL 导入顺序与增量迁移' },
      { id: 'troubleshooting', title: '启动踩坑与排障手册', desc: '常见报错排查与本地联调' }
    ]
  },
  {
    title: '二次开发与实战规范',
    items: [
      { id: 'dev-standards', title: '后端标准分层编码规范', desc: 'Controller / Service / DAL 标准约束' },
      { id: 'sa-token-guide', title: 'Sa-Token 权限与多租户隔离', desc: '细粒度注解与禁止手写 tenant_id 硬规则' },
      { id: 'fastexcel-guide', title: 'FastExcel 高性能流式导出', desc: '百万级生产大表秒级导出与零 OOM' },
      { id: 'ai-coding', title: 'AI Coding 提示词与 Skills 提效', desc: 'Antigravity / Cursor 专属二开包' }
    ]
  },
  {
    title: '工厂现场与硬件对接',
    items: [
      { id: 'scanner', title: '工业扫码枪 / PDA 串口与 HID', desc: '前缀解析、扫码防抖与无线 PDA' },
      { id: 'dpx-kiosk', title: '21.5寸工位屏防油污触控适配', desc: '大字号排版与全屏防误触' },
      { id: 'pg16-jsonb', title: 'PostgreSQL 16 JSONB 读写调优', desc: 'GIN 索引与高并发快照存储' }
    ]
  }
]

// Current Active Doc details
const activeDoc = computed(() => {
  for (const group of docSidebar) {
    const found = group.items.find(i => i.id === currentSlug.value)
    if (found) return { ...found, groupTitle: group.title }
  }
  return {
    id: 'overview',
    title: '产品概述与定位',
    desc: '平台设计理念、面向人群与制造业痛点',
    groupTitle: '产品概述与定位'
  }
})

// Search filter
const searchKeyword = ref('')
const filteredSidebar = computed(() => {
  if (!searchKeyword.value.trim()) return docSidebar
  const kw = searchKeyword.value.toLowerCase()
  return docSidebar.map(g => ({
    ...g,
    items: g.items.filter(i => i.title.toLowerCase().includes(kw) || i.desc.toLowerCase().includes(kw))
  })).filter(g => g.items.length > 0)
})

useSeoMeta({
  title: computed(() => `${activeDoc.value.title}｜睿易制造平台技术文档`),
  description: computed(() => activeDoc.value.desc)
})
</script>

<template>
  <div class="vp-docs-layout min-h-[calc(100vh-64px)]">
    <!-- Left Documentation Sidebar (VPSidebar) -->
    <aside class="vp-docs-sidebar">
      <!-- Search Input inside Sidebar -->
      <div class="p-3 border-b border-[var(--vp-c-divider)]">
        <div class="relative">
          <Search :size="13" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--vp-c-text-3)]" />
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜索技术文档..."
            class="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] text-[var(--vp-c-text-1)] placeholder-[var(--vp-c-text-3)] outline-none focus:border-[var(--vp-c-brand-1)] transition"
          />
        </div>
      </div>

      <!-- Navigation Tree Groups -->
      <div class="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
        <div v-for="group in filteredSidebar" :key="group.title" class="space-y-1.5">
          <div class="text-[11px] font-bold text-[var(--vp-c-text-3)] uppercase tracking-wider px-2.5">
            {{ group.title }}
          </div>
          <div class="space-y-0.5">
            <NuxtLink
              v-for="item in group.items"
              :key="item.id"
              :to="`/docs/${item.id}`"
              :class="[
                'flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition cursor-pointer',
                currentSlug === item.id
                  ? 'bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] font-bold'
                  : 'text-[var(--vp-c-text-2)] hover:text-[var(--vp-c-text-1)] hover:bg-[var(--vp-c-bg-soft)]'
              ]"
            >
              <span>{{ item.title }}</span>
              <ChevronRight v-if="currentSlug === item.id" :size="13" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </aside>

    <!-- Center Main Document Content (VPDoc) -->
    <main class="vp-docs-content">
      <div class="max-w-4xl mx-auto py-8 px-6 md:px-10">
        <!-- Breadcrumb -->
        <div class="flex items-center gap-1.5 text-xs text-[var(--vp-c-text-3)] mb-4">
          <NuxtLink to="/" class="hover:underline">首页</NuxtLink>
          <span>/</span>
          <span>{{ activeDoc.groupTitle }}</span>
          <span>/</span>
          <span class="text-[var(--vp-c-text-1)] font-semibold">{{ activeDoc.title }}</span>
        </div>

        <!-- Document Header -->
        <div class="pb-6 border-b border-[var(--vp-c-divider)] mb-8">
          <h1 class="text-3xl font-extrabold text-[var(--vp-c-text-1)] tracking-tight mb-2">
            {{ activeDoc.title }}
          </h1>
          <p class="text-sm text-[var(--vp-c-text-2)] leading-relaxed">
            {{ activeDoc.desc }}
          </p>
        </div>

        <!-- Document Body Sections Based on slug -->

        <!-- 1. Overview Document -->
        <div v-if="currentSlug === 'overview'" class="space-y-8 text-sm leading-relaxed text-[var(--vp-c-text-2)]">
          <div class="p-4 rounded-xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] text-xs">
            <strong>平台定位</strong>：睿易制造平台（Ruiyi MDP）是面向中小型制造企业（特别是机加工、装备制造、零部件加工）打造的「<strong>一体化、工艺驱动、现场防呆、全闭环</strong>」开源数字制造平台。
          </div>

          <section class="space-y-3">
            <h2 id="concept" class="text-xl font-bold text-[var(--vp-c-text-1)]">一、平台设计理念</h2>
            <p>
              传统工业软件往往由于历史原因割裂为孤立的 PLM、ERP、MES、WMS 系统，导致工厂内部出现严重的“手工倒藤”与数据孤岛。睿易制造平台从第一天起就以<strong>“一条数字主线（Digital Thread）”</strong>为核心架构，连接人、机、料、法、环五大要素。
            </p>
          </section>

          <section class="space-y-3">
            <h2 id="target-users" class="text-xl font-bold text-[var(--vp-c-text-1)]">二、面向人群与场景</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)]">
                <strong class="text-sm font-bold text-[var(--vp-c-text-1)] block mb-1">👨‍💻 软件开发爱好者与二开团队</strong>
                <p class="text-[var(--vp-c-text-3)]">希望深入学习真正的制造业领域模型、工艺快照隔离设计，以及基于 Spring Boot 4 + PG16 JSONB + Sa-Token 构建现代化工业级系统。</p>
              </div>
              <div class="p-4 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)]">
                <strong class="text-sm font-bold text-[var(--vp-c-text-1)] block mb-1">🏭 工厂内部 IT / 信息化工程师</strong>
                <p class="text-[var(--vp-c-text-3)]">需要为自家车间搭建一套可自主把控源码、支持纯私有化部署、现场操作极简防呆的实用制造执行与排产系统。</p>
              </div>
            </div>
          </section>

          <section class="space-y-3">
            <h2 id="core-features" class="text-xl font-bold text-[var(--vp-c-text-1)]">三、平台核心价值矩阵</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs border-collapse border border-[var(--vp-c-border)]">
                <thead class="bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-1)]">
                  <tr>
                    <th class="p-3 border-b border-[var(--vp-c-border)] w-28">价值维度</th>
                    <th class="p-3 border-b border-[var(--vp-c-border)]">制造平台架构实现与说明</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--vp-c-divider)]">
                  <tr>
                    <td class="p-3 font-bold text-[var(--vp-c-brand-1)]">一体化主线</td>
                    <td class="p-3">单一平台覆盖 PLM、MES、APS、QMS、WMS、Tool 刀具，一数一源消灭数据烟囱。</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-[var(--vp-c-brand-1)]">受控工艺驱动</td>
                    <td class="p-3">工单冻结 SHA-256 快照（JSONB 存储），彻底隔离工程变更对在制工单的干扰。</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-[var(--vp-c-brand-1)]">现场三码合一</td>
                    <td class="p-3">统一 MFG:// 工业码规范，0 盲打自动装载上下文，拒绝复杂后台表格。</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-[var(--vp-c-brand-1)]">计划中枢协同</td>
                    <td class="p-3">Planning Hub 数字计划白板，锁定计划基线（Baseline）并实时预警执行偏差。</td>
                  </tr>
                  <tr>
                    <td class="p-3 font-bold text-[var(--vp-c-brand-1)]">现代技术底座</td>
                    <td class="p-3">Spring Boot 4.0.6 + Java 17 + PostgreSQL 16 + Sa-Token，天然适配 AI 二开。</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <!-- 2. Snapshot Architecture Document -->
        <div v-else-if="currentSlug === 'snapshot-arch'" class="space-y-8 text-sm leading-relaxed text-[var(--vp-c-text-2)]">
          <div class="p-4 rounded-xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] text-xs">
            <strong>核心架构决策</strong>：工单下发时固化为带有 SHA-256 签名的 JSONB 工艺快照（<code>mes_wo_process_snapshot</code>），在制工单永远按快照执行，彻底隔离 PLM 图纸升版带来的车间混料风险。
          </div>

          <section class="space-y-3">
            <h2 id="snapshot-problem" class="text-xl font-bold text-[var(--vp-c-text-1)]">一、为什么必须做工艺快照隔离？</h2>
            <p>
              在离散机加工企业中，工程设计图纸经常发生变更（ECR/ECN）。如果车间在制工单直接读取最新的主工艺版本：
            </p>
            <div class="p-4 rounded-lg bg-[var(--vp-c-bg-soft)] border border-red-500/30 text-xs space-y-1.5">
              <div class="font-bold text-red-500">❌ 典型生产事故场景：</div>
              <div>• 批次 100 件零件，前 40 件按老图纸车削，中途技术部发布了 V2.0 图纸；</div>
              <div>• 后 60 件操作工若直接看到新工序与新尺寸，将导致前后批次尺寸不一，装配时全数报废；</div>
              <div>• 质检员按哪版图纸验收？出现质量争议时责任无法界定。</div>
            </div>
          </section>

          <section class="space-y-3">
            <h2 id="snapshot-model" class="text-xl font-bold text-[var(--vp-c-text-1)]">二、四层工艺拷贝模型</h2>
            <p>
              对齐西门子 Teamcenter 与 SAP PP 工业标准，睿易制造平台建立了五态四层的拷贝模型：
            </p>
            <div class="p-4 bg-[var(--vp-c-bg-soft)] rounded-xl border border-[var(--vp-c-border)] font-mono text-xs text-[var(--vp-c-brand-1)] space-y-1">
              <div>1. as-designed （设计态）: PLM 工程师编制草稿</div>
              <div>2. as-released （受控发布态）: Flowable 8 签审生效契约</div>
              <div>3. as-adopted  （工厂接收态）: 车间生产目录确认采用</div>
              <div>4. as-planned  （工单计划态）: 工单生成 SHA-256 快照 (mes_wo_process_snapshot)</div>
              <div>5. as-built    （生产事实态）: 现场扫码报工与检验实测数据</div>
            </div>
          </section>
        </div>

        <!-- 3. Default Generic Chapter -->
        <div v-else class="space-y-8 text-sm leading-relaxed text-[var(--vp-c-text-2)]">
          <div class="p-4 rounded-xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] text-xs">
            <strong>章节概要</strong>：{{ activeDoc.desc }}。本节内容基于 <code>ruiyi-boot4-pro</code> 真实后端代码与 V5.0 架构设计规范沉淀。
          </div>

          <section class="space-y-3">
            <h2 class="text-xl font-bold text-[var(--vp-c-text-1)]">一、设计意图与业务场景</h2>
            <p>
              针对中小型离散制造与机加工企业的实际作业模式，提供标准化、高内聚、低耦合的模块设计。在遵循整体数字主线的同时，保持各子域的独立演进能力。
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-xl font-bold text-[var(--vp-c-text-1)]">二、技术实现与规范</h2>
            <div class="p-4 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] font-mono text-xs space-y-2">
              <div class="text-[var(--vp-c-brand-1)] font-bold">// 模块核心类结构</div>
              <div>cn.code.ruiyi.module.{{ currentSlug }}.controller.admin.*</div>
              <div>cn.code.ruiyi.module.{{ currentSlug }}.service.*</div>
              <div>cn.code.ruiyi.module.{{ currentSlug }}.dal.dataobject.*</div>
            </div>
          </section>

          <section class="space-y-3">
            <h2 class="text-xl font-bold text-[var(--vp-c-text-1)]">三、二开扩展建议</h2>
            <p>
              若需在当前模块基础上进行二次开发，请继承统一的 <code>TenantBaseDO</code>，并通过 <code>@SaCheckPermission</code> 注解配置菜单权限，保持代码整洁。
            </p>
          </section>
        </div>

        <!-- Next / Prev Pagination -->
        <div class="mt-12 pt-6 border-t border-[var(--vp-c-divider)] flex justify-between items-center text-xs">
          <NuxtLink to="/docs/overview" class="vp-btn vp-btn-alt text-xs py-1.5 px-3">
            <span>← 返回文档首页</span>
          </NuxtLink>
          <NuxtLink to="/quick-start" class="vp-btn vp-btn-brand text-xs py-1.5 px-3">
            <span>前往快速开始 →</span>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.vp-docs-layout {
  display: flex;
  width: 100%;
}

.vp-docs-sidebar {
  width: 270px;
  flex-shrink: 0;
  border-right: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
}

@media (max-width: 860px) {
  .vp-docs-sidebar {
    display: none;
  }
}

.vp-docs-content {
  flex: 1;
  min-width: 0;
}
</style>
