<script setup lang="ts">
const open = ref(false)
const links = [
  ['产品', '#products'], ['制造现场', '#shopfloor'], ['Planning Hub', '#planning'],
  ['架构', '#architecture'], ['开源', '#open-source']
]
</script>

<template>
  <div class="site-frame">
    <header class="site-header">
      <div class="section-shell header-inner">
        <a class="brand" href="#top" aria-label="睿翼制造平台首页">
          <span class="brand-mark">R</span>
          <span><b>睿翼制造</b><small>RUIYI MANUFACTURING</small></span>
        </a>
        <nav class="desktop-nav" aria-label="主导航">
          <a v-for="([label, href]) in links" :key="href" :href="href">{{ label }}</a>
        </nav>
        <div class="header-actions">
          <a class="github-link" href="#open-source">⌘ GitHub</a>
          <a class="header-cta" href="#contact">在线体验</a>
          <button class="menu-button" :aria-expanded="open" aria-label="切换导航" @click="open = !open">
            <span>{{ open ? '×' : '☰' }}</span>
          </button>
        </div>
      </div>
      <nav v-if="open" class="mobile-nav section-shell" aria-label="移动端导航">
        <a v-for="([label, href]) in links" :key="href" :href="href" @click="open = false">{{ label }}</a>
      </nav>
    </header>
    <main><slot /></main>
    <footer class="site-footer">
      <div class="section-shell footer-inner">
        <div class="brand"><span class="brand-mark">R</span><span><b>睿翼制造</b><small>RUIYI MANUFACTURING</small></span></div>
        <p>围绕真实工厂工作方式构建的制造业数字化平台。</p>
        <span>© {{ new Date().getFullYear() }} Ruiyi OS</span>
      </div>
    </footer>
  </div>
</template>
