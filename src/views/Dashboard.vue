<template>
  <div class="flex flex-col flex-1">
    <div class="flex flex-wrap justify-between gap-3 p-4">
      <p class="text-[#0d131c] tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Notification } from '@/types';
import NotificationList from '@/components/base/NotificationList.vue';
import { mockNotifications } from '@/data/mockData';

const notifications = ref(mockNotifications.slice(0, 3));

const handleNotificationClick = (notification: Notification) => {
  console.log('Notification clicked:', notification);
};
</script> 