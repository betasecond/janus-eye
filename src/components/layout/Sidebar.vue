<template>
  <div class="flex h-full min-h-[700px] flex-col justify-between bg-gradient-to-b from-[#f8f9fc] to-[#e7ecf4] p-4 w-80 shadow-lg border-r border-gray-200 transition-all duration-300 hover:shadow-xl">
    <div class="flex flex-col gap-4">
      <!-- 应用品牌 -->
      <div class="flex gap-3 items-center p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in-up">
        <div
          class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-transparent hover:ring-blue-300 transition-all duration-300 hover:scale-110 shadow-md"
          :style="`background-image: url('${user.avatar}')`"
        />
        <div class="flex-1">
          <h1 class="text-[#0d131c] text-base font-bold leading-tight">{{ appName }}</h1>
          <p class="text-[#49699c] text-xs">{{ user.name }}</p>
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="flex flex-col gap-2">
        <router-link
          v-for="(item, index) in menuItems"
          :key="item.id"
          :to="item.path"
          custom
          v-slot="{ navigate, isActive }"
        >
          <div
            class="menu-item flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group relative overflow-hidden animate-fade-in-up"
            :class="{ 
              'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg': isActive,
              'hover:bg-white/80 hover:shadow-md text-[#0d131c]': !isActive
            }"
            :style="`animation-delay: ${0.1 * index}s;`"
            @click="navigate"
          >
            <!-- 激活状态的背景动画 -->
            <div 
              v-if="isActive"
              class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            
            <!-- 图标 -->
            <div class="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Icon 
                :name="item.icon" 
                size="20" 
                :color="isActive ? '#ffffff' : '#0d131c'" 
                class="transition-colors duration-300"
              />
            </div>
            
            <!-- 文字 -->
            <p class="text-sm font-medium leading-normal relative z-10 transition-colors duration-300">
              {{ item.label }}
            </p>
            
            <!-- 右侧指示器 -->
            <div 
              v-if="isActive"
              class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse relative z-10"
            ></div>
            
            <!-- 菜单项数量徽章 (如果有) -->
            <div 
              v-if="item.badge"
              class="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce relative z-10"
            >
              {{ item.badge }}
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 底部区域 -->
    <div class="flex flex-col gap-2 animate-fade-in-up" style="animation-delay: 0.5s;">
      <!-- 帮助项 -->
      <div class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/80 rounded-xl transition-all duration-300 hover:shadow-md group text-[#0d131c]">
        <div class="transition-transform duration-300 group-hover:scale-110">
          <Icon name="question" size="20" color="#0d131c" />
        </div>
        <p class="text-sm font-medium leading-normal">帮助和文档</p>
      </div>
      
      <!-- 用户状态 -->
      <div class="flex items-center gap-3 px-4 py-3 bg-white/60 rounded-xl backdrop-blur-sm">
        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <p class="text-xs text-[#49699c]">在线状态</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../base/Icon.vue'
import type { MenuItem, User } from '../../types'

interface Props {
  menuItems: MenuItem[]
  user: User
  appName?: string
}

withDefaults(defineProps<Props>(), {
  appName: 'EduAssist'
})
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.menu-item {
  position: relative;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  transform: translateY(-50%);
  transition: width 0.3s ease;
  border-radius: 0.75rem;
}

.menu-item:hover::before {
  width: 4px;
}

.menu-item.router-link-active::before {
  width: 4px;
  background: linear-gradient(135deg, #ffffff, #ffffff);
}
</style> 