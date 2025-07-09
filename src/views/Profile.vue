<template>
  <div class="p-4 md:p-6 lg:p-8 animate-fade-in">
    <header class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">个人中心</h1>
      <p class="text-gray-500 mt-1">管理您的个人信息和账户设置</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 基本信息 -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">基本信息</h2>
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <img 
              :src="user.avatar" 
              :alt="user.name" 
              class="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 class="font-semibold text-gray-800">{{ user.name }}</h3>
              <p class="text-gray-500">{{ user.email }}</p>
              <span class="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 mt-1">
                {{ getRoleText(user.role) }}
              </span>
            </div>
          </div>
          <button class="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            编辑个人信息
          </button>
        </div>
      </div>

      <!-- 账户设置 -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">账户设置</h2>
        <div class="space-y-3">
          <button class="w-full text-left py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            修改密码
          </button>
          <button class="w-full text-left py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            通知设置
          </button>
          <button class="w-full text-left py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            隐私设置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types'

// 模拟用户数据
const user = ref<User>({
  id: '1',
  name: '张老师',
  email: 'zhang@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  role: 'teacher'
})

const getRoleText = (role: string): string => {
  const roleMap: Record<string, string> = {
    teacher: '教师',
    student: '学生',
    admin: '管理员'
  }
  return roleMap[role] || role
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style> 