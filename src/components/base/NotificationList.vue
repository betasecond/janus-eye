<template>
  <div class="flex flex-col">
    <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      通知
    </h2>
    
    <div v-if="notifications.length === 0" class="px-4 py-8 text-center">
      <p class="text-[#49699c] text-sm">暂无通知</p>
    </div>
    
    <div v-else>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="flex items-center gap-4 bg-[#f8f9fc] px-4 min-h-[72px] py-2 hover:bg-[#e7ecf4] transition-colors cursor-pointer"
        :class="{ 'bg-blue-50': !notification.isRead }"
        @click="handleNotificationClick(notification)"
      >
        <!-- 头像或图标 -->
        <div
          v-if="notification.avatar"
          class="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-fit"
          :style="`background-image: url('${notification.avatar}')`"
        />
        <div
          v-else
          class="text-[#0d131c] flex items-center justify-center rounded-lg bg-[#e7ecf4] shrink-0 size-12"
        >
          <Icon :name="getNotificationIcon(notification.type)" size="24" color="#0d131c" />
        </div>

        <!-- 通知内容 -->
        <div class="flex flex-col justify-center flex-1">
          <p class="text-[#0d131c] text-base font-medium leading-normal line-clamp-1">
            {{ notification.title }}
          </p>
          <p class="text-[#49699c] text-sm font-normal leading-normal line-clamp-2">
            {{ notification.content }}
          </p>
          <p class="text-[#49699c] text-xs font-normal leading-normal mt-1">
            {{ formatDate(notification.createdAt) }}
          </p>
        </div>

        <!-- 未读标识 -->
        <div
          v-if="!notification.isRead"
          class="w-2 h-2 bg-blue-500 rounded-full shrink-0"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'
import type { Notification } from '../../types'

interface Props {
  notifications: Notification[]
}

interface Emits {
  (e: 'notification-click', notification: Notification): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const getNotificationIcon = (type: string) => {
  const iconMap: Record<string, string> = {
    info: 'file',
    warning: 'calendar',
    success: 'file',
    error: 'question'
  }
  return iconMap[type] || 'file'
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) {
    return '今天'
  } else if (diffDays === 2) {
    return '昨天'
  } else if (diffDays <= 7) {
    return `${diffDays} 天前`
  } else {
    return date.toLocaleDateString('zh-CN')
  }
}

const handleNotificationClick = (notification: Notification) => {
  emit('notification-click', notification)
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 