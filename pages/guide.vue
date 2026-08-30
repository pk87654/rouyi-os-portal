<script setup lang="ts">
import { 
  Code2, ShieldCheck, Database, FileSpreadsheet, 
  Sparkles, Layers, Workflow, Check, Copy 
} from 'lucide-vue-next'

useSeoMeta({
  title: '二次开发指南｜睿易制造平台 - 规范分层、Sa-Token 与 AI 提效',
  description: '面向 Java 开发爱好者与工厂 IT 的二开实战手册：后端代码分层规范、Sa-Token 权限体系、MyBatis-Plus 租户隔离硬规则、Flowable 8 审批集成与 FastExcel。'
})

const copiedIndex = ref<number | null>(null)
const copyCode = (code: string, idx: number) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code)
    copiedIndex.value = idx
    setTimeout(() => {
      copiedIndex.value = null
    }, 2000)
  }
}

const javaControllerExample = `@Tag(name = "管理后台 - 工艺包版本")
@RestController
@RequestMapping("/plm/process-package-version")
@Validated
public class ProcessPackageVersionController {

    @Resource
    private ProcessPackageVersionService versionService;

    @PostMapping("/create")
    @Operation(summary = "创建工艺包草稿版本")
    @SaCheckPermission("plm:process-package:create")
    public CommonResult<Long> createVersion(@Valid @RequestBody ProcessPackageVersionSaveReqVO createReqVO) {
        return CommonResult.success(versionService.createVersion(createReqVO));
    }

    @GetMapping("/page")
    @Operation(summary = "获得工艺包版本分页")
    @SaCheckPermission("plm:process-package:query")
    public CommonResult<PageResult<ProcessPackageVersionRespVO>> getVersionPage(@Valid ProcessPackageVersionPageReqVO pageReqVO) {
        return CommonResult.success(versionService.getVersionPage(pageReqVO));
    }
}`
</script>

