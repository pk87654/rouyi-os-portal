<script setup lang="ts">
import { 
  Check, X, ShieldCheck, Sparkles, Code2, 
  HelpCircle, ArrowRight, Layers, FileCode 
} from 'lucide-vue-next'

useSeoMeta({
  title: '商业版与版本差异对比｜睿易制造平台 - 源码交付与私有化授权',
  description: '睿易制造平台提供社区开源版、离散制造专业版与数字化工厂旗舰版三种版本对比，100% 源码交付，一次买断永久授权。'
})

const versions = [
  {
    name: '社区开源版',
    tag: '基础学习',
    desc: '面向个人学习、技术体验与单机开发验证，保留基础 CRUD 与单工位报工。',
    price: '开源免费',
    priceSub: 'Apache-2.0 协议',
    btnText: '前往开源仓库',
    btnLink: '/hosting'
  },
  {
    name: '离散制造专业版',
    tag: '工厂标准落地',
    desc: '面向单工厂、中小型机加工与装备制造企业，跑通数字主线与扫码防呆全闭环。',
    price: '一次买断 · 永久授权',
    priceSub: '100% 前后端源码交付',
    highlight: true,
    btnText: '申请专业版方案',
    btnLink: '#contact'
  },
  {
    name: '数字化工厂旗舰版',
    tag: '集团多工厂协同',
    desc: '面向大型制造企业与集团多工厂，包含 Planning Hub、AI 制造助手与原厂深度架构支持。',
    price: '定制咨询 · 永久授权',
    priceSub: '含原厂架构师专属支持',
    btnText: '联系技术咨询',
    btnLink: '#contact'
  }
]

