<template>
  <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ecf4] px-10 py-3 bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 hover:shadow-lg">
    <!-- 左侧标题区域 -->
    <div class="flex items-center gap-4 text-[#0d131c] animate-fade-in-left">
      <div class="size-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">
        <!-- 品牌图标 -->
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-colors duration-300">
          <path
            d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
            fill="currentColor"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <h2 class="text-[#0d131c] text-lg font-bold leading-tight tracking-[-0.015em] transition-colors duration-300 hover:text-blue-600">{{ title }}</h2>
    </div>

    <!-- 右侧功能区域 -->
    <div class="flex flex-1 justify-end gap-8 animate-fade-in-right">
      <!-- 搜索框 -->
      <label v-if="showSearch" class="flex flex-col min-w-40 !h-10 max-w-64 group">
        <div class="flex w-full flex-1 items-stretch rounded-xl h-full transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-blue-200 group-focus-within:scale-105">
          <div
            class="text-[#49699c] flex border-none bg-[#e7ecf4] items-center justify-center pl-4 rounded-l-xl border-r-0 transition-all duration-300 group-focus-within:bg-white group-focus-within:text-blue-500"
          >
            <Icon name="search" size="24" :color="searchFocused ? '#3b82f6' : '#49699c'" class="transition-colors duration-300" />
          </div>
          <input
            v-model="searchValue"
            placeholder="搜索"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d131c] focus:outline-0 focus:ring-0 border-none bg-[#e7ecf4] focus:border-none h-full placeholder:text-[#49699c] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal transition-all duration-300 focus:bg-white focus:shadow-md"
            @input="handleSearch"
            @focus="searchFocused = true"
            @blur="searchFocused = false"
          />
        </div>
      </label>

      <!-- 通知按钮 -->
      <button
        v-if="showNotifications"
        class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7ecf4] text-[#0d131c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 relative transition-all duration-300 hover:bg-[#d4dae5] hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
        @click="toggleNotifications"
      >
        <Icon name="bell" size="20" color="#0d131c" class="transition-transform duration-300 hover:animate-pulse" />
        <div 
          v-if="unreadCount > 0"
          class="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce shadow-lg"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </div>
      </button>

      <!-- 用户头像 -->
      <div class="relative group">
        <div
          class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer ring-2 ring-transparent hover:ring-blue-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
          :style="`background-image: url('${user.avatar}')`"
          @click="handleUserClick"
        />
        
        <!-- 用户状态指示器 -->
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-md"></div>
        
        <!-- 用户菜单下拉框 (可选) -->
        <div 
          v-if="showUserMenu"
          class="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 transform-gpu"
        >
          <div class="px-4 py-2 border-b border-gray-100">
            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">个人资料</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">设置</a>
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">帮助</a>
          <hr class="my-1">
          <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200">退出登录</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../base/Icon.vue'
import type { User } from '../../types'

interface Props {
  title: string
  user: User
  showSearch?: boolean
  showNotifications?: boolean
  showUserMenu?: boolean
  unreadCount?: number
}

interface Emits {
  (e: 'search', value: string): void
  (e: 'toggle-notifications'): void
  (e: 'user-click'): void
}

const props = withDefaults(defineProps<Props>(), {
  showSearch: true,
  showNotifications: true,
  showUserMenu: false,
  unreadCount: 0
})

const emit = defineEmits<Emits>()

const searchValue = ref('')
const searchFocused = ref(false)

const handleSearch = () => {
  emit('search', searchValue.value)
}

const toggleNotifications = () => {
  emit('toggle-notifications')
}

const handleUserClick = () => {
  emit('user-click')
}
</script>

<style scoped>
@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-left {
  animation: fade-in-left 0.6s ease-out;
}

.animate-fade-in-right {
  animation: fade-in-right 0.6s ease-out;
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

.animate-bounce {
  animation: bounce 2s infinite;
}
</style> 