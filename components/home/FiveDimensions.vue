<script setup lang="ts">
import { 
  GitMerge, ShieldCheck, QrCode, CalendarClock, Cpu, 
  Check, ArrowRight, Sparkles 
} from 'lucide-vue-next'

const dimensions = [
  {
    id: 'digital-thread',
    title: '一条数字主线，穿透制造始终',
    tagline: '19 个业务模块开箱即用，消灭跨部门数据烟囱',
    desc: '从 CRM 需求预测、ERP 销售订单、生产订单，到 PLM 工艺定义、MES 现场派工、QMS 质量放行与 WMS 齐套发料，全业务链共享唯一事实源。',
    icon: GitMerge,
    theme: 'cyan',
    tags: [
      'PLM 工艺包', 'MES 制造执行', 'APS 排产中枢', 'QMS 质量追溯', 
      'WMS 智能仓储', 'Tool 刀具管理', 'ERP 进销存', 'E-SOP 电子图纸', 
      'CRM 需求预测', 'BPM 流程审批', '报表与大屏', '系统管理'
    ]
  },
  {
    id: 'process-driven',
    title: '工艺驱动现场，快照杜绝差错',
    tagline: '工单冻结工艺快照，四层就绪度受控发布',
    desc: '严格遵循 V5.0 架构。工单下发时自动生成 SHA-256 工艺快照（JSONB 存储），彻底隔离工程图纸变更；坚持权责三分：PLM 管定义、MES 管执行、QMS 管判定，返工以独立工单闭环。',
    icon: ShieldCheck,
    theme: 'lime',
    cards: [
      { name: '四层就绪度 (Readiness)', detail: '报价初算 → 计划排程 → 工位执行 → 完整受控发布' },
      { name: '工艺快照隔离 (Snapshot)', detail: 'JSONB + SHA-256 签名防篡改，车间严格按快照做' },
      { name: '双轨版本与审阅', detail: '草稿支持灵活调整，已发布版本必须经过 Flowable 受控签审' },
      { name: '返工独立闭环', detail: '返工为独立工单 (task_type=REWORK)，不污染主工艺版本' }
    ]
  },
  {
    id: 'shopfloor-execution',
    title: '现场三码合一，极简防呆执行',
    tagline: '统一 MFG:// 工业码规范，0 盲打、防呆防错',
    desc: '车间操作不是后台复杂表格。基于统一工业码规范，操作工扫员工、扫设备、扫施工卡即可自动装载生产上下文，大字号防呆界面让一线 1 分钟上手。',
    icon: QrCode,
    theme: 'cyan',
    cards: [
      { name: '统一工业码规范', detail: 'MFG://EMP (员工) + MFG://MC (机床) + MFG://TC (施工卡)' },
      { name: '防呆防错拦截', detail: '前序未质检、未报工自动拦截，杜绝批量报废事故' },
      { name: '动态 E-SOP 图纸', detail: '随工序自动下发指导，支持 21.5寸工位屏与手套触控' },
      { name: '双通道敏捷报工', detail: '扫码极速报工与工位深度报工共用同一套状态机与幂等键' }
    ]
  },
  {
    id: 'planning-hub',
    title: '计划协同中枢，部门承诺闭环',
    tagline: '从传统白板会议，到数字计划与责任基线',
    desc: '保留离散制造团队熟悉的白板协同模式，将责任节点、部门承诺与有限产能日历沉淀为数字资产，实时比对计划基线（Baseline）与实际执行偏差。',
    icon: CalendarClock,
    theme: 'orange',
    cards: [
      { name: '白板协同排产', detail: '销售、工程、采购、生产跨部门多角色在线协同排程' },
      { name: '计划基线 (Baseline)', detail: '锁定各部门承诺交付时间节点，智能追踪进度偏差' },
      { name: '有限产能约束', detail: '结合机台负荷、人员技能与班次可用日历精确计算交期' },
      { name: 'AI 辅助预排', detail: '基于历史相似项目数据，智能推荐工序节拍与排产方案' }
    ]
  },
  {
    id: 'modern-tech',
    title: '现代化全开源底座，天然适配 AI 二开',
    tagline: 'Spring Boot 4 + PG16 + Sa-Token，100% 源码交付',
    desc: '基于 Spring Boot 4 + Java 17 + PostgreSQL 16 + Flowable 8 + MyBatis-Plus + FastExcel，规范的分层架构与主数据主权，让企业不仅自主掌控，更能借力 AI 极速二开。',
    icon: Cpu,
    theme: 'lime',
    cards: [
      { name: '现代技术基座', detail: 'Spring Boot 4.0.6 + PostgreSQL 16 JSONB + Sa-Token 鉴权' },
      { name: '100% 源码交付', detail: '无加密、无功能黑盒，支持企业本地纯私有化自主掌控' },
      { name: 'MDM-Ready 规范', detail: '主数据权威主档归口清晰，跨模块严格走 API + DTO 契约' },
      { name: 'AI Coding 深度适配', detail: '清晰的三层架构，配套 AI 二开提示词与 Skills 技能包' }
    ]
  }
]
</script>

