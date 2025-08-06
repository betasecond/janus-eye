<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
    <div class="w-full max-w-4xl rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden transform transition-all duration-500 animate-fade-in-up">
      <!-- Left side: Image and Welcome -->
      <div class="w-full md:w-1/2 bg-cover bg-center p-8 flex flex-col justify-between" style='background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80")'>
        <div>
          <div class="flex items-center gap-3">
            <svg class="w-8 h-8 text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_6_543)"><path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor"></path><defs><clipPath id="clip0_6_543"><rect width="48" height="48" fill="white"></rect></clipPath></defs></g>
            </svg>
            <h2 class="text-white text-2xl font-bold">EduAssist</h2>
          </div>
        </div>
        <div>
          <h1 class="text-white text-4xl font-bold leading-tight mb-2">欢迎回来</h1>
          <p class="text-white/80 text-lg">智能教育助手，让教学更高效。</p>
        </div>
      </div>
      
      <!-- Right side: Form and Role Selection -->
      <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div>
          <!-- Login Form -->
          <form @submit.prevent="handleLogin" class="space-y-4 mb-8">
             <div>
                <label class="font-medium text-gray-700" for="username">Username</label>
                <input v-model="loginForm.username" id="username" placeholder="Enter your username" class="form-input mt-2 w-full rounded-lg border-gray-200 bg-gray-100 p-3 text-base transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
             </div>
             <div>
                <label class="font-medium text-gray-700" for="password">Password</label>
                <input v-model="loginForm.password" id="password" type="password" placeholder="Enter your password" class="form-input mt-2 w-full rounded-lg border-gray-200 bg-gray-100 p-3 text-base transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
             </div>
             <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                   <input v-model="loginForm.rememberPassword" type="checkbox" id="remember" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                   <label for="remember" class="text-gray-600">Remember Password</label>
                </div>
                <a href="#" class="text-sm text-blue-600 hover:underline">Forgot Password?</a>
             </div>
             <button type="submit" class="w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:opacity-50" :disabled="!isFormValid">Login</button>
          </form>

          <!-- Divider -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-2 text-sm text-gray-500">Or Select Your Role</span>
            </div>
          </div>
          
          <!-- Role Selection -->
          <div class="space-y-4">
            <div v-for="role in roles" :key="role.key" @click="selectRole(role.key as Role)" class="group flex items-center gap-4 rounded-xl p-4 border border-gray-200 hover:bg-gray-50 hover:shadow-lg hover:border-blue-400 cursor-pointer transition-all duration-300 transform hover:-translate-y-1">
              <img :src="role.avatar" alt="role.name" class="h-16 w-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110">
              <div class="flex-1">
                <h3 class="font-bold text-lg text-gray-800">{{ role.name }}</h3>
                <p class="text-gray-500">{{ role.description }}</p>
              </div>
              <button class="rounded-lg bg-gray-200 group-hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-gray-700 group-hover:text-white transition-all duration-300">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { setCurrentUser, addNotification, createUser } from '@/store'

interface LoginForm {
  username: string
  password: string
  rememberPassword: boolean
}

type Role = 'teacher' | 'student' | 'admin';

const router = useRouter()

const roles = ref([
  {
    key: 'teacher',
    name: 'Teacher',
    description: 'Manage courses, create assignments, and track student progress.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face'
  },
  {
    key: 'student',
    name: 'Student',
    description: 'Access course materials, submit assignments, and view grades.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    key: 'admin',
    name: 'Administrator',
    description: 'Oversee the platform, manage users, and generate reports.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
])

const loginForm = ref<LoginForm>({
  username: 'testuser',
  password: 'password',
  rememberPassword: false
})

const isFormValid = computed(() => {
  return loginForm.value.username.trim() !== '' && loginForm.value.password.trim() !== ''
})

const handleLogin = () => {
  if (!isFormValid.value) return;

  addNotification({
    title: '请选择角色登录',
    content: '为了进行演示，请直接点击下方的角色卡片进行快速登录。',
    type: 'info'
  });
}

const selectRole = (role: Role) => {
  const user = {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    name: role === 'teacher' ? '张老师' : role === 'student' ? '李同学' : '王管理员',
    email: `${role}@example.com`,
    avatar: roles.value.find(r => r.key === role)?.avatar || '',
    role: role
  };

  localStorage.setItem('currentUser', JSON.stringify(user));
  setCurrentUser(user);  // 修改：传入完整的 user 对象
  
  addNotification({
      title: `以 ${user.name} 身份登录`,
      content: `欢迎回来！您已成功登录。`,
      type: 'success',
  });

  switch (role) {
    case 'teacher':
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
</style> 