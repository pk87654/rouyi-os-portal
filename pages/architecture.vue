<script setup lang="ts">
import { 
  GitMerge, ShieldCheck, Layers, Cpu, Wrench, 
  Workflow, ArrowRight, CheckCircle2, FileCode2, Sparkles 
} from 'lucide-vue-next'

useSeoMeta({
  title: '架构总纲｜睿易制造平台 - V5.0 领域驱动设计与数字主线规范',
  description: '全面解析睿易制造平台 V5.0 顶层设计：One Digital Thread、四层工艺拷贝模型、工单工艺快照隔离原理、权责三分与双通道报工状态机。'
})

const copyLayers = [
  { level: 'as-designed', title: '设计与编制态', where: 'PLM 工艺包草稿 / ECR / ECN', desc: '工艺工程师自由编制工序、工步、图纸与参数，支持多版本草稿。' },
  { level: 'as-released', title: '受控发布态', where: 'plm_process_package_release', desc: '通过 Flowable 8 正式完成多级签审，冻结对外暴露的标准工艺契约。' },
  { level: 'as-adopted', title: '工厂接收态', where: 'mes_process_catalog', desc: '车间生产部门确认接收并启用，作为当前工厂新工单默认执行版本。' },
  { level: 'as-planned', title: '工单计划态 (Snapshot)', where: 'mes_wo_process_snapshot', desc: '工单下发时抓取并固化 JSONB + SHA-256 签名快照，只增不改，彻底隔离外部变更。' },
  { level: 'as-built', title: '实际生产事实态', where: 'mes_report / sop_execution', desc: '现场扫码报工与 E-SOP 严格绑定工单快照 ID，形成不可篡改的产品履历谱系。' }
]

