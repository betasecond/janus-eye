<template>
  <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
    <div class="flex flex-wrap justify-between gap-3 p-4">
      <div class="flex min-w-72 flex-col gap-3">
        <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight">Dashboard</p>
        <p class="text-[#49699c] text-sm font-normal leading-normal">Welcome back, {{ user.name }}!</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <p class="text-[#49699c] text-sm font-normal leading-normal">Period:</p>
          <p class="text-[#0d131c] text-sm font-medium leading-normal">Last 7 days</p>
        </div>
        <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e7ecf4] text-[#0d131c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
          <Icon name="download" size="20" />
        </button>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-stretch justify-between gap-4 rounded-lg">
        <div class="flex flex-col gap-1 flex-[2_2_0px]">
          <p class="text-[#49699c] text-sm font-normal leading-normal">Due Tomorrow</p>
          <p class="text-[#0d131c] text-base font-bold leading-tight">Math Assignment 3</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal">Complete the assignment on algebraic equations.</p>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDTD5x9C3oC8cDJ4W7naRiUj96wCc1ionNMZt9Fjo96ZYDciXfNgQo9IDNvrjipxUdZ1Opo7dK2AEfPejDLh_hSSh0F-_diwRipFglEJiTWNMwbFiWihOAcj1q-VoRlhZes31-CVk_VfRwlRgZBo2DAjvD-u7fjkXpQxvF80P_NorUGi4e9ADEXuSXdoh45Twz6DJPr8ZGsx0JV3A7hTmgryh7GdrjLX-LddYnR4pvmEo2AtVMW7OY981_X_lYJSB4ub0O89t5ElgI");'
        ></div>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-stretch justify-between gap-4 rounded-lg">
        <div class="flex flex-col gap-1 flex-[2_2_0px]">
          <p class="text-[#0d131c] text-base font-bold leading-tight">Today's Practice Progress</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal">You've completed 75% of your daily practice goals.</p>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDLeeX32tQXFDzlv03LxPErEM8ogzUtzxbyt6IwDy1Ix4OXS1gDAF03Bhx-xBpX7esQ7SyJQs7BR6pYxNyrr1KnmM2Y7xJ1XfFUW25raMkCe_NMmj68X1ZfX5-LvjLLcFt-K7bvedSI2Q8kM24uZ3_9BoOGKTRrOPQVsrw5XZPHvlAIbW-Wd99inQkjkUYfbQjNJXAVvC_XgTsTLieLoaLDLy-8TcYGkv1fxr1IUliFzwRT3QAMghlJxeNB6QY6acWbEhbMGIqCofk");'
        ></div>
      </div>
    </div>
    <div class="p-4">
      <div class="flex items-stretch justify-between gap-4 rounded-lg">
        <div class="flex flex-col gap-1 flex-[2_2_0px]">
          <p class="text-[#0d131c] text-base font-bold leading-tight">Recommended Resources</p>
          <p class="text-[#49699c] text-sm font-normal leading-normal">Explore resources tailored to your learning needs.</p>
        </div>
        <div
          class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKmdbYuKU8ELiI4B03bh8-pBl0oi4Xr44gtetl-qIqJqVhm7jUCtGBUf9u-O7w0KtFONP9ZieSwWeIeHhuGw_FryTI_E3g-fGkqILS82T6hNjOHTJxVrme6ihnzN0nbC_VPKZ929PFFnfTKqGeX85eE0oXxJfm1WJO_eFdvd_lYZ5JIZwsCLcpeu2J7bJAY1tktaE_IWJxoc23vFxGLAu9ALnJx1XTScT0JbPkePeLg4Nz10yTGYP4NxF-E8YbM-ebX-oO33W9jWk");'
        ></div>
      </div>
    </div>
    <h2 class="text-[#0d131c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Notifications</h2>
    <NotificationList :notifications="notifications" @notification-click="handleNotificationClick" />
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      <Card title="Today's Lesson Prep" value="3 topics" icon="book" @click="navigateTo('/syllabus')" />
      <Card title="Pending Assignments" value="5 assignments" icon="file" @click="navigateTo('/question')" />
      <Card title="Student Analytics" value="View Report" icon="chart" @click="navigateTo('/overview')" />
    </div>
    <!-- Course List -->
    <div class="flex flex-col gap-4 p-4">
      <h2 class="text-xl font-bold">My Courses</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div v-for="course in courses" :key="course.id" class="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
          <div class="flex items-center gap-4">
            <img :src="course.image" alt="Course Image" class="h-16 w-16 rounded-lg object-cover" />
            <div>
              <h3 class="text-lg font-bold">{{ course.name }}</h3>
              <p class="text-sm text-gray-500">{{ course.teacher }}</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">{{ course.description }}</p>
          <div>
            <p class="text-sm">Progress: {{ course.progress }}%</p>
            <div class="mt-1 h-2 w-full rounded-full bg-gray-200">
              <div class="h-2 rounded-full bg-blue-500" :style="{ width: course.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Notification, User, Course } from '@/types';
import NotificationList from '@/components/base/NotificationList.vue';
import { mockNotifications, mockCourses } from '@/data/mockData';
import Card from '@/components/base/Card.vue';
import Icon from '@/components/base/Icon.vue';

interface Props {
  user: User;
}

defineProps<Props>();

const notifications = ref<Notification[]>(mockNotifications.slice(0, 3));
const courses = ref<Course[]>(mockCourses);
const router = useRouter();

const handleNotificationClick = (notification: Notification) => {
  console.log('Notification clicked:', notification);
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script> 