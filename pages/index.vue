<script setup lang="ts">
import { 
  GitMerge, ShieldCheck, QrCode, CalendarClock, Cpu, 
  Layers, Workflow, Terminal, Database, Code2, 
  FileSpreadsheet, FileText, CheckCircle2, ArrowRight, Monitor, Smartphone, Tv 
} from 'lucide-vue-next'

useSeoMeta({
  title: '睿易制造平台 文档 - Spring Boot 4 + PG16 的开源离散制造平台',
  description: '睿易制造平台（Ruiyi MDP）是面向中小微制造企业、多工厂打造的开源工业级数字化制造平台。基于 Spring Boot 4 + PostgreSQL 16 + Vue 3 + UniApp。'
})

const moduleTags = [
  'PLM 工艺包', 'MES 制造执行', 'APS 排产中枢', 'QMS 质量追溯', 
  'WMS 智能仓储', 'Tool 刀具管理', 'ERP 进销存', 'E-SOP 电子图纸', 
  'Planning Hub 计划中枢', 'Flowable 8 流程中心', 'ScanService 扫码引擎', 
  '4K 生产大屏', '移动端 PDA', '系统管理', '更多持续扩展…'
]

const capabilities = [
  {
    icon: Terminal,
    theme: 'icon-sky',
    title: '主流技术栈',
    desc: '后端 Spring Boot 4.0.6 + PostgreSQL 16 + Sa-Token，PC 端 Vue 3 + Vite 5 + Element Plus，移动端 UniApp + unibest，TypeScript 全量覆盖。'
  },
  {
    icon: Code2,
    theme: 'icon-indigo',
    title: '代码生成器',
    desc: '单表、树表、主子表可视化配置，一键生成前后端 CRUD、菜单与权限代码，二开从「造轮子」变「填空题」。'
  },
  {
    icon: FileText,
    theme: 'icon-rose',
    title: '表单设计器',
    desc: '基于 form-create 拖拽式动态表单，可视化编排字段、校验与联动，配合流程实现零代码搭建业务单据。'
  },
  {
    icon: Workflow,
    theme: 'icon-teal',
    title: '流程设计器',
    desc: '基于 bpmn-js 可视化建模 BPMN 2.0 流程，配合 Flowable 8 引擎，支持工艺多级签审、变更审批与加签委派。'
  },
  {
    icon: Layers,
    theme: 'icon-amber',
    title: '在线图纸与文档',
    desc: '集成 OnlyOffice，在线查看和预览工程图纸、工艺规程 Word / Excel / PDF，支持多人协同与版本留痕。'
  },
  {
    icon: QrCode,
    theme: 'icon-violet',
    title: 'ScanService 扫码引擎',
    desc: '毫秒级解析统一工业码（MFG:// 员工+设备+施工卡），0 盲打自动装载生产上下文，防呆防错拦截。'
  },
  {
    icon: FileSpreadsheet,
    theme: 'icon-emerald',
    title: 'FastExcel 高性能导出',
    desc: '全面升级 FastExcel 替代传统 POI，百万级工单生产大表、物料齐套性与流水账秒级流式导出，零 OOM 风险。'
  },
  {
    icon: Database,
    theme: 'icon-blue',
    title: '多租户与数据安全',
    desc: 'MyBatis-Plus 租户插件强隔离、Sa-Token 细粒度权限、操作日志与纯私有化部署，数据自主可控。'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section (VPHero matching ruoyioffice) -->
    <section class="vp-hero">
      <div class="vp-container vp-hero-container">
        <!-- Left Hero Text -->
        <div>
          <!-- New Product Announcement Pill -->
          <NuxtLink
            to="/docs/product/mouldlink"
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs text-purple-600 dark:text-purple-400 font-medium mb-6 hover:bg-purple-500/15 transition cursor-pointer"
          >
            <span class="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span>新品预告：面向模具制造与外协协同的「睿易模界 · MouldLink」总体设计已发布</span>
            <span class="font-bold underline ml-0.5">抢先看架构 →</span>
          </NuxtLink>

          <h1 class="vp-hero-heading">
            <span class="vp-hero-name">睿易 MDP</span>
            <span class="vp-hero-text">离散制造数字化平台</span>
          </h1>
          <p class="vp-hero-tagline">
            Spring Boot 4 + PostgreSQL 16 + Vue 3 + UniApp / unibest 的开源工业级多端平台
          </p>
          <div class="vp-hero-actions">
            <NuxtLink to="/quick-start" class="vp-btn vp-btn-brand">
              <span>快速开始</span>
            </NuxtLink>
            <NuxtLink to="/architecture" class="vp-btn vp-btn-alt">
              <span>架构总纲</span>
            </NuxtLink>
            <NuxtLink to="/demo" class="vp-btn vp-btn-alt">
              <span>在线体验</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Right Hero Dashboard Mockup -->
        <div class="rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-xl overflow-hidden">
          <div class="p-3 border-b border-[var(--vp-c-border)] bg-[var(--vp-c-bg-soft)] flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-400" />
              <span class="w-3 h-3 rounded-full bg-yellow-400" />
              <span class="w-3 h-3 rounded-full bg-green-400" />
              <span class="font-bold ml-1 text-[var(--vp-c-text-1)]">生产指挥中心 · 调度大屏</span>
            </div>
            <span class="text-[var(--vp-c-text-3)] font-mono">MDP v5.0</span>
          </div>

          <div class="p-5 space-y-4">
            <!-- Metrics Row -->
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="p-3 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)]">
                <div class="text-[11px] text-[var(--vp-c-text-3)]">今日工单</div>
                <div class="text-xl font-bold text-[var(--vp-c-text-1)] mt-0.5">128</div>
              </div>
              <div class="p-3 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)]">
                <div class="text-[11px] text-[var(--vp-c-text-3)]">完工报工</div>
                <div class="text-xl font-bold text-[var(--vp-c-brand-1)] mt-0.5">86</div>
              </div>
              <div class="p-3 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)]">
                <div class="text-[11px] text-[var(--vp-c-text-3)]">机台负荷</div>
                <div class="text-xl font-bold text-lime mt-0.5">91.4%</div>
              </div>
            </div>

            <!-- Gantt Simulation -->
            <div class="p-3.5 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] space-y-2">
              <div class="flex justify-between text-xs font-bold text-[var(--vp-c-text-1)]">
                <span>CNC-01 · 壳体粗铣</span>
                <span class="text-[var(--vp-c-brand-1)]">进行中 (78%)</span>
              </div>
              <div class="w-full h-2 rounded-full bg-[var(--vp-c-bg-mute)] overflow-hidden">
                <div class="w-[78%] h-full bg-[var(--vp-c-brand-1)] rounded-full" />
              </div>
              <div class="flex justify-between text-[10px] text-[var(--vp-c-text-3)]">
                <span>工单：MO-20260830-018</span>
                <span>快照：SHA-256 (已锁定)</span>
              </div>
            </div>

            <!-- Toast alert -->
            <div class="p-2.5 rounded-lg bg-[var(--vp-c-brand-soft)] border border-[var(--vp-c-brand-1)] text-xs text-[var(--vp-c-brand-1)] flex items-center justify-between">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[var(--vp-c-brand-1)] animate-ping" />
                <span>扫码成功：已自动装载工位生产上下文</span>
              </span>
              <span class="font-mono text-[10px]">0.08s</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Five Dimensions Section (feature-rows matching ruoyioffice) -->
    <section class="vp-home-section">
      <div class="vp-container">
        <hr class="vp-divider">

        <h2 class="vp-section-title">
          从五个角度，读懂 <span class="vp-accent-text">睿易 MDP</span>
        </h2>
        <p class="vp-section-subtitle">
          同一个底座、同一份源码，覆盖制造全业务与全部物理终端，一次购买长期使用，并天然适配 AI 二次开发——五个角度各有侧重，共同构成制造数字化的坚实基座。
        </p>

        <div class="vp-feature-rows">
          <!-- Row 1: Digital Thread -->
          <div class="vp-feature-row">
            <div class="vp-feature-side">
              <div class="vp-lead-icon icon-blue">
                <GitMerge :size="24" />
              </div>
              <div class="vp-feature-head">
                <strong>一条主线，穿透制造始终</strong>
                <span class="vp-feature-tagline">19 个业务模块开箱即用</span>
              </div>
            </div>
            <div class="vp-feature-body">
              <p>从需求预测、BOM 与工艺包，到排产排程、现场报工、质量放行与智能仓储，所有业务数据天然打通，彻底消灭跨部门数据烟囱。</p>
              <div class="vp-module-tags">
                <span
                  v-for="tag in moduleTags"
                  :key="tag"
                  :class="['vp-module-tag', tag.includes('更多') ? 'more' : '']"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Row 2: Multi-Terminal -->
          <div class="vp-feature-row">
            <div class="vp-feature-side">
              <div class="vp-lead-icon icon-violet">
                <Monitor :size="24" />
              </div>
              <div class="vp-feature-head">
                <strong>一个底座，多端通达</strong>
                <span class="vp-feature-tagline">支持多套工业终端</span>
              </div>
            </div>
            <div class="vp-feature-body">
              <p>同一套账号、权限与业务接口贯通全端。无论是办公室排产、车间机台工位、库房 PDA 还是手机审批，在任意终端都能获得流畅体验。</p>
              <div class="vp-detail-grid">
                <div class="vp-detail-card">
                  <strong>PC 调度管理端</strong>
                  <span>Vue 3 + Element Plus，适合工艺路线、甘特图排产与质量 SPC 分析</span>
                </div>
                <div class="vp-detail-card">
                  <strong>21.5寸 MES 工位屏</strong>
                  <span>DPX 大字号防油污界面，支持戴手套触控、E-SOP 图纸联动与一键报工</span>
                </div>
                <div class="vp-detail-card">
                  <strong>仓储 PDA 终端</strong>
                  <span>UniApp + unibest，货架库位扫码、齐套发料与先进先出防混料</span>
                </div>
                <div class="vp-detail-card">
                  <strong>车间 4K 生产大屏</strong>
                  <span>实时呈现产线节拍、机台 OEE、工单倒计时与 Andon 安灯异常</span>
                </div>
                <div class="vp-detail-card">
                  <strong>移动端 App / H5</strong>
                  <span>扫码报工、移动审批、首检确认随时随地办理</span>
                </div>
                <div class="vp-detail-card">
                  <strong>OnlyOffice 在线图纸</strong>
                  <span>在线预览与编辑 CAD/PDF/Word 工艺文档，无需本地安装大型软件</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 3: Snapshot & Deployment -->
          <div class="vp-feature-row">
            <div class="vp-feature-side">
              <div class="vp-lead-icon icon-amber">
                <ShieldCheck :size="24" />
              </div>
              <div class="vp-feature-head">
                <strong>受控工艺，快照隔离</strong>
                <span class="vp-feature-tagline">在制工单免疫设计变更</span>
              </div>
            </div>
            <div class="vp-feature-body">
              <p>工单下发时自动抓取完整工艺树并固化为带有 SHA-256 签名的 JSONB 工艺快照，坚持权责三分，彻底解决车间新老图纸混料批量报废痛点。</p>
              <div class="vp-vs-grid">
                <div class="vp-detail-card">
                  <strong>PLM 设计工艺定义</strong>
                  <span>负责标准物料、工艺路线、工步与图纸设计，支持多版本受控签审。</span>
                </div>
                <span class="vp-vs-badge">VS</span>
                <div class="vp-detail-card">
                  <strong>MES 现场快照执行</strong>
                  <span>工单锁定独立快照（JSONB），车间现场只认快照 Resolver，返工独立建单。</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 4: Shopfloor Execution -->
          <div class="vp-feature-row">
            <div class="vp-feature-side">
              <div class="vp-lead-icon icon-emerald">
                <QrCode :size="24" />
              </div>
              <div class="vp-feature-head">
                <strong>现场三码合一，极简防呆</strong>
                <span class="vp-feature-tagline">统一 MFG:// 工业码规范</span>
              </div>
            </div>
            <div class="vp-feature-body">
              <p>车间现场拒绝复杂后台表格。操作工扫员工、扫设备、扫施工卡，系统毫秒级装载上下文并弹出对应工序 E-SOP 图纸，0 盲打快速开报工。</p>
              <div class="vp-detail-grid">
                <div class="vp-detail-card">
                  <strong>三码合一防呆</strong>
                  <span>MFG:// 规范扫码识别，1 分钟让一线员工熟练上手</span>
                </div>
                <div class="vp-detail-card">
                  <strong>前序防错拦截</strong>
                  <span>前序未质检、未完工自动拦截，避免漏工序批量报废</span>
                </div>
                <div class="vp-detail-card">
                  <strong>动态 E-SOP 指导</strong>
                  <span>工步图纸随当前工序动态下发，杜绝看错图纸</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 5: AI Coding & Extension -->
          <div class="vp-feature-row">
            <div class="vp-feature-side">
              <div class="vp-lead-icon icon-rose">
                <Cpu :size="24" />
              </div>
              <div class="vp-feature-head">
                <strong>AI Coding，快速二开</strong>
                <span class="vp-feature-tagline">天然适配 AI 辅助编程</span>
              </div>
            </div>
            <div class="vp-feature-body">
              <p>规范清晰的 Spring Boot 4 + PG16 JSONB 分层架构，配合项目自带的 CLAUDE.md 与 AGENTS.md 规范，让团队无论人工还是借助 AI 都能倍增二开效率。</p>
              <div class="vp-detail-grid">
                <div class="vp-detail-card">
                  <strong>规范分层架构</strong>
                  <span>controller / service / dal / api 清晰分层，AI 更易理解上下文</span>
                </div>
                <div class="vp-detail-card">
                  <strong>AI 提示词与 Skills</strong>
                  <span>提供专用的 Antigravity / Cursor / Claude 二开技能包，极速生成业务三层代码</span>
                </div>
                <div class="vp-detail-card">
                  <strong>完整二开文档</strong>
                  <span>详尽的 Sa-Token、Flowable 8 与 FastExcel 开发手册与排障指南</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Capability Section (capability-grid matching ruoyioffice) -->
    <section class="vp-home-section">
      <div class="vp-container">
        <hr class="vp-divider">

        <h2 class="vp-section-title">技术底座与二次开发能力</h2>
        <p class="vp-section-subtitle">
          主流技术栈 + 代码生成、表单/流程设计器、扫码解析引擎、FastExcel 等开箱即用的开发提效工具，让二开又快又稳。
        </p>

        <div class="vp-capability-grid">
          <div
            v-for="cap in capabilities"
            :key="cap.title"
            class="vp-capability-card"
          >
            <div :class="['vp-capability-icon', cap.theme]">
              <component :is="cap.icon" :size="20" />
            </div>
            <strong>{{ cap.title }}</strong>
            <span>{{ cap.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Matrix Section: Ruiyi MDP & MouldLink -->
    <section class="vp-home-section">
      <div class="vp-container">
        <hr class="vp-divider">

        <h2 class="vp-section-title">睿易工业产品矩阵</h2>
        <p class="vp-section-subtitle">
          聚焦制造业垂直场景，从通用离散机加工到单件小批量模具制造协同
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Card 1: Ruiyi MDP -->
          <div class="p-8 rounded-2xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="tag">当前开源旗舰</span>
                <span class="text-xs font-mono text-[var(--vp-c-brand-1)] font-bold">Ruiyi MDP v5.0</span>
              </div>
              <h3 class="text-2xl font-extrabold text-[var(--vp-c-text-1)] mb-1">睿易制造平台</h3>
              <p class="text-xs text-[var(--vp-c-brand-1)] font-mono mb-4">Discrete Manufacturing Platform</p>
              <p class="text-sm text-[var(--vp-c-text-2)] leading-relaxed mb-6">
                面向通用离散制造、机加车间与零部件加工。主打「一条数字主线、工单工艺快照隔离、现场三码合一防呆、Planning Hub 计划中枢与多端协同」。
              </p>
            </div>
            <div class="pt-4 border-t border-[var(--vp-c-border)] flex items-center justify-between">
              <span class="text-xs text-[var(--vp-c-text-3)]">19 个业务模块开箱即用</span>
              <NuxtLink to="/docs/product/overview" class="vp-btn vp-btn-brand text-xs py-1.5 px-3">
                <span>查阅技术文档</span>
                <ArrowRight :size="13" />
              </NuxtLink>
            </div>
          </div>

          <!-- Card 2: MouldLink -->
          <div class="p-8 rounded-2xl border-2 border-purple-500/30 bg-gradient-to-b from-purple-500/5 to-transparent flex flex-col justify-between hover:border-purple-500/60 transition shadow-sm">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="tag bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 font-bold">
                  ✨ 2026 重点新项目 · 预热上线
                </span>
                <span class="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">MouldLink v0.1</span>
              </div>
              <h3 class="text-2xl font-extrabold text-[var(--vp-c-text-1)] mb-1">睿易模界 · 模具制造协同平台</h3>
              <p class="text-xs text-purple-600 dark:text-purple-400 font-mono mb-4">MouldLink · Mould Manufacturing Collaboration Platform</p>
              <p class="text-sm text-[var(--vp-c-text-2)] leading-relaxed mb-5">
                针对模具制造「单件小批量、高定制、工序多变、外协黑盒」行业痛点打造。以 <strong>Mould Project（模具项目）</strong> 为第一业务对象，从 UG/NX 拆单、电极加工、厂内外协联动到试模整改一链到底。
              </p>

              <!-- 4 Core Differentiators Preview -->
              <div class="grid grid-cols-2 gap-2 mb-6 text-xs text-[var(--vp-c-text-2)]">
                <div class="p-2.5 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>项目→零件→工序穿透</span>
                </div>
                <div class="p-2.5 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Supplier MES 微信外协</span>
                </div>
                <div class="p-2.5 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>电极/模仁参数扫码防呆</span>
                </div>
                <div class="p-2.5 rounded-lg bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>T0~T2 试模修模全闭环</span>
                </div>
              </div>
            </div>

            <div class="pt-4 border-t border-[var(--vp-c-border)] flex flex-wrap items-center justify-between gap-3">
              <span class="text-xs text-[var(--vp-c-text-3)] font-medium">首版 V0.1 架构设计已完成</span>
              <NuxtLink to="/docs/product/mouldlink" class="vp-btn text-xs py-1.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition flex items-center gap-1">
                <span>抢先查阅 V0.1 设计总纲</span>
                <ArrowRight :size="13" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact & Community Panel (contact-panel matching ruoyioffice) -->
    <section class="vp-home-section">
      <div class="vp-container">
        <hr class="vp-divider">

        <h2 class="vp-section-title">联系我们 / 开源社区</h2>
        <p class="vp-section-subtitle">获取演示环境、技术交流、二开方案与架构支持</p>

        <div class="vp-contact-panel">
          <div class="vp-contact-main">
            <h3>源码可控、多端协同、支持 AI Coding 二开</h3>
            <p>
              适合希望深入学习离散制造数字化架构、为自家工厂搭建私有化系统，或需要二次开发的开发者与工厂 IT 团队。
            </p>
            <div class="vp-contact-tags">
              <span class="vp-contact-tag">100% 源码交付</span>
              <span class="vp-contact-tag">多端统一体验</span>
              <span class="vp-contact-tag">支持纯私有化部署</span>
            </div>
            <div class="vp-contact-actions">
              <NuxtLink to="/demo" class="vp-btn vp-btn-brand">在线体验</NuxtLink>
              <NuxtLink to="/quick-start" class="vp-btn vp-btn-alt">快速开始</NuxtLink>
            </div>
            <p class="vp-contact-meta">微信：ruiyi-manufacturing，添加时备注「工厂IT」或「开源二开」</p>
          </div>

          <div class="vp-contact-qr-group">
            <div class="vp-qr-item">
              <div class="vp-qr-box overflow-hidden p-1 bg-white">
                <img
                  src="/images/wechat-qr.png"
                  alt="微信扫码咨询"
                  class="w-full h-full object-contain rounded"
                />
              </div>
              <strong>微信咨询</strong>
              <span>添加技术微信获取支持</span>
            </div>
            <div class="vp-qr-item">
              <div class="vp-qr-box overflow-hidden p-1 bg-white">
                <img
                  src="/images/wechat-qr.png"
                  alt="微信交流群"
                  class="w-full h-full object-contain rounded"
                />
              </div>
              <strong>微信交流群</strong>
              <span>扫码入群与同行交流</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
