<script setup lang="ts">
import { ref } from 'vue'
import { 
  HelpCircle, ChevronDown, ChevronUp, BookOpen, 
  Layers, Wrench, Calendar, ShieldCheck, Package, Cpu, Terminal 
} from 'lucide-vue-next'

useSeoMeta({
  title: '客户与二开知识库｜睿易制造平台 - 制造业实战问答与方案库',
  description: '收录离散制造、机加工、PLM工艺包、MES现场扫码、APS排产与技术二开的高频问答与最佳实践。'
})

const categories = [
  { id: 'plm', name: 'PLM 工艺与图纸', icon: Layers },
  { id: 'mes', name: 'MES 现场与扫码', icon: Wrench },
  { id: 'aps', name: 'APS 与 Planning Hub', icon: Calendar },
  { id: 'qms', name: 'QMS 质量与追溯', icon: ShieldCheck },
  { id: 'wms', name: 'WMS 智能仓储', icon: Package },
  { id: 'hardware', name: '硬件终端部署', icon: Terminal },
  { id: 'tech', name: '架构与二开规范', icon: Cpu },
]

const activeCategory = ref('plm')

const faqs = {
  plm: [
    {
      q: '为什么工单创建时要生成“工艺快照（Process Snapshot）”？',
      a: '在真实离散制造中，产品工程设计经常会发生图纸和 BOM 的变更（ECR/ECN）。如果车间在制工单直接读取最新的主工艺版本，会导致前几件按老图纸加工、后几件按新图纸加工，造成重大质量混料与批量报废。\n\n睿易制造平台在工单下发时，会自动抓取当时发布的完整工艺路线、工步、图纸和参数，固化为带有 SHA-256 防篡改签名的 JSONB 工艺快照。现场执行严格按照快照进行，彻底隔离外部设计变更。'
    },
    {
      q: '工艺就绪度（Readiness）的“四层模型”是如何运转的？',
      a: '四层模型由浅入深分为：\n1. ESTIMATION_READY（报价初算）：仅包含粗略路线与预估工时，用于 CRM 销售报价；\n2. PLANNING_READY（计划排程）：锁定关键瓶颈工序与长周期物料，供 APS 排产锁定交期；\n3. OPERATION_READY（工位执行）：完善机台参数、刀具夹具与 E-SOP 图纸步骤，可下发生产；\n4. FULL_PACKAGE_READY（完整发布）：包含完备检验计划与归档文档，通过 Flowable 8 正式受控签审。'
    },
    {
      q: '在制工单如何安全切换新版本工艺？',
      a: '依据 V5.0 架构决策，在制工单切换新工艺遵循受控流程：当新工艺发布并经车间确认后，MES 识别受影响的在制工单，提供四种策略：NO_ACTION（不动作）、CONTINUE_OLD（继续旧快照）、SWITCH_NEW（未执行工序切至新快照）、HOLD（暂停交由技术部裁决）。选择切换时会生成新的 Snapshot 副本，已完成工序永远锁定旧快照，未完成工序按新快照执行。'
    }
  ],
  mes: [
    {
      q: '车间现场为什么要坚持“三码合一”，而不是操作后台表格？',
      a: '一线机加操作工通常戴着油污手套，且计算机熟练度有限。如果让操作工在成百上千张工单表格中搜索、点击、选择，不仅耗时而且极易误选工序。\n\n睿易提出“三码合一”极简防呆流：扫员工码（确定谁干）+ 扫设备码（确定在哪干）+ 扫施工卡（确定干什么），系统毫秒级自动装载 Production Context 生产上下文并弹出对应工序的 E-SOP 图纸，0 盲打，极速开工。'
    },
    {
      q: '统一工业码规范（MFG://）是如何定义的？',
      a: '睿易统一采用带协议头的编码规范：\n• 施工卡：MFG://TC/{施工卡号}/{32位防伪令牌}\n• 员工工牌：MFG://EMP/{登录账号}\n• 机床设备：MFG://MC/{设备编码}\n• 条形码兜底：MFG-TC-{施工卡号} / MFG-MC-{设备编码}\n扫码解析引擎（ScanService）只负责解析识别与校验，不直接操作业务库，开工报工统一走底层 MES 状态机。'
    },
    {
      q: '发生不良品返工时，是原工单继续修改还是建新单？',
      a: 'V5.0 架构严格定案：“返工是一张独立的新工单（task_type=REWORK），而不是原工单的未来版本，更不能把主工艺升一版”。返工工单拥有独立的返工工艺包和批次追踪，避免污染主计划的工时统计与成本核算。'
    }
  ],
  aps: [
    {
      q: 'Planning Hub 数字计划白板与传统甘特图有什么区别？',
      a: '传统甘特图往往只是 PMC 单方面的排产工具，缺乏跨部门约束与承诺。Planning Hub 保留了制造企业熟悉的白板会议协作模式，支持销售、工程、采购、生产四方多角色在线排程。\n\n更关键的是引入了“计划基线（Baseline）”概念——锁定各部门承诺的时间节点，后续实际进度若发生偏差，系统会自动高亮预警并追溯责任环节。'
    },
    {
      q: '有限产能排产如何考虑设备与班次日历？',
      a: 'APS 排产算法会将每台机床的可用日历（含日常班次、法定节假日、计划保养停机）以及人员技能资质作为硬性约束条件。在计算工单计划开始与结束时间时，精确扣除停机时间，避免将任务排入机床非工作时段。'
    }
  ],
  qms: [
    {
      q: '首件检验（First Piece Inspection）未通过时如何拦截？',
      a: '当工单被标记为“需要首检”时，工位开工后产出的前 N 件必须由质检员（IPQC）在平板或 PC 上进行首件确认。若质检结果为不合格（QC_FAILED），工单状态机立即锁定为 BLOCKED，机台工位界面将禁止批量报工，直到质量部门完成异常处置或技术复检。'
    },
    {
      q: '产品谱系（Genealogy）包含哪些维度的追溯数据？',
      a: '每个产品序列号（SN）可一键拉出完整的树状追溯链：包含源头销售订单号、批次号、工单号、冻结的工艺快照版本、各工序操作人员、加工机床编号、所用刀具/工装夹具编号、各道检验实测数据（含质检照片留证）以及发货物流信息。'
    }
  ],
  wms: [
    {
      q: '什么是工单“齐套性预检发料”？',
      a: '在工单下当下发车间前，WMS 会自动计算该工单在当前工序所需的全部原材料、标准件与毛坯件的库存齐套率。若存在缺料，系统会自动发出缺料预警并生成缺料明细表，阻止未齐套工单盲目上线占压车间机台。'
    }
  ],
  hardware: [
    {
      q: '车间 21.5 寸工位触摸屏有哪些针对性优化？',
      a: '工位屏界面（DPX）针对机加工车间油污大、光线反射强、操作工戴线手套的物理环境做了专门适配：所有按钮热区均大于 64px，采用高对比度排版，支持外接 USB/无线工业扫码枪，支持开工后全屏锁定避免误触其他后台页面。'
    }
  ],
  tech: [
    {
      q: '为什么后端采用 Spring Boot 4 + PostgreSQL 16 而不是 MySQL？',
      a: '离散制造业的工艺路线、工步参数、检验标准、BOM 结构具有高度树状和半结构化特征。PostgreSQL 16 提供了原生的 JSONB 存储与 GIN 索引能力，既保证了工艺快照与复杂属性的高速读写，又具备严苛的事务完整性（ACID）。同时配合 Spring Boot 4.0.6 与 Sa-Token，构建了现代化、轻量化的高性能架构。'
    }
  ]
}

