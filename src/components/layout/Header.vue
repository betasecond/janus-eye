<template>
  <header class="flex items-center justify-between whitespace-nowrap px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 sticky top-4 z-50">
    <!-- 左侧区域 -->
    <div class="flex items-center gap-4">
      <img
        :src="user.avatar"
        alt="User Avatar"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-white/80 shadow-md cursor-pointer hover:scale-110 transition-transform duration-300"
        @click="handleUserClick"
      />
      <div class="font-semibold text-gray-800">{{ currentCourse }}</div>
    </div>

    <!-- 中间区域 -->
    <div class="flex-1 flex justify-center px-8">
      <div class="w-full max-w-md relative">
         <Icon name="search" size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          v-model="searchValue"
          placeholder="Search for students, assignments, etc..."
          class="w-full h-11 px-4 pl-11 rounded-xl bg-gray-100 border-2 border-transparent focus:bg-white focus:border-blue-300 focus:ring-0 outline-none transition-all duration-300"
          @input="handleSearch"
        />
      </div>
    </div>

    <!-- 右侧功能区域 -->
    <div class="flex items-center gap-4">
      <button
        @click="toggleNotifications"
        class="relative p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <Icon name="bell" size="20" class="text-gray-600" />
        <div 
          v-if="unreadCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md animate-bounce"
        >
          {{ unreadCount > 9 ? '9+' : unreadCount }}
        </div>
      </button>

      <button
        class="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <Icon name="listBullets" size="20" class="text-gray-600" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '../base/Icon.vue'
import type { User } from '../../types'

interface Props {
  user: User
  unreadCount?: number
  currentCourse?: string
}

interface Emits {
  (e: 'search', value: string): void
  (e: 'toggle-notifications'): void
  (e: 'user-click'): void
}

withDefaults(defineProps<Props>(), {
  unreadCount: 0,
  currentCourse: "Ms. Zhang - Computer Science"
})

const emit = defineEmits<Emits>()

const searchValue = ref('')

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