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
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '睿易制造平台｜让软件理解工厂怎么工作',
      meta: [
        { name: 'description', content: '从客户需求到生产交付，把真实工厂完整运行在一个系统里。' },
        { name: 'theme-color', content: '#071015' },
        { property: 'og:title', content: '睿易制造平台' },
        { property: 'og:description', content: '面向真实制造现场的一体化数字化平台' },
        { property: 'og:type', content: 'website' }
      ],
      link: [{ rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
    }
  }
})
