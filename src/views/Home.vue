<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
    <!-- 欢迎标题 -->
    <h2 class="text-[#0d131c] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
      欢迎回来，{{ user.name }}
    </h2>

    <!-- 任务卡片列表 -->
    <div class="flex flex-col gap-4">
      <!-- 今日课程准备任务 -->
      <div class="p-4">
        <Card
          title="3个课程计划已生成"
          subtitle="今日课程准备任务"
          description="查看和管理今天课程的教学计划。"
          button-text="查看"
          :image="'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop'"
          @button-click="handleLessonPrepClick"
        />
      </div>

      <!-- 待批改作业 -->
      <div class="p-4">
        <Card
          title="5名学生等待批改"
          subtitle="待批改作业"
          description="为你的课程审查和批改学生作业。"
          button-text="批改"
          :image="'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop'"
          @button-click="handleGradingClick"
        />
      </div>

      <!-- 最新公告 -->
      <div class="p-4">
        <Card
          title="期末考试安排已发布"
          subtitle="最新公告"
          description="查看学校最新发布的重要通知和公告。"
          button-text="查看详情"
          :image="'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop'"
          @button-click="handleAnnouncementClick"
        />
      </div>

      <!-- 快速操作 -->
      <div class="p-4">
        <h3 class="text-[#0d131c] text-lg font-bold leading-tight mb-4">快速操作</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="action in quickActions"
            :key="action.id"
            class="flex flex-col items-center p-4 bg-[#f8f9fc] rounded-lg border border-[#e7ecf4] hover:bg-[#e7ecf4] transition-colors cursor-pointer"
            @click="handleQuickAction(action)"
          >
            <Icon :name="action.icon" size="32" color="#2071f3" />
            <span class="mt-2 text-sm font-medium text-[#0d131c] text-center">{{ action.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 通知列表 -->
    <NotificationList
      :notifications="notifications"
      @notification-click="handleNotificationClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Card from '../components/base/Card.vue'
import Icon from '../components/base/Icon.vue'
import NotificationList from '../components/base/NotificationList.vue'
import type { User, Notification } from '../types'

interface Props {
  user: User
  notifications: Notification[]
}

interface QuickAction {
  id: string
  label: string
  icon: string
  action: string
}

const props = defineProps<Props>()
const router = useRouter()

const emit = defineEmits<{
  'notification-click': [notification: Notification]
}>()

const quickActions = computed<QuickAction[]>(() => {
  if (props.user.role === 'teacher') {
    return [
      { id: '1', label: '课程准备', icon: 'book', action: '/syllabus' },
      { id: '2', label: '题目管理', icon: 'magicWand', action: '/question' },
      { id: '3', label: '学情分析', icon: 'chart', action: '/overview' },
      { id: '4', label: '用户管理', icon: 'users', action: '/admin/users' }
    ]
  } else {
    return [
      { id: '1', label: '我的作业', icon: 'book', action: '/assignments' },
      { id: '2', label: '练习中心', icon: 'file', action: '/practice' },
      { id: '3', label: '学习进度', icon: 'chart', action: '/home' }, // Placeholder
      { id: '4.ts', label: '资源库', icon: 'bookmark', action: '/home' } // Placeholder
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
  // We can decide where this goes later
  router.push('/home')
}

const handleQuickAction = (action: QuickAction) => {
  router.push(action.action)
}

const handleNotificationClick = (notification: Notification) => {
  emit('notification-click', notification)
}
</script> 