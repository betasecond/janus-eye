<template>
  <div 
    class="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-gray-50 to-blue-50 group/design-root overflow-x-hidden" 
    style='font-family: Lexend, "Noto Sans", sans-serif;'
  >
    <ToastNotifications />
    <template v-if="currentUser">
      <div class="layout-container flex h-full grow flex-col">
        <!-- 主布局：侧边栏 + 内容区域 -->
        <div class="flex flex-1 p-4 gap-4">
          <!-- 侧边栏 -->
          <aside class="layout-sidebar w-72 flex-shrink-0 animate-slide-in-left">
            <Sidebar
              :menu-items="currentMenuItems"
              :user="currentUser"
              app-name="EduAssist"
              class="sticky top-4"
            />
          </aside>

          <!-- 主内容区域 -->
          <main class="flex-1 flex flex-col min-w-0">
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
              class="animate-fade-in-down"
            />

            <!-- 页面内容 -->
            <div class="flex-1 mt-4">
              <router-view
                v-slot="{ Component }"
                :user="currentUser"
                :notifications="notifications"
                @navigate="handleNavigate"
                @notification-click="handleNotificationClick"
              >
                <transition name="fade-transform" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </main>
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
      </div>
    </template>
    
    <!-- 加载状态或登录页面 -->
    <div v-else class="flex flex-1 items-center justify-center">
      <!-- 这里可以放置一个全局加载动画，或者直接由路由守卫处理跳转到登录页 -->
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

// 导入模拟数据
import {
  teacherMenuItems,
  studentMenuItems,
  adminMenuItems,
  mockNotifications
} from './data/mockData'
import type { Notification, MenuItem } from './types'

const route = useRoute()
const router = useRouter()

// 响应式数据
const notifications = ref<Notification[]>([])
const showNotificationPanel = ref(false)

// 模拟获取当前用户
onMounted(() => {
  // 模拟异步获取用户信息
  setTimeout(() => {
    // 假设这是从API获取的用户信息
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
    
    addNotification({
      title: '登录成功',
      content: `欢迎回来, ${fetchedUser.name}`,
      type: 'success'
    })

  }, 500)
})

// 计算属性
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

const currentTitle = computed(() => {
  if (route.meta.title) {
    return route.meta.title as string
  }
  const matched = route.matched.find(r => r.name)
  return (matched?.name as string) || 'EduAssist'
})


const unreadNotificationCount = computed(() => {
  return notifications.value.filter(n => !n.isRead).length
})

// 事件处理函数
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
  console.log('用户点击')
  // 显示用户菜单或导航到个人中心
  addNotification({ title: '功能开发中', content: '个人中心页面正在加速开发中, 敬请期待！', type: 'info'})

}

const handleNavigate = (path: string) => {
  router.push(path)
}

const handleNotificationClick = (notification: Notification) => {
  // 标记通知为已读
  const index = notifications.value.findIndex(n => n.id === notification.id)
  if (index !== -1 && !notifications.value[index].isRead) {
    notifications.value[index].isRead = true
    addNotification({ title: '通知已读', content: `"${notification.title}" 已标记为已读`, type: 'success'})
  }
  
  // 关闭通知面板
  showNotificationPanel.value = false
  
  console.log('通知点击:', notification)
  // 处理通知点击逻辑，如导航到相关页面
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
/* 确保字体加载 */
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;700;900&family=Noto+Sans:wght@400;500;700;900&display=swap');

/* 页面切换动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .4s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 通知面板动画 */
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

/* 入场动画 */
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

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out;
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out;
}
</style>
