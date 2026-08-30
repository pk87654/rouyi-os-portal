import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  theme: {
    colors: {
      ink: '#071015',
      panel: '#0c171d',
      cyan: '#39e6d1',
      lime: '#b7f34a'
    }
  },
  shortcuts: {
    'section-shell': 'mx-auto w-full max-w-7xl px-5 md:px-8',
    'eyebrow': 'text-xs font-700 tracking-[0.2em] uppercase text-cyan',
    'ghost-button': 'inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm text-white/82 transition hover:border-cyan/50 hover:text-white'
  }
})
