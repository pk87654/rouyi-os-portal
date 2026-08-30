<script setup lang="ts">
import { ref } from 'vue'
import { MessageSquare, Check } from 'lucide-vue-next'

const isOpen = ref(true)
const copied = ref(false)
const wechatId = 'ruiyi-manufacturing'

const copyWechat = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(wechatId)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="vp-contact-float">
    <!-- Floating Trigger Pill when closed -->
    <button
      v-if="!isOpen"
      @click="isOpen = true"
      class="vp-contact-float-btn"
      aria-label="联系我们"
    >
      <MessageSquare :size="15" />
      <span>联系我们</span>
    </button>

    <!-- Floating Card matching ruoyioffice -->
    <div v-else class="vp-contact-float-card">
      <div class="vp-contact-float-header">
        <div>
          <strong>联系我们</strong>
          <p>获取演示、二开方案与技术答疑</p>
        </div>
        <button
          @click="isOpen = false"
          class="vp-contact-float-close"
          type="button"
          aria-label="关闭联系窗口"
        >
          ×
        </button>
      </div>

      <div class="vp-contact-float-body">
        <div class="vp-contact-float-qr overflow-hidden p-1 bg-white">
          <img
            src="/images/wechat-qr.png"
            alt="微信扫码咨询"
            class="w-full h-full object-contain rounded"
          />
        </div>

        <div class="w-full">
          <p class="text-xs text-[var(--vp-c-text-3)]">微信专属咨询</p>
          <p class="vp-contact-float-id">{{ wechatId }}</p>
          <p class="vp-contact-float-tip">添加时备注「工厂IT」或「开源二开」</p>

          <div class="vp-contact-float-actions">
            <button
              @click="copyWechat"
              class="vp-contact-float-action-btn primary"
              type="button"
            >
              {{ copied ? '✓ 已复制微信号' : '复制微信号' }}
            </button>
            <NuxtLink to="/demo" class="vp-contact-float-action-btn">在线体验</NuxtLink>
            <NuxtLink to="/commercial" class="vp-contact-float-action-btn">商业版</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
