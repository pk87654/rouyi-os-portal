<script setup lang="ts">
import { ArrowRight, MessageSquare, BookOpen, ShieldCheck, Users, Sparkles, GitBranch } from 'lucide-vue-next'
</script>

<template>
  <section id="contact" class="section-pad final-section">
    <div class="grid-overlay" />
    <div class="section-shell relative z-10">
      <!-- Main CTA Head -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <span class="section-kicker">Open Source & Community</span>
        <h2 class="section-title text-white mt-4 mb-6">
          从真实现场开始，<br>
          <span class="text-cyan">共建制造业数字化基础设施。</span>
        </h2>
        <p class="section-copy mx-auto">
          让软件真正理解工厂如何运转。提供全套规范可读源码、Docker 一键部署支持与工业级业务闭环设计。
        </p>
      </div>

      <!-- Action Panel -->
      <div class="panel p-8 md:p-12 border-cyan/30 max-w-5xl mx-auto bg-gradient-to-br from-[#0a181e] to-[#061014] relative overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <!-- Left: Value Proposition & Buttons -->
          <div class="lg:col-span-7 space-y-6">
            <div class="flex flex-wrap gap-2">
              <span class="tag text-cyan border-cyan/30 bg-cyan/5 font-medium">100% 完整开源可读源码</span>
              <span class="tag text-lime border-lime/30 bg-lime/5 font-medium">Docker 一键依赖拉起</span>
              <span class="tag text-gray-300 border-white/10 bg-white/5 font-medium">专为离散制造/机加工打造</span>
            </div>

            <h3 class="text-2xl font-bold text-white leading-snug">
              准备好探索或二次开发了吗？
            </h3>
            
            <p class="text-sm text-muted leading-relaxed">
              适合希望深入学习离散制造数字化架构、为自家工厂搭建私有化系统，或使用 AI 辅助编程进行二次开发的开发者与工厂 IT 团队。
            </p>

            <div class="flex flex-wrap gap-4 pt-2">
              <NuxtLink to="/quick-start" class="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cyan text-ink font-bold text-sm shadow-lg shadow-cyan/20 hover:bg-cyan-soft transition transform hover:-translate-y-0.5">
                <BookOpen :size="16" />
                <span>快速启动与上手文档</span>
                <ArrowRight :size="16" />
              </NuxtLink>
              <NuxtLink to="/hosting" class="ghost-button">
                <GitBranch :size="15" class="text-cyan" />
                <span>前往 Gitee / GitHub 仓库</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Right: Community Box -->
          <div class="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10">
            <div class="bg-black/40 rounded-2xl p-6 border border-white/5 text-center space-y-4">
              <div class="w-12 h-12 mx-auto rounded-xl bg-cyan/10 text-cyan flex items-center justify-center">
                <Users :size="24" />
              </div>
              <div>
                <h4 class="text-base font-bold text-white mb-1">工厂 IT & 开发者交流群</h4>
                <p class="text-xs text-muted">探讨工业架构、二开踩坑与现场硬件对接</p>
              </div>
              <div class="p-3 rounded-lg bg-white/5 border border-white/10">
                <div class="text-xs text-muted">群主 / 技术微信</div>
                <div class="text-sm font-bold text-cyan font-mono mt-1">ruiyi-manufacturing</div>
                <div class="text-[11px] text-gray-500 mt-0.5">添加请备注「工厂IT」或「开源二开」</div>
              </div>
              <div class="text-[11px] text-gray-400 flex items-center justify-center gap-2">
                <ShieldCheck :size="14" class="text-lime" />
                <span>开放、透明、互助的技术共建社区</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Motto Footer -->
      <div class="text-center mt-12 text-xs text-muted font-medium tracking-wider">
        “ 不是让工厂适应软件，而是让软件理解工厂怎么工作。 ”
      </div>
    </div>
  </section>
</template>

<style scoped>
.final-section {
  background: radial-gradient(circle at 50% 40%, rgba(35, 131, 123, 0.15), transparent 60%), #071015;
}
</style>