const openMap = ref<Record<string, boolean>>({
  'plm-0': true,
  'mes-0': true
})

const toggleOpen = (key: string) => {
  openMap.value[key] = !openMap.value[key]
}
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Page Head -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="section-kicker">Knowledge Base</span>
        <h1 class="section-title">制造业客户与二开知识库</h1>
        <p class="section-copy mx-auto">
          收录制造企业、工艺师、车间主管与二开伙伴在实际使用与配置过程中反复出现的核心业务与架构问题。
        </p>
      </div>

      <!-- Note banner -->
      <div class="p-4 rounded-xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] mb-8 flex items-start gap-3.5">
        <BookOpen :size="18" class="text-[var(--vp-c-brand-1)] flex-shrink-0 mt-0.5" />
        <div class="text-xs text-[var(--vp-c-text-2)] leading-relaxed">
          <strong class="text-[var(--vp-c-text-1)]">知识库定位说明</strong>：本知识库聚焦于<strong>“怎么用、怎么配、怎么理解工业制造业务逻辑（如工艺快照、三码合一、Planning Hub 基线、Flowable 8 签审）”</strong>。如果遇到具体代码调试与部署环境报错，请查阅开发指南与排障手册。
        </div>
      </div>

      <!-- Category Nav Pills -->
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          type="button"
          :class="[
            'inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer',
            activeCategory === cat.id
              ? 'bg-[var(--vp-c-brand-1)] text-white border-[var(--vp-c-brand-1)] shadow-md'
              : 'bg-[var(--vp-c-bg-soft)] text-[var(--vp-c-text-2)] border-[var(--vp-c-border)] hover:border-[var(--vp-c-brand-1)] hover:text-[var(--vp-c-text-1)]'
          ]"
        >
          <component :is="cat.icon" :size="14" />
          <span>{{ cat.name }}</span>
        </button>
      </div>

      <!-- Active FAQ Accordion List -->
      <div class="max-w-4xl mx-auto space-y-3.5">
        <div
          v-for="(item, idx) in faqs[activeCategory as keyof typeof faqs]"
          :key="idx"
          class="rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] overflow-hidden shadow-sm transition-all"
        >
          <button
            @click="toggleOpen(`${activeCategory}-${idx}`)"
            type="button"
            class="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 hover:bg-[var(--vp-c-bg-soft)] transition cursor-pointer"
          >
            <span class="text-sm font-bold text-[var(--vp-c-text-1)] flex items-center gap-2.5">
              <HelpCircle :size="16" class="text-[var(--vp-c-brand-1)] flex-shrink-0" />
              <span>{{ item.q }}</span>
            </span>
            <ChevronUp v-if="openMap[`${activeCategory}-${idx}`]" :size="17" class="text-[var(--vp-c-brand-1)] flex-shrink-0" />
            <ChevronDown v-else :size="17" class="text-[var(--vp-c-text-3)] flex-shrink-0" />
          </button>

          <div
            v-if="openMap[`${activeCategory}-${idx}`]"
            class="px-5 pb-5 pt-3 text-xs text-[var(--vp-c-text-2)] leading-relaxed border-t border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] whitespace-pre-line"
          >
            {{ item.a }}
          </div>
        </div>
      </div>

      <!-- Still have questions footer callout -->
      <div class="mt-14 text-center max-w-xl mx-auto p-6 rounded-2xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-soft)]">
        <h4 class="text-sm font-bold text-[var(--vp-c-text-1)] mb-1.5">没有找到您想了解的问题？</h4>
        <p class="text-xs text-[var(--vp-c-text-3)] mb-4">您可以直接加入我们的开源交流群，与工厂 IT 同行及官方技术支持即时交流。</p>
        <NuxtLink to="/quick-start" class="vp-btn vp-btn-brand text-xs">
          <span>查阅快速启动文档</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
