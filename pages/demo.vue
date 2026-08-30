<script setup lang="ts">
import { 
  Monitor, Tv, Smartphone, LayoutDashboard, 
  ArrowRight, ExternalLink, ShieldCheck, QrCode, Sparkles 
} from 'lucide-vue-next'

useSeoMeta({
  title: '在线体验｜睿易制造平台 - 3分钟亲手体验制造一体化全场景',
  description: '在线体验 PC 调度管理端、21.5寸 MES 工位触摸屏、仓储 PDA 扫码端与车间 4K 生产大屏。'
})

const demoTerminals = [
  {
    id: 'pc',
    title: 'PC 调度管理端',
    badge: 'PC 管理后台',
    framework: 'Vue 3 + Element Plus',
    desc: '面向生产厂长、PMC、工艺工程师与质量主管。体验多维排产甘特图、BOM 快照转换、SPC 控制图与生产大表。',
    features: ['工单有限排产', 'BOM 快照隔离', 'Flowable 8 审批', 'FastExcel 报表'],
    demoUrl: '/quick-start',
    account: '演示账号：admin / 123456',
    icon: Monitor
  },
  {
    id: 'kiosk',
    title: '21.5寸 MES 工位触摸屏 (DPX)',
    badge: '工位触控机',
    framework: '工业一体机适配 / 大字号防呆',
    desc: '部署于数控机床与装配流水线旁。体验大字号防油污界面、戴手套扫码开工、E-SOP 图纸联动与一键报工。',
    features: ['三码合一防呆', '动态 E-SOP 图纸', '工序极速报工', '刀具寿命预警'],
    demoUrl: '/quick-start',
    account: '工位码：CNC-04（免密扫码）',
    icon: Tv
  },
  {
    id: 'pda',
    title: '仓储 PDA 扫码终端',
    badge: '手持终端 / PDA',
    framework: 'UniApp + unibest + 远距扫码',
    desc: '面向库管员与线边物料员。体验货架动态库位绑定、工单齐套性预检发料、先进先出（FIFO）防混料扫码。',
    features: ['货架库位上架', '工单齐套预检', '先进先出防错', '线边仓退领料'],
    demoUrl: '/quick-start',
    account: '扫码枪/PDA 即开即用',
    icon: Smartphone
  },
  {
    id: 'dashboard',
    title: '车间 4K 生产数字大屏',
    badge: '车间看板',
    framework: 'GoView + ECharts 实时态势',
    desc: '部署于车间立柱与走廊大屏。实时滚动各产线节拍、机台 OEE、工单交付倒计时与现场 Andon 安灯异常。',
    features: ['综合设备 OEE', '工单完工节拍', 'Andon 安灯呼叫', '产线质量看板'],
    demoUrl: '/quick-start',
    account: '4K/8K 自动全屏轮播',
    icon: LayoutDashboard
  }
]
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Hero Banner -->
      <div class="p-8 md:p-10 rounded-2xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm mb-12">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8">
            <span class="tag mb-3">
              3 分钟，亲手体验制造一体化数字化平台
            </span>
            <h1 class="text-3xl md:text-4xl font-extrabold text-[var(--vp-c-text-1)] mb-3 tracking-tight">
              一个事实源，多终端全面呈现
            </h1>
            <p class="text-sm text-[var(--vp-c-text-2)] max-w-2xl leading-relaxed mb-6">
              从 PC 管理后台到 21.5寸车间工位触摸屏、仓储 PDA 与生产大屏，一套账号与业务接口贯通全端。无需搭建环境，直接在线上手实操。
            </p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink to="/quick-start" class="vp-btn vp-btn-brand text-xs">
                <span>快速启动本地环境</span>
                <ArrowRight :size="14" />
              </NuxtLink>
              <NuxtLink to="/hosting" class="vp-btn vp-btn-alt text-xs">
                <span>获取全套源码</span>
              </NuxtLink>
            </div>
          </div>

          <div class="lg:col-span-4 bg-[var(--vp-c-bg-soft)] p-5 rounded-xl border border-[var(--vp-c-border)] text-center">
            <div class="flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--vp-c-brand-1)] mb-3">
              <QrCode :size="15" />
              <span>手机端 / 移动审批体验</span>
            </div>
            <div class="w-28 h-28 mx-auto bg-[var(--vp-c-bg-elv)] border border-dashed border-[var(--vp-c-border)] rounded-lg flex flex-col items-center justify-center text-center mb-2.5">
              <div class="font-bold text-[11px] text-[var(--vp-c-text-1)]">睿易制造移动端</div>
              <div class="text-[8px] text-[var(--vp-c-text-3)] mt-0.5">扫码开启体验</div>
            </div>
            <div class="text-[11px] text-[var(--vp-c-text-3)]">微信 / 手机浏览器扫码打开 H5</div>
          </div>
        </div>
      </div>

      <!-- Terminals Grid -->
      <div class="text-center max-w-xl mx-auto mb-10">
        <span class="section-kicker">Multi-Terminal Experience</span>
        <h2 class="section-title">4 大工业场景终端在线实操</h2>
        <p class="section-copy mx-auto">根据工厂车间不同物理环境与岗位角色，体验最贴合实际作业的交互终端。</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="item in demoTerminals"
          :key="item.id"
          class="p-6 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="w-10 h-10 rounded-lg bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] flex items-center justify-center">
                <component :is="item.icon" :size="20" />
              </div>
              <span class="tag">{{ item.badge }}</span>
            </div>

            <h3 class="text-base font-bold text-[var(--vp-c-text-1)] mb-1">{{ item.title }}</h3>
            <div class="text-xs text-[var(--vp-c-brand-1)] font-mono mb-3">{{ item.framework }}</div>
            <p class="text-xs text-[var(--vp-c-text-2)] leading-relaxed mb-4">{{ item.desc }}</p>

            <div class="grid grid-cols-2 gap-1.5 mb-5">
              <div v-for="feat in item.features" :key="feat" class="flex items-center gap-1.5 text-xs text-[var(--vp-c-text-2)]">
                <div class="w-1.5 h-1.5 rounded-full bg-[var(--vp-c-brand-1)]" />
                <span>{{ feat }}</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-[var(--vp-c-divider)] flex items-center justify-between gap-4">
            <div class="text-[11px] text-[var(--vp-c-text-3)] font-mono">{{ item.account }}</div>
            <NuxtLink
              :to="item.demoUrl"
              class="vp-btn vp-btn-alt text-xs py-1.5 px-3"
            >
              <span>查看指南</span>
              <ExternalLink :size="12" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
