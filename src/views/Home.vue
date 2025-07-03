<template>
  <div class="home-grid p-4 animate-fade-in">
    <!-- 欢迎卡片 -->
    <div 
      class="welcome-card col-span-2 row-span-1 rounded-2xl p-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl flex flex-col justify-between transform-gpu hover:scale-[1.03] transition-transform duration-300 animate-slide-in-up"
    >
      <div>
        <h2 class="text-3xl font-bold tracking-tight">
          欢迎回来, {{ user.name }}
        </h2>
        <p class="mt-2 text-blue-100 max-w-md">
          今天又是充满活力的一天！让我们看看今天的教学任务吧。
        </p>
      </div>
      <div class="mt-6 flex items-center gap-4">
        <div class="flex items-center -space-x-2">
          <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1554151228-14d9def656e4?w=50&h=50&fit=crop" alt="">
          <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=50&h=50&fit=crop" alt="">
          <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop" alt="">
        </div>
        <span class="text-sm font-medium text-blue-200">+12位学生在线</span>
      </div>
    </div>

    <!-- 任务卡片 -->
    <div class="task-card-1 animate-slide-in-up" style="animation-delay: 0.1s;">
      <Card
        title="3个课程计划已生成"
        subtitle="今日课程准备任务"
        description="查看和管理今天课程的教学计划。"
        button-text="查看"
        icon="book"
        :image="'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'"
        @button-click="handleLessonPrepClick"
      />
    </div>
    
    <div class="task-card-2 animate-slide-in-up" style="animation-delay: 0.2s;">
      <Card
        title="5名学生等待批改"
        subtitle="待批改作业"
        description="为你的课程审查和批改学生作业。"
        button-text="去批改"
        icon="file"
        :image="'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop'"
        @button-click="handleGradingClick"
      />
    </div>
    
    <!-- 快速操作 -->
    <div class="quick-actions col-span-2 rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-100 shadow-lg animate-slide-in-up" style="animation-delay: 0.3s;">
      <h3 class="text-[#0d131c] text-lg font-bold leading-tight mb-4">快速操作</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="action in quickActions"
          :key="action.id"
          class="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-200/80 hover:bg-white hover:border-blue-300 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
          @click="handleQuickAction(action)"
        >
          <div class="p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
            <Icon :name="action.icon" size="24" class="text-blue-600" />
          </div>
          <span class="mt-3 text-sm font-medium text-[#0d131c] text-center">{{ action.label }}</span>
        </div>
      </div>
    </div>
    
    <!-- 公告 -->
    <div class="announcements col-span-1 animate-slide-in-up" style="animation-delay: 0.4s;">
       <Card
          title="期末考试安排已发布"
          subtitle="最新公告"
          description="查看学校最新发布的重要通知和公告。"
          button-text="查看详情"
          icon="bell"
          :image="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'"
          @button-click="handleAnnouncementClick"
        />
    </div>

    <!-- 通知列表 -->
    <div class="notifications col-span-2 rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-100 shadow-lg animate-slide-in-up" style="animation-delay: 0.5s;">
       <h3 class="text-[#0d131c] text-lg font-bold leading-tight mb-4">通知中心</h3>
      <NotificationList
        :notifications="notifications"
        @notification-click="handleNotificationClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/base/Card.vue'
import Icon from '../components/base/Icon.vue'
import NotificationList from '../components/base/NotificationList.vue'
import type { User, Notification, MenuItem } from '../types'
import { addNotification } from '@/store'

interface Props {
  user: User
  notifications: Notification[]
}

interface QuickAction {
  id: string
  label: string
  icon: string
  path: string
}

const props = defineProps<Props>()
const router = useRouter()

const emit = defineEmits<{
  'notification-click': [notification: Notification]
  'navigate': [path: string]
}>()

const quickActions = computed<QuickAction[]>(() => {
  if (props.user.role === 'teacher') {
    return [
      { id: '1', label: '课程准备', icon: 'book', path: '/syllabus' },
      { id: '2', label: '题目管理', icon: 'magicWand', path: '/question' },
      { id: '3', label: '学情分析', icon: 'chart', path: '/overview' },
      { id: '4', label: '用户管理', icon: 'user', path: '/admin/users' }
    ]
  } else {
    return [
      { id: '1', label: '我的作业', icon: 'book', path: '/assignments' },
      { id: '2', label: '练习中心', icon: 'file', path: '/practice' },
      { id: '3', label: '学习进度', icon: 'chart', path: '/home' },
      { id: '4', label: '资源库', icon: 'bookmark', path: '/home' }
    ]
  }
})

const handleLessonPrepClick = () => {
  router.push('/syllabus')
}

const handleGradingClick = () => {
  router.push('/question')
}

const handleAnnouncementClick = () => {
  addNotification({ title: '提示', content: '公告详情页面暂未实现', type: 'info' })
  router.push('/home')
}

const handleQuickAction = (action: QuickAction) => {
  router.push(action.path)
}

const handleNotificationClick = (notification: Notification) => {
  emit('notification-click', notification)
}
</script>

<style scoped>
.home-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 1.5rem; /* 24px */
}

.welcome-card {
  grid-column: 1 / 3;
}
.task-card-1 {
  grid-column: 1 / 2;
}
.task-card-2 {
  grid-column: 2 / 3;
}
.quick-actions {
  grid-column: 1 / 3;
}
.announcements {
  grid-column: 1 / 2;
}
.notifications {
  grid-column: 2 / 3;
}


@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out forwards;
  animation-fill-mode: both;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .home-grid {
    grid-template-columns: 1fr;
  }
  .welcome-card,
  .task-card-1,
  .task-card-2,
  .quick-actions,
  .announcements,
  .notifications {
    grid-column: 1 / 2;
  }
}
</style> 