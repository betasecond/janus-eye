<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1 animate-fade-in">
    <div class="flex flex-wrap justify-between gap-3 p-4 animate-slide-in-up">
      <div class="flex min-w-72 flex-col gap-3">
        <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight animate-fade-in-up">{{ t('common.dashboard') }}</p>
        <p class="text-[#49699c] text-sm font-normal leading-normal animate-fade-in-up" style="animation-delay: 0.1s;">{{ t('dashboard.welcomeBack') }}, {{ user.name }}!</p>
      </div>
      <div class="flex items-center gap-4 animate-fade-in-up" style="animation-delay: 0.2s;">
        <div class="flex items-center gap-2">
          <p class="text-[#49699c] text-sm font-normal leading-normal">{{ t('common.period') }}:</p>
          <p class="text-[#0d131c] text-sm font-medium leading-normal">{{ t('common.last7Days') }}</p>
        </div>
        <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7ecf4] text-[#0d131c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#d4dae5] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
          <Icon name="download" size="20" />
        </button>
      </div>
    </div>
    <div class="p-4 animate-slide-in-up" style="animation-delay: 0.3s;">
      <div class="flex items-stretch justify-between gap-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
        <div class="flex flex-col gap-2 flex-[2_2_0px]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <p class="text-[#dc2626] text-sm font-medium leading-normal">{{ t('common.dueTomorrow') }}</p>
          </div>
          <p class="text-[#0d131c] text-lg font-bold leading-tight">Math Assignment 3</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal">{{ t('dashboard.completeAssignment') }}</p>
          <div class="flex items-center gap-2 mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-progress-bar" style="width: 65%"></div>
            </div>
            <span class="text-xs text-gray-500">65%</span>
          </div>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 shadow-md hover:shadow-lg transition-shadow duration-300"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTD5x9C3oC8cDJ4W7naRiUj96wCc1ionNMZt9Fjo96ZYDciXfNgQo9IDNvrjipxUdZ1Opo7dK2AEfPejDLh_hSSh0F-_diwRipFglEJiTWNMwbFiWihOAcj1q-VoRlhZes31-CVk_VfRwlRgZBo2DAjvD-u7fjkXpQxvF80P_NorUGi4e9ADEXuSXdoh45Twz6DJPr8ZGsx0JV3A7hTmgryh7GdrjLX-LddYnR4pvmEo2AtVMW7OY981_X_lYJSB4ub0O89t5ElgI");'
        ></div>
      </div>
    </div>
    <div class="p-4 animate-slide-in-up" style="animation-delay: 0.4s;">
      <div class="flex items-stretch justify-between gap-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
        <div class="flex flex-col gap-2 flex-[2_2_0px]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p class="text-[#059669] text-sm font-medium leading-normal">{{ t('common.todaysProgress') }}</p>
          </div>
          <p class="text-[#0d131c] text-lg font-bold leading-tight">{{ t('dashboard.dailyPracticeGoals') }}</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal">{{ t('dashboard.completedDailyGoals') }}</p>
          <div class="flex items-center gap-2 mt-2">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full animate-progress-bar" style="width: 75%"></div>
            </div>
            <span class="text-xs text-gray-500">75%</span>
          </div>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 shadow-md hover:shadow-lg transition-shadow duration-300"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLeeX32tQXFDzlv03LxPErEM8ogzUtzxbyt6IwDy1Ix4OXS1gDAF03Bhx-xBpX7esQ7SyJQs7BR6pYxNyrr1KnmM2Y7xJ1XfFUW25raMkCe_NMmj68X1ZfX5-LvjLLcFt-K7bvedSI2Q8kM24uZ3_9BoOGKTRrOPQVsrw5XZPHvlAIbW-Wd99inQkjkUYfbQjNJXAVvC_XgTsTLieLoaLDLy-8TcYGkv1fxr1IUliFzwRT3QAMghlJxeNB6QY6acWbEhbMGIqCofk");'
        ></div>
      </div>
    </div>
    <div class="p-4 animate-slide-in-up" style="animation-delay: 0.5s;">
      <div class="flex items-stretch justify-between gap-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
        <div class="flex flex-col gap-2 flex-[2_2_0px]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <p class="text-[#7c3aed] text-sm font-medium leading-normal">{{ t('common.recommended') }}</p>
          </div>
          <p class="text-[#0d131c] text-lg font-bold leading-tight">{{ t('dashboard.learningResources') }}</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal">{{ t('dashboard.exploreResources') }}</p>
          <div class="flex gap-2 mt-2">
            <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Mathematics</span>
            <span class="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">Science</span>
            <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">English</span>
          </div>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 shadow-md hover:shadow-lg transition-shadow duration-300"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKmdbYuKU8ELiI4B03bh8-pBl0oi4Xr44gtetl-qIqJqVhm7jUCtGBUf9u-O7w0KtFONP9ZieSwWeIeHhuGw_FryTI_E3g-fGkqILS82T6hNjOHTJxVrme6ihnzN0nbC_VPKZ929PFFnfTKqGeX85eE0oXxJfm1WJO_eFdvd_lYZ5JIZwsCLcpeu2J7bJAY1tktaE_IWJxoc23vFxGLAu9ALnJx1XTScT0JbPkePeLg4Nz10yTGYP4NxF-E8YbM-ebX-oO33W9jWk");'
        ></div>
      </div>
    </div>
    <div class="animate-slide-in-up" style="animation-delay: 0.6s;">
      <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{{ t('common.notifications') }}</h2>
      <div class="transform-gpu">
        <NotificationList :notifications="notifications" @notification-click="handleNotificationClick" />
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 animate-slide-in-up" style="animation-delay: 0.7s;">
      <div class="transform-gpu hover:scale-105 transition-all duration-300">
        <Card :title="t('menu.syllabus')" value="3 topics" icon="book" @click="navigateTo('/syllabus')" />
      </div>
      <div class="transform-gpu hover:scale-105 transition-all duration-300" style="animation-delay: 0.1s;">
        <Card :title="t('menu.question')" value="5 assignments" icon="file" @click="navigateTo('/question')" />
      </div>
      <div class="transform-gpu hover:scale-105 transition-all duration-300" style="animation-delay: 0.2s;">
        <Card :title="t('menu.overview')" value="View Report" icon="chart" @click="navigateTo('/overview')" />
      </div>
    </div>
    <div class="flex flex-col gap-4 p-4 animate-slide-in-up" style="animation-delay: 0.8s;">
      <h2 class="text-xl font-bold text-[#0d131c]">{{ t('common.myCourses') }}</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div 
          v-for="(course, index) in courses" 
          :key="course.id" 
          class="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform-gpu hover:scale-105 group animate-fade-in-up"
          :style="`animation-delay: ${0.1 * index}s;`"
        >
          <div class="flex items-center gap-4">
            <img 
              :src="course.image" 
              alt="Course Image" 
              class="h-16 w-16 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300" 
            />
            <div class="flex-1">
              <h3 class="text-lg font-bold text-[#0d131c] group-hover:text-blue-600 transition-colors duration-300">{{ course.name }}</h3>
              <p class="text-sm text-gray-500">{{ course.teacher }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">{{ course.description }}</p>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <p class="text-sm font-medium text-gray-700">Progress</p>
              <span class="text-sm font-bold text-blue-600">{{ course.progress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out animate-progress-bar" 
                :style="{ width: course.progress + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import type { Notification, User, Course } from '@/types';
import NotificationList from '@/components/base/NotificationList.vue';
import { getCourses, getNotifications } from '@/api';
import Card from '@/components/base/Card.vue';
import Icon from '@/components/base/Icon.vue';

interface Props {
  user: User;
}

defineProps<Props>();

const { t } = useI18n();
const notifications = ref<Notification[]>([]);
const courses = ref<Course[]>([]);
const router = useRouter();

onMounted(async () => {
  courses.value = await getCourses();
  const allNotifications = await getNotifications();
  notifications.value = allNotifications.slice(0, 3);
});

const handleNotificationClick = (notification: Notification) => {
  console.log('Notification clicked:', notification);
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress-bar {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-slide-in-up {
  animation: slide-in-up 0.8s ease-out;
  animation-fill-mode: both;
}

.animate-progress-bar {
  animation: progress-bar 1.5s ease-out;
  animation-fill-mode: both;
}

.group:hover .group-hover\:text-blue-600 {
  color: #2563eb;
}
</style> 