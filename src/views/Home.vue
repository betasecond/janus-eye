<template>
  <div v-if="user" class="p-4 md:p-6 lg:p-8 animate-fade-in space-y-8">
    <!-- Welcome Header -->
    <header>
      <h1 class="text-4xl font-bold text-gray-800 tracking-tight">
        {{ t('common.welcome') }}, {{ user.name }}
      </h1>
    </header>

    <!-- Task List -->
    <main class="space-y-6">
      <!-- Lesson Prep Task -->
      <div class="task-item grid grid-cols-1 md:grid-cols-3 gap-6 items-center animate-slide-in-up" style="animation-delay: 0.1s;">
        <div class="md:col-span-2">
          <p class="text-sm font-medium text-gray-500">{{ t('home.lessonPrepTasks') }}</p>
          <h2 class="mt-1 text-2xl font-bold text-gray-800">3 {{ t('home.lessonPlansGenerated') }}</h2>
          <p class="mt-2 text-gray-600">{{ t('dashboard.completeAssignment') }}</p>
          <button @click="handleLessonPrepClick" class="mt-4 action-button">
            {{ t('home.view') }}
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
          <p class="text-sm font-medium text-gray-500">{{ t('home.pendingAssignments') }}</p>
          <h2 class="mt-1 text-2xl font-bold text-gray-800">5 {{ t('home.studentsAwaitingGrading') }}</h2>
          <p class="mt-2 text-gray-600">{{ t('dashboard.completedDailyGoals') }}</p>
          <button @click="handleGradingClick" class="mt-4 action-button">
            {{ t('home.grade') }}
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
          <p class="text-sm font-medium text-gray-500">{{ t('home.latestAnnouncement') }}</p>
          <h2 class="mt-1 text-2xl font-bold text-gray-800">{{ t('home.finalExamSchedule') }}</h2>
          <p class="mt-2 text-gray-600">{{ t('dashboard.exploreResources') }}</p>
          <button @click="handleAnnouncementClick" class="mt-4 action-button">
            {{ t('home.viewDetails') }}
          </button>
        </div>
        <div class="w-full h-48 rounded-2xl bg-cover bg-center overflow-hidden shadow-lg transform-gpu hover:scale-105 transition-transform duration-300" 
             style="background-image: url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop')">
        </div>
      </div>
    </main>
  </div>
  <div v-else class="flex items-center justify-center h-full">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ t('login.pleaseLogin') }}</h2>
      <button @click="router.push('/login')" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        {{ t('login.goToLogin') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { User } from '../types'
import { addNotification } from '@/store'

interface Props {
  user: User
}

defineProps<Props>()
const router = useRouter()
const { t } = useI18n()

const handleLessonPrepClick = () => {
  router.push('/syllabus')
}

const handleGradingClick = () => {
  router.push('/question')
}

const handleAnnouncementClick = () => {
  addNotification({ title: t('common.notifications'), content: t('announcement.detailsNotImplemented'), type: 'info' })
  router.push('/home')
}
</script>

<style scoped>
.action-button {
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 6);
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
  font-weight: 600;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 200ms;
  transform: scale(1);
}

.action-button:hover {
  background-color: var(--color-gray-200);
  transform: scale(1.05);
}

.action-button:active {
  transform: scale(0.95);
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