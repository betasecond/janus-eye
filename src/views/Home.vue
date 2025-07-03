<template>
  <div class="p-4 md:p-6 lg:p-8 animate-fade-in space-y-8">
    <!-- Welcome Header -->
    <header>
      <h1 class="text-4xl font-bold text-gray-800 tracking-tight">
        Welcome back, {{ user.name }}
      </h1>
    </header>

    <!-- Task List -->
    <main class="space-y-6">
      <!-- Lesson Prep Task -->
      <div class="task-item grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-slide-in-up" style="animation-delay: 0.1s;">
        <div class="md:col-span-2">
          <p class="text-sm font-medium text-gray-500">Today's Lesson Prep Tasks</p>
          <h2 class="mt-1 text-2xl font-bold text-gray-800">3 lesson plans generated</h2>
          <p class="mt-2 text-gray-600">View and manage your generated lesson plans for today's classes.</p>
          <button @click="handleLessonPrepClick" class="mt-4 action-button">
            View
          </button>
        </div>
        <div class="w-full h-48 rounded-2xl bg-cover bg-center overflow-hidden shadow-lg transform-gpu hover:scale-105 transition-transform duration-300" 
             style="background-image: url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop')">
        </div>
      </div>
      <hr class="border-gray-200/80">

      <!-- Grading Task -->
      <div class="task-item grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-slide-in-up" style="animation-delay: 0.2s;">
        <div class="md:col-span-2">
          <p class="text-sm font-medium text-gray-500">Pending Assignments</p>
          <h2 class="mt-1 text-2xl font-bold text-gray-800">5 students awaiting grading</h2>
          <p class="mt-2 text-gray-600">Review and grade student submissions for your courses.</p>
          <button @click="handleGradingClick" class="mt-4 action-button">
            Grade
          </button>
        </div>
        <div class="w-full h-48 rounded-2xl bg-cover bg-center overflow-hidden shadow-lg transform-gpu hover:scale-105 transition-transform duration-300" 
             style="background-image: url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=200&fit=crop')">
        </div>
      </div>
      <hr class="border-gray-200/80">

      <!-- Announcements -->
      <div class="task-item grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-slide-in-up" style="animation-delay: 0.3s;">
        <div class="md:col-span-2">
          <p class="text-sm font-medium text-gray-500">Latest Announcement</p>
          <h2 class="mt-1 text-2xl font-bold text-gray-800">Final exam schedule released</h2>
          <p class="mt-2 text-gray-600">Check the important notices and announcements from the school.</p>
          <button @click="handleAnnouncementClick" class="mt-4 action-button">
            View Details
          </button>
        </div>
        <div class="w-full h-48 rounded-2xl bg-cover bg-center overflow-hidden shadow-lg transform-gpu hover:scale-105 transition-transform duration-300" 
             style="background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop')">
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { User } from '../types'
import { addNotification } from '@/store'

interface Props {
  user: User
}

defineProps<Props>()
const router = useRouter()

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
</script>

<style scoped>
.action-button {
  @apply px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95;
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
  opacity: 0;
  animation: slide-in-up 0.6s ease-out forwards;
  animation-fill-mode: both;
}
</style> 