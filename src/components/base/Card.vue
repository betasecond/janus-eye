<template>
  <div 
    class="card flex items-stretch justify-between gap-4 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200 transform-gpu hover:scale-105 hover:-translate-y-1"
    :class="[cardClass, {
      'animate-pulse': loading,
      'opacity-60 cursor-not-allowed': disabled
    }]"
    @click="handleCardClick"
  >
    <!-- 左侧内容区域 -->
    <div class="flex flex-[2_2_0px] flex-col gap-4">
      <div class="flex flex-col gap-2">
        <!-- 副标题 -->
        <div v-if="subtitle" class="flex items-center gap-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p class="text-[#49699c] text-sm font-medium leading-normal">{{ subtitle }}</p>
        </div>
        
        <!-- 主标题 -->
        <h3 class="text-[#0d131c] text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300">
          {{ title }}
        </h3>
        
        <!-- 描述 -->
        <p v-if="description" class="text-[#49699c] text-sm font-normal leading-normal">
          {{ description }}
        </p>
      </div>
      
      <!-- 标签 -->
      <div v-if="tags && tags.length > 0" class="flex flex-wrap gap-2">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- 进度条 -->
      <div v-if="progress !== undefined" class="w-full">
        <div class="flex justify-between items-center mb-1">
          <span class="text-xs text-gray-500">Progress</span>
          <span class="text-xs font-bold text-blue-600">{{ progress }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out animate-progress-bar"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
      
      <!-- 按钮 -->
      <button
        v-if="buttonText"
        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold leading-normal w-fit hover:from-blue-600 hover:to-purple-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
        @click.stop="handleButtonClick"
      >
        <span class="truncate">{{ buttonText }}</span>
      </button>
      
      <!-- 自定义动作插槽 -->
      <slot name="actions" />
      
      <!-- 默认插槽 - 主要内容 -->
      <slot />
    </div>

    <!-- 右侧图片区域 -->
    <div
      v-if="image"
      class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 shadow-md group-hover:shadow-lg transition-shadow duration-300"
      :style="`background-image: url('${image}')`"
    />
    
    <!-- 右侧图标区域 -->
    <div
      v-else-if="icon"
      class="text-[#0d131c] flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 shrink-0 size-16 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg"
    >
      <Icon :name="icon" size="24" color="#3b82f6" class="transition-transform duration-300 group-hover:scale-110" />
    </div>
    
    <!-- 自定义右侧内容 -->
    <slot name="aside" />
    
    <!-- 加载状态遮罩 -->
    <div v-if="loading" class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-xl">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
    </div>
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
  loading?: boolean
  disabled?: boolean
  tags?: string[]
  progress?: number
  value?: string
}

interface Emits {
  (e: 'button-click'): void
  (e: 'click'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleButtonClick = () => {
  if (props.disabled) return
  emit('button-click')
}

const handleCardClick = () => {
  if (props.disabled) return
  emit('click')
}
</script>

<style scoped>
@keyframes progress-bar {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width);
  }
}

.animate-progress-bar {
  animation: progress-bar 1.5s ease-out;
  animation-fill-mode: both;
}

.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.card:hover::before {
  left: 100%;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style> 