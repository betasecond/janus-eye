<template>
  <div class="relative flex size-full min-h-screen flex-col bg-[#f8f9fc] group/design-root overflow-x-hidden" style='font-family: Lexend, "Noto Sans", sans-serif;'>
    <ToastNotifications />
    <div class="layout-container flex h-full grow flex-col">
      <!-- 主布局：侧边栏 + 内容区域 -->
      <div class="gap-1 px-6 flex flex-1 justify-center py-5">
        <!-- 侧边栏 -->
        <div class="layout-content-container flex flex-col w-80">
          <Sidebar
            :menu-items="currentMenuItems"
            :user="currentUser"
            app-name="EduAssist"
          />
        </div>

        <!-- 主内容区域 -->
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
          <!-- 顶部导航 -->
          <Header
            :title="currentTitle"
            :user="currentUser"
            :show-search="true"
            :show-notifications="true"
            :unread-count="unreadNotificationCount"
            @search="handleSearch"
            @toggle-notifications="toggleNotifications"
            @user-click="handleUserClick"
          />

          <!-- 页面内容 -->
          <router-view
            :user="currentUser"
            :notifications="notifications"
            @navigate="handleNavigate"
            @notification-click="handleNotificationClick"
          />
        </div>
      </div>

      <!-- 通知面板 -->
      <div
        v-if="showNotificationPanel"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
        @click="closeNotificationPanel"
      >
        <div
          class="w-96 h-full bg-white shadow-lg overflow-y-auto"
          @click.stop
        >
          <NotificationList
            :notifications="notifications"
            @notification-click="handleNotificationClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'
import NotificationList from './components/base/NotificationList.vue'
import ToastNotifications from './components/base/ToastNotifications.vue'
import { currentUser } from '@/store'

// 导入模拟数据
import {
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems,
  mockNotifications
} from './data/mockData'
import type { Notification } from './types'

const route = useRoute();

// 响应式数据
const notifications = ref(mockNotifications)
const showNotificationPanel = ref(false)

// 计算属性
const currentMenuItems = computed(() => {
  switch (currentUser.value.role) {
    case 'teacher':
      return teacherMenuItems;
    case 'student':
      return studentMenuItems;
    case 'admin':
      return adminMenuItems;
    default:
      return [];
  }
})

const currentTitle = computed(() => {
  return route.name as string || 'EduAssist';
})

const unreadNotificationCount = computed(() => {
  return notifications.value.filter(n => !n.isRead).length
})

// 事件处理函数
const handleSearch = (searchValue: string) => {
  console.log('搜索:', searchValue)
  // 实现搜索逻辑
}

const toggleNotifications = () => {
  showNotificationPanel.value = !showNotificationPanel.value
}

const closeNotificationPanel = () => {
  showNotificationPanel.value = false
}

const handleUserClick = () => {
  console.log('用户点击')
  // 显示用户菜单或导航到个人中心
}

const handleNavigate = (path: string) => {
  console.log('导航到:', path)
  // 实现页面导航逻辑
}

const handleNotificationClick = (notification: Notification) => {
  // 标记通知为已读
  const index = notifications.value.findIndex(n => n.id === notification.id)
  if (index !== -1) {
    notifications.value[index].isRead = true
  }
  
  // 关闭通知面板
  showNotificationPanel.value = false
  
  console.log('通知点击:', notification)
  // 处理通知点击逻辑，如导航到相关页面
}
</script>

<style scoped>
/* 确保字体加载 */
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap');
</style>