<template>
  <div class="py-12">
    <div class="vp-container">
      <!-- Page Header -->
      <div class="text-center max-w-2xl mx-auto mb-12">
        <span class="section-kicker">Developer Guide</span>
        <h1 class="section-title">二次开发与模块扩展指南</h1>
        <p class="section-copy mx-auto">
          规范清晰的 Java 分层架构与 MDM-Ready 领域设计，让无论人工二开还是借助 AI 辅助编程，都能写出健壮规范的工业级代码。
        </p>
      </div>

      <div class="space-y-8 max-w-5xl mx-auto">
        <!-- 1. Code Convention -->
        <div class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
          <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
            <Code2 :size="20" class="text-[var(--vp-c-brand-1)]" />
            <span>1. 后端标准代码分层规范</span>
          </h2>
          <p class="text-xs text-[var(--vp-c-text-3)] mb-4">
            业务代码统一置于 <code>cn.code.ruiyi.module.{module}</code> 下，严禁套用老旧若依风格：
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono mb-4">
            <div class="p-3.5 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] space-y-1 text-[var(--vp-c-text-2)]">
              <div class="text-[var(--vp-c-brand-1)] font-bold mb-1.5">标准目录结构：</div>
              <div>├── controller/admin/{biz} # 控制层</div>
              <div>├── service/{biz}          # 业务逻辑接口及实现</div>
              <div>├── dal/dataobject/{biz}   # 数据实体 (DO)</div>
              <div>├── dal/mysql/{biz}        # MyBatis-Plus Mapper</div>
              <div>├── api/{biz}              # 模块公开 DTO 契约</div>
              <div>└── enums                  # 模块业务枚举</div>
            </div>

            <div class="p-3.5 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] space-y-1.5 text-[var(--vp-c-text-2)]">
              <div class="text-[#10b981] font-bold">核心编码约束：</div>
              <div>• 返回值统一使用 <code>CommonResult&lt;T&gt;.success(...)</code></div>
              <div>• Controller 严禁继承 <code>BaseController</code> 或返回 <code>R&lt;T&gt;</code></div>
              <div>• 分页对象统一使用 <code>PageParam</code> 与 <code>PageResult&lt;T&gt;</code></div>
              <div>• 跨模块调用只能走 <code>XxxApi</code> + DTO，严禁跨 Mapper 操作</div>
            </div>
          </div>

          <!-- Controller Code Example -->
          <div class="relative bg-[var(--vp-c-bg-soft)] rounded-lg p-4 border border-[var(--vp-c-border)] font-mono text-xs text-[var(--vp-c-text-1)]">
            <div class="text-[var(--vp-c-text-3)] mb-2">// 示例：标准的 Controller 编写规范</div>
            <button
              @click="copyCode(javaControllerExample, 1)"
              class="absolute top-2.5 right-2.5 py-1 px-2 rounded bg-[var(--vp-c-bg-elv)] border border-[var(--vp-c-border)] hover:border-[var(--vp-c-brand-1)] text-[var(--vp-c-text-2)] text-[11px] flex items-center gap-1 transition cursor-pointer"
            >
              <Check v-if="copiedIndex === 1" :size="12" class="text-[var(--vp-c-brand-1)]" />
              <Copy v-else :size="12" />
              <span>{{ copiedIndex === 1 ? '已复制' : '复制代码' }}</span>
            </button>
            <pre class="overflow-x-auto pr-16 leading-relaxed"><code>{{ javaControllerExample }}</code></pre>
          </div>
        </div>

        <!-- 2. Sa-Token & Permissions -->
        <div id="sa-token" class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-border)] bg-[var(--vp-c-bg-elv)] shadow-sm">
          <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
            <ShieldCheck :size="20" class="text-[#10b981]" />
            <span>2. Sa-Token 权限与多租户隔离硬规则</span>
          </h2>
          <p class="text-xs text-[var(--vp-c-text-3)] mb-4">
            全面采用 Sa-Token 替代传统 Spring Security / OAuth2，兼顾高性能与轻量化：
          </p>

          <div class="space-y-2.5 text-xs text-[var(--vp-c-text-2)]">
            <div class="p-3 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] flex items-start gap-2.5">
              <div class="w-1.5 h-1.5 rounded-full bg-[var(--vp-c-brand-1)] mt-1.5" />
              <div>
                <strong class="text-[var(--vp-c-text-1)]">接口权限鉴权：</strong>
                统一使用 <code>@SaCheckPermission("module:business:action")</code> 注解，权限标识以数据库实际菜单为准。
              </div>
            </div>
            <div class="p-3 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] flex items-start gap-2.5">
              <div class="w-1.5 h-1.5 rounded-full bg-[#10b981] mt-1.5" />
              <div>
                <strong class="text-[var(--vp-c-text-1)]">租户隔离硬规则：</strong>
                业务代码<strong>严禁手动拼接 <code>tenant_id</code> 查询条件</strong>！底层 MyBatis-Plus 租户插件会自动解析当前租户并追加 SQL 条件。业务 DO 必须继承 <code>TenantBaseDO</code>。
              </div>
            </div>
            <div class="p-3 bg-[var(--vp-c-bg-soft)] rounded-lg border border-[var(--vp-c-border)] flex items-start gap-2.5">
              <div class="w-1.5 h-1.5 rounded-full bg-[#f59e0b] mt-1.5" />
              <div>
                <strong class="text-[var(--vp-c-text-1)]">跨租户特殊操作：</strong>
                确需跨租户查询时，必须使用框架统一封装的 <code>TenantUtils.executeIgnore(...)</code> 并附带中文说明注释。
              </div>
            </div>
          </div>
        </div>

        <!-- 3. AI Coding Acceleration -->
        <div class="p-6 md:p-8 rounded-xl border border-[var(--vp-c-brand-1)] bg-[var(--vp-c-brand-soft)] shadow-sm">
          <h2 class="text-lg font-bold text-[var(--vp-c-text-1)] mb-2 flex items-center gap-2.5">
            <Sparkles :size="20" class="text-[var(--vp-c-brand-1)]" />
            <span>3. AI Coding（Antigravity / Cursor / Claude）极速二开</span>
          </h2>
          <p class="text-xs text-[var(--vp-c-text-2)] mb-3 leading-relaxed">
            规范的分层架构使本项目天然契合 AI 辅助编程。在 IDE 中配合项目根目录的 <code>AGENTS.md</code> 与 <code>CLAUDE.md</code> 规范，AI 可以极其精准地连续生成完整的 Controller、Service、Mapper 与增量 SQL。
          </p>
          <div class="p-3 bg-[var(--vp-c-bg-elv)] rounded-lg border border-[var(--vp-c-border)] text-xs text-[var(--vp-c-brand-1)] font-mono">
            提示词示例：<code>“请在 ruiyi-module-tool 模块下，按照项目规范新建刀具报废审批功能，包含 DO、Mapper、Service、Controller 及增量 PostgreSQL SQL”</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
