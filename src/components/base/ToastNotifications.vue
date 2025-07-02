<template>
  <div class="fixed top-4 right-4 z-[100] w-80 space-y-2">
    <transition-group name="toast">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="p-4 rounded-lg shadow-lg"
        :class="notificationClasses[notification.type]"
      >
        <h3 class="font-bold">{{ notification.title }}</h3>
        <p>{{ notification.content }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotifications } from '@/store'; // We will create this composable

const { notifications } = useNotifications();

const notificationClasses = {
  success: 'bg-green-100 border-green-400 text-green-700',
  error: 'bg-red-100 border-red-400 text-red-700',
  info: 'bg-blue-100 border-blue-400 text-blue-700',
  warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 