<template>
  <section class="section-pad dimensions-section">
    <div class="grid-overlay" />
    <div class="section-shell relative z-10">
      <div class="section-head text-center mx-auto mb-16">
        <span class="section-kicker">Core Dimensions · 核心维度</span>
        <h2 class="section-title text-white">
          从五个硬核维度，读懂 <span class="text-cyan">睿易制造平台</span>
        </h2>
        <p class="section-copy mx-auto">
          一条数字主线贯穿、一套受控工艺驱动、三码合一现场防呆、计划责任承诺闭环与现代化全开源底座——专为离散制造与机加工打造的数字化平台。
        </p>
      </div>

      <!-- Feature Rows -->
      <div class="space-y-8">
        <div
          v-for="(dim, index) in dimensions"
          :key="dim.id"
          class="panel p-6 md:p-8 border-white/10 hover:border-cyan/40 transition-all duration-300 relative group overflow-hidden"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <!-- Left Side: Title, Tagline, Icon -->
            <div class="lg:col-span-4">
              <div class="flex items-center gap-4 mb-4">
                <div :class="[
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
                  dim.theme === 'cyan' ? 'bg-cyan/10 text-cyan group-hover:bg-cyan group-hover:text-ink' :
                  dim.theme === 'lime' ? 'bg-lime/10 text-lime group-hover:bg-lime group-hover:text-ink' :
                  'bg-orange-500/10 text-orange-400 group-hover:bg-orange-400 group-hover:text-ink'
                ]">
                  <component :is="dim.icon" :size="24" />
                </div>
                <div>
                  <span class="text-[11px] font-mono text-muted block mb-0.5">DIMENSION 0{{ index + 1 }}</span>
                  <h3 class="text-xl font-bold text-white leading-tight">{{ dim.title }}</h3>
                </div>
              </div>
              <p class="text-xs font-semibold text-cyan/90 mb-3 tracking-wide">{{ dim.tagline }}</p>
              <p class="text-xs text-muted leading-relaxed">{{ dim.desc }}</p>
            </div>

            <!-- Right Side: Content (Tags or Cards) -->
            <div class="lg:col-span-8">
              <!-- Case A: Digital Thread Module Tags -->
              <div v-if="dim.tags" class="bg-black/30 rounded-xl p-5 border border-white/5">
                <div class="text-xs text-muted mb-3 flex items-center justify-between">
                  <span>全域 19 个业务模块深度贯通</span>
                  <span class="text-cyan font-mono text-[11px]">One Fact Source</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in dim.tags"
                    :key="tag"
                    class="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-gray-300 font-medium hover:border-cyan/50 hover:text-white transition"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Case B: Detail Cards Grid -->
              <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="card in dim.cards"
                  :key="card.name"
                  class="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition flex flex-col justify-between"
                >
                  <div class="flex items-center gap-2 mb-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-cyan" />
                    <strong class="text-xs font-bold text-white">{{ card.name }}</strong>
                  </div>
                  <p class="text-[11px] text-muted leading-relaxed">{{ card.detail }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dimensions-section {
  background: radial-gradient(circle at 80% 20%, rgba(35, 131, 123, 0.08), transparent 50%), #071116;
}
</style>
