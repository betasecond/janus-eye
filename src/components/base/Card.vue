<template>
  <div class="flex items-stretch justify-between gap-4 rounded-lg p-4 bg-[#f8f9fc]" :class="cardClass">
    <!-- 左侧内容区域 -->
    <div class="flex flex-[2_2_0px] flex-col gap-4">
      <div class="flex flex-col gap-1">
        <p v-if="subtitle" class="text-[#49699c] text-sm font-normal leading-normal">{{ subtitle }}</p>
        <p class="text-[#0d131c] text-base font-bold leading-tight">{{ title }}</p>
        <p v-if="description" class="text-[#49699c] text-sm font-normal leading-normal">{{ description }}</p>
      </div>
      <button
        v-if="buttonText"
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#e7ecf4] text-[#0d131c] text-sm font-medium leading-normal w-fit hover:bg-[#d0dae8] transition-colors"
        @click="handleButtonClick"
      >
        <span class="truncate">{{ buttonText }}</span>
      </button>
      <slot name="actions" />
    </div>

    <!-- 右侧图片区域 -->
    <div
      v-if="image"
      class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
      :style="`background-image: url('${image}')`"
    />
    
    <!-- 右侧图标区域 -->
    <div
      v-else-if="icon"
      class="text-[#0d131c] flex items-center justify-center rounded-lg bg-[#e7ecf4] shrink-0 size-12"
    >
      <Icon :name="icon" size="24" color="#0d131c" />
    </div>
    
    <!-- 自定义右侧内容 -->
    <slot name="aside" />
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

interface Props {
  title: string
  subtitle?: string
  description?: string
  buttonText?: string
  image?: string
  icon?: string
  cardClass?: string
}

interface Emits {
  (e: 'button-click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleButtonClick = () => {
  emit('button-click')
}
</script> 