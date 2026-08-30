<script setup lang="ts">
import { gsap } from 'gsap'

const root = ref<HTMLElement>()
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.from(root.value?.querySelectorAll('[data-hero]') || [], { y: 24, opacity: 0, duration: .8, stagger: .1, ease: 'power3.out' })
})
</script>

<template>
  <section ref="root" class="hero">
    <div class="hero-orb" /><div class="grid-overlay" />
    <div class="section-shell hero-layout">
      <div class="hero-copy">
        <div data-hero class="hero-badge"><span class="status-dot" /> RUIYI MANUFACTURING PLATFORM · V1</div>
        <h1 data-hero>让软件理解<br><em>工厂怎么工作。</em></h1>
        <p data-hero>从客户需求到生产交付，把真实工厂完整运行在一个系统里。连接 ERP、MES、WMS、PLM 与 QMS，让计划、现场与交付共享同一个事实源。</p>
        <div data-hero class="hero-actions">
          <a class="primary-button" href="#contact">在线体验 <span>→</span></a>
          <a class="secondary-button" href="#architecture">▤ 查看文档</a>
        </div>
        <div data-hero class="hero-links"><a href="#open-source">⌘ 开源仓库</a><a href="#architecture">◇ 部署指南</a></div>
      </div>
      <div data-hero class="hero-product panel" aria-label="生产指挥中心产品界面预览">
        <div class="product-topbar"><div><span class="product-logo">R</span><b>生产指挥中心</b></div><div class="product-meta"><span><i class="online" />系统正常</span><span>08月30日 · 周日</span></div></div>
        <div class="product-body">
          <aside class="product-sidebar"><span class="active">◈ 总览</span><span>⌁ 现场执行</span><span>◇ 物料齐套</span></aside>
          <div class="product-content">
            <div class="metrics"><div><small>今日计划</small><strong>128</strong><span>生产任务</span></div><div><small>已完工</small><strong class="cyan">86</strong><span>完成率 67.2%</span></div><div><small>在制设备</small><strong>34</strong><span class="good">32 正常</span></div></div>
            <div class="work-area">
              <div class="schedule"><div class="mini-head"><b>设备实时负荷</b><span>本班次</span></div><div v-for="(row, i) in ['CNC-01','CNC-02','MC-07','EDM-03']" :key="row" class="machine-row"><span>{{ row }}</span><div><i :style="{ width: [78,54,91,66][i] + '%' }" /></div><small>{{ [78,54,91,66][i] }}%</small></div></div>
              <div class="current-job"><div class="mini-head"><b>当前任务</b><span class="job-live">加工中</span></div><small>MO-20260830-018</small><h3>壳体 · 精加工</h3><div class="job-progress"><i /></div><div class="job-foot"><span>18 / 24</span><span>✓ 工艺已确认</span></div></div>
            </div>
          </div>
        </div>
        <div class="scan-toast"><b class="scan-glyph">⌁</b><span><b>扫码识别成功</b><small>员工 + 设备 + 施工卡</small></span><i>自动创建生产上下文</i></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero{min-height:870px;padding:150px 0 90px;position:relative;display:grid;align-items:center;background:radial-gradient(circle at 68% 28%,rgba(34,109,106,.16),transparent 35%),linear-gradient(180deg,#071015,#08151a)}.hero-orb{position:absolute;width:560px;height:560px;top:80px;right:-100px;background:rgba(57,230,209,.05);filter:blur(80px);border-radius:50%}.hero-layout{position:relative;display:grid;grid-template-columns:.88fr 1.32fr;gap:58px;align-items:center}.hero-copy h1{margin:25px 0 23px;font-size:clamp(48px,6.1vw,87px);line-height:.98;letter-spacing:-.065em}.hero-copy h1 em{color:var(--cyan);font-style:normal;text-shadow:0 0 38px rgba(57,230,209,.16)}.hero-copy>p{max-width:570px;color:#9bb0b2;line-height:1.9;font-size:16px}.hero-badge{display:inline-flex;gap:10px;align-items:center;color:#a9babb;font-size:10px;font-weight:700;letter-spacing:.14em}.hero-actions{margin-top:34px;display:flex;gap:12px;flex-wrap:wrap}.primary-button,.secondary-button{display:inline-flex;align-items:center;gap:9px;padding:14px 22px;border-radius:999px;font-size:13px;font-weight:700}.primary-button{background:var(--cyan);color:#061114;box-shadow:0 12px 35px rgba(57,230,209,.15)}.secondary-button{border:1px solid var(--line);background:rgba(255,255,255,.025);color:#d4e2e2}.hero-links{margin-top:21px;display:flex;gap:24px;color:#71898c;font-size:11px}.hero-links a{display:flex;align-items:center;gap:6px}.hero-product{position:relative;min-width:670px;overflow:visible;transform:perspective(1100px) rotateY(-3deg) rotateX(1deg)}
.product-topbar{display:flex;justify-content:space-between;align-items:center;height:58px;padding:0 20px;border-bottom:1px solid var(--line);font-size:11px}.product-topbar>div{display:flex;align-items:center;gap:10px}.product-logo{display:grid;place-items:center;width:25px;height:25px;border-radius:6px;background:var(--cyan);color:#061114;font-weight:800}.product-meta{color:#6f878a!important;gap:18px!important}.product-meta span{display:flex;align-items:center;gap:6px}.online{width:6px;height:6px;border-radius:50%;background:var(--lime)}.product-body{display:grid;grid-template-columns:132px 1fr;min-height:370px}.product-sidebar{padding:18px 12px;border-right:1px solid var(--line);display:grid;align-content:start;gap:8px}.product-sidebar span{display:flex;align-items:center;gap:8px;padding:9px;border-radius:7px;color:#71898b;font-size:10px}.product-sidebar .active{background:rgba(57,230,209,.1);color:var(--cyan)}.product-content{padding:18px}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.metrics>div{padding:14px;border:1px solid var(--line);border-radius:10px;background:rgba(3,12,16,.35)}.metrics small{display:block;color:#789092;font-size:9px}.metrics strong{display:inline-block;margin:6px 8px 2px 0;font-size:26px}.metrics span{font-size:8px;color:#667e80}.metrics .cyan{color:var(--cyan)}.metrics .good{color:#94bd52}.work-area{display:grid;grid-template-columns:1.35fr .8fr;gap:10px;margin-top:10px}.schedule,.current-job{padding:15px;border:1px solid var(--line);border-radius:10px;background:rgba(3,12,16,.35)}.mini-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;font-size:10px}.mini-head span{color:#667e80;font-size:8px}.machine-row{display:grid;grid-template-columns:48px 1fr 28px;gap:8px;align-items:center;margin:12px 0;color:#899ea0;font-size:8px}.machine-row div{height:4px;background:#17272d;border-radius:4px}.machine-row i{display:block;height:100%;background:linear-gradient(90deg,#1f8f87,var(--cyan));border-radius:4px}.machine-row small{text-align:right}.job-live{color:var(--lime)!important}.current-job>small{font-size:7px;color:#5e7779}.current-job h3{margin:8px 0 19px;font-size:13px}.job-progress{height:5px;background:#18282d;border-radius:5px}.job-progress i{display:block;width:75%;height:100%;background:var(--cyan);border-radius:5px}.job-foot{display:flex;justify-content:space-between;margin-top:10px;color:#71888a;font-size:8px}.job-foot span:last-child{display:flex;align-items:center;gap:4px;color:#86aa50}.scan-toast{position:absolute;right:-18px;bottom:-28px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;width:345px;padding:13px 15px;border:1px solid rgba(57,230,209,.28);border-radius:12px;background:rgba(9,27,31,.96);box-shadow:0 18px 50px #0008;color:var(--cyan)}.scan-toast span b,.scan-toast span small{display:block}.scan-toast b{font-size:10px}.scan-toast small{margin-top:3px;color:#668083;font-size:7px}.scan-toast>i{font-style:normal;color:#82999b;font-size:8px}@media(max-width:1100px){.hero-layout{grid-template-columns:1fr}.hero-copy{max-width:700px}.hero-product{min-width:0;transform:none}}@media(max-width:700px){.hero{padding-top:130px;min-height:auto}.hero-product{margin-top:20px}.product-body{grid-template-columns:1fr}.product-sidebar{display:none}.metrics{grid-template-columns:1fr 1fr}.metrics>div:last-child{display:none}.work-area{grid-template-columns:1fr}.current-job{display:none}.scan-toast{right:12px;width:calc(100% - 24px)}.hero-copy h1{font-size:51px}}
</style>
