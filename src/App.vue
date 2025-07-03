<template>
  <div 
    class="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" 
    style='font-family: "Inter", "Noto Sans", sans-serif;'
  >
    <ToastNotifications />
    <template v-if="currentUser">
      <div class="flex h-full grow">
        <!-- 侧边栏 -->
        <aside class="layout-sidebar w-72 flex-shrink-0 p-4 animate-slide-in-left">
          <Sidebar
            :menu-items="currentMenuItems"
            app-name="EduAssist"
            class="sticky top-4"
          />
        </aside>

        <!-- 主内容区域 -->
        <div class="flex-1 flex flex-col min-w-0 pr-4 pb-4 pt-4">
           <main class="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100">
             <!-- 顶部导航 -->
              <Header
                :user="currentUser"
                :unread-count="unreadNotificationCount"
                @search="handleSearch"
                @toggle-notifications="toggleNotifications"
                @user-click="handleUserClick"
                class="flex-shrink-0"
              />

              <!-- 页面内容 -->
              <div class="flex-1 overflow-y-auto">
                <router-view v-slot="{ Component }">
                  <transition name="fade-transform" mode="out-in">
                    <component 
                      :is="Component"
                      :user="currentUser"
                      :notifications="notifications"
                      @navigate="handleNavigate"
                      @notification-click="handleNotificationClick"
                    />
                  </transition>
                </router-view>
              </div>
          </main>
        </div>
      </div>
      
      <!-- 通知面板 -->
      <transition name="slide-fade">
        <div
          v-if="showNotificationPanel"
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          @click="closeNotificationPanel"
        >
          <div
            class="w-96 h-full bg-white shadow-2xl overflow-y-auto border-l border-gray-200"
            @click.stop
          >
            <h3 class="p-4 text-lg font-bold border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
              通知中心
            </h3>
            <NotificationList
              :notifications="notifications"
              @notification-click="handleNotificationClick"
            />
          </div>
        </div>
      </transition>
    </template>
    
    <!-- 加载状态或登录页面 -->
    <div v-else class="flex flex-1 items-center justify-center">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'
import NotificationList from './components/base/NotificationList.vue'
import ToastNotifications from './components/base/ToastNotifications.vue'
import { currentUser, addNotification } from '@/store'
import {
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems,
  mockNotifications
} from './data/mockData'
import type { Notification, MenuItem } from './types'

const route = useRoute()
const router = useRouter()

const notifications = ref<Notification[]>([])
const showNotificationPanel = ref(false)

onMounted(() => {
  setTimeout(() => {
    const fetchedUser = {
      id: '1',
      name: '张老师',
      email: 'zhang.teacher@example.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face',
      role: 'teacher' as const,
    };
    currentUser.value = fetchedUser
    notifications.value = mockNotifications
    
    if (route.path === '/login' || route.path === '/') {
        router.push('/home')
    }
  }, 500)
})

const currentMenuItems = computed((): MenuItem[] => {
  if (!currentUser.value) return []
  switch (currentUser.value.role) {
    case 'teacher':
      return teacherMenuItems
    case 'student':
      return studentMenuItems
    case 'admin':
      return adminMenuItems
    default:
      return []
  }
})

const unreadNotificationCount = computed(() => {
  return notifications.value.filter(n => !n.isRead).length
})

const handleSearch = (searchValue: string) => {
  console.log('搜索:', searchValue)
  addNotification({ title: '搜索提示', content: `正在搜索: ${searchValue}`, type: 'info'})
}

const toggleNotifications = () => {
  showNotificationPanel.value = !showNotificationPanel.value
}

const closeNotificationPanel = () => {
  showNotificationPanel.value = false
}

const handleUserClick = () => {
  addNotification({ title: '功能开发中', content: '个人中心页面正在加速开发中, 敬请期待！', type: 'info'})
}

const handleNavigate = (path: string) => {
  router.push(path)
}

const handleNotificationClick = (notification: Notification) => {
  const index = notifications.value.findIndex(n => n.id === notification.id)
  if (index !== -1 && !notifications.value[index].isRead) {
    notifications.value[index].isRead = true
    addNotification({ title: '通知已读', content: `"${notification.title}" 已标记为已读`, type: 'success'})
  }
  showNotificationPanel.value = false
  console.log('通知点击:', notification)
}

watch(showNotificationPanel, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out;
}
</style>
