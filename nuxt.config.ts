const rawBaseURL = process.env.NUXT_APP_BASE_URL || '/'
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL : `${rawBaseURL}/`

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  components: [
    { path: '~/components/home', pathPrefix: false },
    '~/components'
  ],
  modules: ['@unocss/nuxt', '@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '睿易 MDP · 离散制造数字化平台',
      meta: [
        { name: 'description', content: '面向软件开发爱好者与工厂IT人员的开源工业级数字化制造平台。基于 Spring Boot 4 + PG16 + Vue 3 + UniApp。' },
        { name: 'theme-color', content: '#071015' },
        { property: 'og:title', content: '睿易 MDP · 离散制造数字化平台' },
        { property: 'og:description', content: '面向真实制造现场的一体化数字化平台' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseURL}logo/favicon-32x32.png` },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${baseURL}logo/favicon-16x16.png` },
        { rel: 'shortcut icon', href: `${baseURL}favicon.ico` },
        { rel: 'apple-touch-icon', href: `${baseURL}logo/ruiyi-icon-128.png` }
      ]
    }
  },
  nitro: {
    preset: 'static'
  }
})