const comparisonCategories = [
  {
    title: '1. 底层框架与系统管理',
    rows: [
      { name: 'Spring Boot 4.0.6 + Java 17 + PostgreSQL 16', v1: true, v2: true, v3: true },
      { name: 'Sa-Token 细粒度权限与 RBAC 体系', v1: true, v2: true, v3: true },
      { name: 'SaaS 多租户强隔离（MyBatis-Plus 插件）', v1: '基础', v2: true, v3: true },
      { name: '多工厂 / 多组织协同架构', v1: false, v2: '单工厂', v3: '多工厂集团' },
      { name: 'FastExcel 高性能流式导入导出', v1: true, v2: true, v3: true }
    ]
  },
  {
    title: '2. PLM 工艺与图纸中心',
    rows: [
      { name: '标准物料主档与多级 BOM', v1: true, v2: true, v3: true },
      { name: '工单工艺快照隔离 (JSONB + SHA-256 签名)', v1: false, v2: true, v3: true },
      { name: '四层工艺就绪度 (Readiness) 管控', v1: false, v2: true, v3: true },
      { name: 'Flowable 8 工艺图纸多级电子签审', v1: '基础审批', v2: true, v3: true }
    ]
  },
  {
    title: '3. MES 现场执行与车间防呆',
    rows: [
      { name: '基础工单派发与工序列表', v1: true, v2: true, v3: true },
      { name: '统一 MFG:// 工业码规范 (员工/机床/施工卡)', v1: false, v2: true, v3: true },
      { name: '21.5寸 MES 工位触摸屏 (DPX) 大字号界面', v1: false, v2: true, v3: true },
      { name: '动态 E-SOP 电子指导书随工序下发', v1: false, v2: true, v3: true },
      { name: 'Tool 刀具 / 夹具 / 量具寿命预警与领用', v1: false, v2: true, v3: true }
    ]
  },
  {
    title: '4. APS 排产与 Planning Hub',
    rows: [
      { name: 'Planning Hub 数字计划白板', v1: false, v2: true, v3: true },
      { name: '计划基线 (Baseline) 与实际偏差预警', v1: false, v2: true, v3: true },
      { name: '有限产能甘特图与班次日历约束', v1: '基础甘特', v2: true, v3: true }
    ]
  },
  {
    title: '5. QMS 质量与追溯闭环',
    rows: [
      { name: 'IQC 来料检 / 首检 / 巡检 / FQC 完工检', v1: '基础检验', v2: true, v3: true },
      { name: 'MRB 不合格品处置与独立返工工单闭环', v1: false, v2: true, v3: true },
      { name: '全生命周期产品谱系追溯 (Genealogy)', v1: '基础追溯', v2: true, v3: true }
    ]
  }
]
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Page Head -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="section-kicker">Commercial & Licensing</span>
        <h1 class="section-title">版本差异对比与授权体系</h1>
        <p class="section-copy mx-auto">
          睿易制造平台提供社区开源版、离散制造专业版与数字化工厂旗舰版三种版本。全源码级交付，一次买断长期使用，无强制按年订阅负担。
        </p>
      </div>

      <!-- Version Cards 3 Column -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div
          v-for="ver in versions"
          :key="ver.name"
          :class="[
            'p-6 rounded-xl border flex flex-col justify-between relative transition-all duration-200',
            ver.highlight
              ? 'border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] shadow-md'
              : 'border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm'
          ]"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-bold text-[var(--vp-c-text-1)]">{{ ver.name }}</h3>
              <span class="tag">{{ ver.tag }}</span>
            </div>
            <p class="text-xs text-[var(--vp-c-text-2)] leading-relaxed mb-4">{{ ver.desc }}</p>

            <div class="py-3 border-y border-[var(--vp-c-divider)] mb-5">
              <div class="text-xl font-bold text-[var(--vp-c-text-1)]">{{ ver.price }}</div>
              <div class="text-xs text-[var(--vp-c-brand-1)] font-mono mt-0.5">{{ ver.priceSub }}</div>
            </div>
          </div>

          <NuxtLink
            :to="ver.btnLink"
            :class="[
              'vp-btn text-xs w-full',
              ver.highlight ? 'vp-btn-brand' : 'vp-btn-alt'
            ]"
          >
            <span>{{ ver.btnText }}</span>
            <ArrowRight :size="13" />
          </NuxtLink>
        </div>
      </div>

      <!-- Detailed Comparison Table -->
      <div class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
        <h2 class="text-xl font-bold text-[var(--vp-c-text-1)] mb-1">详细功能与模块对比矩阵</h2>
        <p class="text-xs text-[var(--vp-c-text-3)] mb-6">涵盖底层架构、PLM、MES、APS、QMS、WMS 全项对比。</p>

        <div class="space-y-6">
          <div v-for="cat in comparisonCategories" :key="cat.title">
            <h3 class="text-xs font-bold text-[var(--vp-c-brand-1)] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--vp-c-brand-1)]" />
              <span>{{ cat.title }}</span>
            </h3>

            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-[var(--vp-c-divider)] text-[var(--vp-c-text-3)]">
                    <th class="py-2.5 px-3 w-1/2">功能特性 / 模块能力</th>
                    <th class="py-2.5 px-3 text-center w-1/6">社区开源版</th>
                    <th class="py-2.5 px-3 text-center w-1/6 text-[var(--vp-c-brand-1)] font-bold">离散制造专业版</th>
                    <th class="py-2.5 px-3 text-center w-1/6 font-bold text-[var(--vp-c-text-1)]">数字化工厂旗舰版</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[var(--vp-c-divider)]">
                  <tr v-for="(row, idx) in cat.rows" :key="idx" class="hover:bg-[var(--vp-c-bg-soft)] transition">
                    <td class="py-2.5 px-3 text-[var(--vp-c-text-1)]">{{ row.name }}</td>
                    
                    <td class="py-2.5 px-3 text-center">
                      <Check v-if="row.v1 === true" :size="15" class="text-[#10b981] mx-auto" />
                      <X v-else-if="row.v1 === false" :size="15" class="text-[var(--vp-c-text-3)] mx-auto" />
                      <span v-else class="text-[var(--vp-c-text-3)] font-mono text-[11px]">{{ row.v1 }}</span>
                    </td>

                    <td class="py-2.5 px-3 text-center bg-[var(--vp-c-brand-soft)]">
                      <Check v-if="row.v2 === true" :size="15" class="text-[var(--vp-c-brand-1)] mx-auto" />
                      <X v-else-if="row.v2 === false" :size="15" class="text-[var(--vp-c-text-3)] mx-auto" />
                      <span v-else class="text-[var(--vp-c-brand-1)] font-semibold font-mono text-[11px]">{{ row.v2 }}</span>
                    </td>

                    <td class="py-2.5 px-3 text-center">
                      <Check v-if="row.v3 === true" :size="15" class="text-[#10b981] mx-auto" />
                      <X v-else-if="row.v3 === false" :size="15" class="text-[var(--vp-c-text-3)] mx-auto" />
                      <span v-else class="text-[var(--vp-c-text-1)] font-semibold font-mono text-[11px]">{{ row.v3 }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
