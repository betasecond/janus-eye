<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-8">请选择您的角色</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          @click="selectRole('teacher')"
          class="p-8 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h2 class="text-2xl font-semibold">教师</h2>
        </div>
        <div
          @click="selectRole('student')"
          class="p-8 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h2 class="text-2xl font-semibold">学生</h2>
        </div>
        <div
          @click="selectRole('admin')"
          class="p-8 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow"
        >
          <h2 class="text-2xl font-semibold">管理员</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { setCurrentUser, createUser } from '@/store';
import { LOCAL_STORAGE_USER_KEY } from '@/constants';

const router = useRouter();

const selectRole = (role: 'teacher' | 'student' | 'admin') => {
  // 创建用户对象
  const user = createUser(role);

  // 保存用户信息到localStorage和store
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
  setCurrentUser(user);

  // 根据角色跳转到不同页面
  switch (role) {
    case 'teacher':
      router.push('/dashboard');
      break;
    case 'student':
      router.push('/home');
      break;
    case 'admin':
      router.push('/admin/users');
      break;
  }
};
</script>

<style scoped>
/* You can add additional styles here if needed */
</style> 