const tripartiteRules = [
  { domain: 'PLM（定义权）', rule: '产出工厂可以用的受控工艺', detail: '管产品定义、工艺路线、工步与图纸，禁止直接修改车间工单，不直接读取 MES 内部表。' },
  { domain: 'MES（实施权）', rule: '决定新工单用哪版、在制工单剩下来怎么做', detail: '管工单调度、现场执行与报工，操作工现场只认快照 Resolver，不手工选版本号。' },
  { domain: 'QMS（判定权）', rule: '决定已经做出的东西合不合格、要不要返工', detail: '管首检、巡检、MRB 不合格品处置；返工是另一张独立新工单，不污染主工艺版本。' }
]
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Page Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="section-kicker">V5.0 Architecture Blueprint</span>
        <h1 class="section-title">V5.0 数字制造平台架构总纲</h1>
        <p class="section-copy mx-auto">
          不盲目堆砌功能，而是建立稳定清晰的制造领域模型。收录制造数字主线、四层工艺拷贝、工艺快照隔离与权责三分硬规则。
        </p>
      </div>

      <div class="space-y-10 max-w-5xl mx-auto">
        <!-- Section 1: One Digital Thread -->
        <div class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-[var(--vp-c-brand-soft)] text-[var(--vp-c-brand-1)] flex items-center justify-center">
              <GitMerge :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-[var(--vp-c-text-1)]">一、One Digital Thread（制造数字主线）</h2>
              <p class="text-xs text-[var(--vp-c-text-3)]">从需求输入到售后追溯，全生命周期贯穿唯一事实源</p>
            </div>
          </div>

          <p class="text-xs text-[var(--vp-c-text-2)] leading-relaxed mb-4">
            借鉴西门子工业软件核心设计思想，消灭系统之间的手工倒藤与数据孤岛。订单、BOM、工艺包、排产计划、工单执行、质检放行与仓储出入库，全部由事件驱动与数字主线无缝串联：
          </p>

          <div class="p-3.5 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] font-mono text-xs text-[var(--vp-c-brand-1)] overflow-x-auto leading-relaxed">
            Customer需求 → Forecast预测 → Planning协同计划 → PLM工艺与BOM → Snapshot生产快照 → MES现场执行 → QMS质量闭环 → WMS智能仓储 → Delivery准时交付
          </div>
        </div>

        <!-- Section 2: Four-Layer Copy Model -->
        <div class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-[rgba(16,185,129,0.12)] text-[#10b981] flex items-center justify-center">
              <Layers :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-[var(--vp-c-text-1)]">二、四层工艺拷贝模型（对齐西门子与 SAP PP 工业标准）</h2>
              <p class="text-xs text-[var(--vp-c-text-3)]">解耦工艺编制、受控发布、车间接收与在制执行</p>
            </div>
          </div>

          <p class="text-xs text-[var(--vp-c-text-2)] leading-relaxed mb-4">
            传统软件之所以经常在工艺变更时出现车间混料和数据冲突，根因在于缺少稳定的中间拷贝层。睿易建立清晰的五态四层模型：
          </p>

          <div class="space-y-2.5">
            <div
              v-for="(item, idx) in copyLayers"
              :key="item.level"
              class="p-3.5 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div class="flex items-start gap-2.5">
                <div class="w-5 h-5 rounded bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] text-[var(--vp-c-brand-1)] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                  {{ idx + 1 }}
                </div>
                <div>
                  <div class="flex items-center gap-2 mb-0.5">
                    <strong class="text-xs font-bold text-[var(--vp-c-text-1)]">{{ item.title }}</strong>
                    <span class="tag font-mono text-[10px]">{{ item.level }}</span>
                  </div>
                  <p class="text-xs text-[var(--vp-c-text-3)] leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
              <div class="text-[11px] font-mono text-[var(--vp-c-text-2)] bg-[var(--vp-c-bg-elv)] py-1 px-2 rounded border border-[var(--vp-c-border)] whitespace-nowrap self-start md:self-auto">
                {{ item.where }}
              </div>
            </div>
          </div>
        </div>

        <!-- Section 3: Snapshot Principle -->
        <div id="snapshot" class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-[var(--vp-c-bg-elv)] text-[var(--vp-c-brand-1)] flex items-center justify-center">
              <ShieldCheck :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-[var(--vp-c-text-1)]">三、工单工艺快照隔离（Process Snapshot Isolation）</h2>
              <p class="text-xs text-[var(--vp-c-brand-1)] font-semibold">车间在制工单如何彻底免疫工程图纸变更？</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div class="p-4 bg-[var(--vp-c-bg-elv)] rounded-lg border border-[var(--vp-c-border)]">
              <h3 class="text-xs font-bold text-red-500 mb-1.5">❌ 传统软件的严重痛点</h3>
              <p class="text-[var(--vp-c-text-2)]">
                工单只关联一个“工艺版本号”。当技术部发布 V2.0 新图纸时，车间正在加工到一半的几百件工单如果直接读新版本，会导致操作工看到新工步、用老毛坯，造成重大批量报废；如果不升版，又无法追溯历史。
              </p>
            </div>

            <div class="p-4 bg-[var(--vp-c-bg-elv)] rounded-lg border border-[var(--vp-c-brand-1)]">
              <h3 class="text-xs font-bold text-[var(--vp-c-brand-1)] mb-1.5">✅ 睿易的快照隔离方案</h3>
              <p class="text-[var(--vp-c-text-2)]">
                工单创建下发瞬间，自动抓取当时的完整工艺树、工步参数、图纸 URL 与检验要求，固化为 <strong>带有 SHA-256 签名的 JSONB 快照</strong>（<code>mes_wo_process_snapshot</code>）。现场操作工严格按快照做，新图纸发布完全不影响在制工单。
              </p>
            </div>
          </div>
        </div>

        <!-- Section 4: Tripartite Governance -->
        <div class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-[rgba(245,158,11,0.12)] text-[#f59e0b] flex items-center justify-center">
              <Workflow :size="20" />
            </div>
            <div>
              <h2 class="text-lg font-bold text-[var(--vp-c-text-1)]">四、权责三分硬规则（PLM vs MES vs QMS）</h2>
              <p class="text-xs text-[var(--vp-c-text-3)]">定义权在 PLM，实施权在 MES，判定权在 QMS</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="trip in tripartiteRules"
              :key="trip.domain"
              class="p-4 rounded-lg bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-border)] space-y-1.5"
            >
              <div class="text-xs font-bold text-[var(--vp-c-brand-1)] font-mono">{{ trip.domain }}</div>
              <div class="text-xs font-semibold text-[var(--vp-c-text-1)]">{{ trip.rule }}</div>
              <p class="text-xs text-[var(--vp-c-text-3)] leading-relaxed">{{ trip.detail }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
