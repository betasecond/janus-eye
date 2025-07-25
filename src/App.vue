<template>
  <div 
    class="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" 
    style='font-family: "Inter", "Noto Sans", sans-serif;'
  >
    <ToastNotifications />
    <template v-if="currentUser">
      <div class="flex h-full grow">
        <!-- 侧边栏 -->
        <aside class="layout-sidebar w-72 flex-shrink-0 p-4 animate-slide-in-left z-20">
          <Sidebar
            :menu-items="currentMenuItems"
            app-name="EduAssist"
            class="sticky top-4"
          />
        </aside>

        <!-- 主内容区域 -->
        <div class="flex-1 flex flex-col min-w-0 pr-4 pb-4 pt-4 relative">
           <main class="flex-1 flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100">
             <!-- 顶部导航 -->
              <Header
                :user="currentUser"
                :unread-count="unreadNotificationCount"
                :current-course="t('common.welcome') + ', ' + currentUser.name"
                @search="handleSearch"
                @toggle-notifications="toggleNotifications"
                @user-click="handleUserClick"
                @logout="handleLogout"
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
           <!-- 通知面板 -->
          <transition name="slide-fade">
            <div
              v-if="showNotificationPanel"
              class="fixed inset-0 bg-black bg-opacity-50 z-10"
              @click="closeNotificationPanel"
            >
              <div
                class="absolute top-0 right-0 w-96 h-full bg-white shadow-2xl overflow-y-auto border-l border-gray-200"
                @click.stop
              >
                <h3 class="p-4 text-lg font-bold border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
                  {{ t('common.notifications') }}
                </h3>
                <NotificationList
                  :notifications="notifications"
                  @notification-click="handleNotificationClick"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
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
import { useI18n } from 'vue-i18n'
import Sidebar from './components/layout/Sidebar.vue'
import Header from './components/layout/Header.vue'
import NotificationList from './components/base/NotificationList.vue'
import ToastNotifications from './components/base/ToastNotifications.vue'
import { currentUser, addNotification } from '@/store'
import { LOCAL_STORAGE_USER_KEY } from '@/constants'
import {
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems,
  mockNotifications
} from './data/mockData'
import type { Notification, MenuItem } from './types'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const notifications = ref<Notification[]>([])
const showNotificationPanel = ref(false)

onMounted(() => {
  // 检查是否有已保存的用户信息
  const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser)
      currentUser.value = parsedUser
      notifications.value = mockNotifications
      
      // 只有在用户已登录且当前在登录页面时才跳转
      if ((route.path === '/login' || route.path === '/') && currentUser.value) {
        switch (currentUser.value.role) {
          case 'teacher':
            router.push('/dashboard'); // Assuming teacher dashboard path
            break;
          case 'admin':
            router.push('/admin/users'); // Assuming admin dashboard path
            break;
          default: // 'student' or any other role
            router.push('/home');
        }
      }
    } catch (error) {
      console.error('Failed to parse saved user:', error)
      // 如果解析失败，清除无效数据
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
      currentUser.value = null
    }
  }
  
  // 从localStorage获取语言设置
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && ['zh-CN', 'en-US'].includes(savedLocale)) {
    locale.value = savedLocale
  }
})

const currentMenuItems = computed((): MenuItem[] => {
  if (!currentUser.value) return []
  switch (currentUser.value.role) {
    case 'teacher':
      return teacherMenuItems.map(item => ({
        ...item,
        label: t(`menu.${item.id}`) || item.label
      }))
    case 'student':
      return studentMenuItems.map(item => ({
        ...item,
        label: t(`menu.${item.id}`) || item.label
      }))
    case 'admin':
      return adminMenuItems.map(item => ({
        ...item,
        label: t(`menu.${item.id}`) || item.label
      }))
    default:
      return []
  }
})

const unreadNotificationCount = computed(() => {
  return notifications.value.filter(n => !n.isRead).length
})

const handleSearch = (searchValue: string) => {
  console.log('搜索:', searchValue)
  addNotification({ title: t('common.notifications'), content: `${t('common.searchPlaceholder')}: ${searchValue}`, type: 'info'})
}

const toggleNotifications = () => {
  showNotificationPanel.value = !showNotificationPanel.value
}

const closeNotificationPanel = () => {
  showNotificationPanel.value = false
}

const handleUserClick = () => {
  // 个人中心导航
  router.push('/profile');
}

const handleLogout = () => {
  // 清除用户信息
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
  currentUser.value = null
  notifications.value = []
  
  // 跳转到登录页面
  router.push('/login')
  
  addNotification({ title: t('common.logout'), content: t('common.logoutSuccess'), type: 'success'})
}

const handleNavigate = (path: string) => {
  router.push(path)
}

const handleNotificationClick = (notification: Notification) => {
  const index = notifications.value.findIndex(n => n.id === notification.id)
  if (index !== -1 && !notifications.value[index].isRead) {
    notifications.value[index].isRead = true
    addNotification({ title: t('common.notifications'), content: `"${notification.title}" ${t('common.markAsRead')}`, type: 'success'})
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
