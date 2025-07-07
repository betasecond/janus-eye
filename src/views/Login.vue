<template>
  <div class="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-[#f8f9fc] to-[#e7ecf4] group/design-root overflow-x-hidden" style='font-family: Lexend, "Noto Sans", sans-serif;'>
    <div class="layout-container flex h-full grow flex-col">
      <!-- 顶部导航 -->
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7ecf4] px-10 py-3 backdrop-blur-sm bg-white/80 animate-fade-in-down">
        <div class="flex items-center gap-4 text-[#0d131c]">
          <div class="size-4 animate-pulse">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6_543)">
                <path
                  d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                  fill="currentColor"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                  fill="currentColor"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_543"><rect width="48" height="48" fill="white"></rect></clipPath>
              </defs>
            </svg>
          </div>
          <h2 class="text-[#0d131c] text-lg font-bold leading-tight tracking-[-0.015em] animate-slide-in-left">EduAssist</h2>
        </div>
        <div class="flex flex-1 justify-end gap-8">
          <button
            class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#e7ecf4] text-[#0d131c] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 hover:bg-[#d4dae5] transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in-right"
          >
            <Icon name="question" size="20" />
          </button>
          <div
            class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 hover:ring-2 hover:ring-blue-300 transition-all duration-200 hover:scale-110 animate-fade-in-right"
            style='background-image: url("https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face");'
          ></div>
        </div>
      </header>

      <!-- 主要内容区域 -->
      <div class="px-40 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
          <!-- 背景图片 -->
          <div class="@container animate-slide-in-up">
            <div class="@[480px]:px-4 @[480px]:py-3">
              <div
                class="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f8f9fc] @[480px]:rounded-xl min-h-80 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-white/20"
                style='background-image: linear-gradient(135deg, rgba(32, 113, 243, 0.1) 0%, rgba(79, 172, 254, 0.1) 100%), url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop");'
              >
                <div class="p-6 bg-gradient-to-t from-black/20 to-transparent">
                  <h1 class="text-white text-2xl font-bold mb-2 animate-fade-in-up">欢迎使用EduAssist</h1>
                  <p class="text-white/90 text-sm animate-fade-in-up" style="animation-delay: 0.2s;">智能教育助手，让学习更高效</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 登录表单 -->
          <form @submit.prevent="handleLogin" class="animate-slide-in-up" style="animation-delay: 0.3s;">
            <!-- 用户名输入 -->
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 animate-fade-in-up" style="animation-delay: 0.4s;">
              <label class="flex flex-col min-w-40 flex-1 group">
                <p class="text-[#0d131c] text-base font-medium leading-normal pb-2 group-focus-within:text-[#2071f3] transition-colors duration-200">用户名</p>
                <input
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d131c] focus:outline-0 focus:ring-0 border-none bg-[#e7ecf4] focus:border-none h-14 placeholder:text-[#49699c] p-4 text-base font-normal leading-normal transition-all duration-200 focus:bg-white focus:shadow-md hover:shadow-sm"
                  required
                />
              </label>
            </div>

            <!-- 密码输入 -->
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 animate-fade-in-up" style="animation-delay: 0.5s;">
              <label class="flex flex-col min-w-40 flex-1 group">
                <p class="text-[#0d131c] text-base font-medium leading-normal pb-2 group-focus-within:text-[#2071f3] transition-colors duration-200">密码</p>
                <input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d131c] focus:outline-0 focus:ring-0 border-none bg-[#e7ecf4] focus:border-none h-14 placeholder:text-[#49699c] p-4 text-base font-normal leading-normal transition-all duration-200 focus:bg-white focus:shadow-md hover:shadow-sm"
                  required
                />
              </label>
            </div>

            <!-- 记住密码 -->
            <div class="flex items-center gap-4 bg-transparent px-4 min-h-14 justify-between animate-fade-in-up" style="animation-delay: 0.6s;">
              <p class="text-[#0d131c] text-base font-normal leading-normal flex-1 truncate">记住密码</p>
              <div class="shrink-0">
                <label
                  class="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#e7ecf4] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#2071f3] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <div class="h-full w-[27px] rounded-full bg-white transition-all duration-300 shadow-lg" style="box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px;"></div>
                  <input v-model="loginForm.rememberPassword" type="checkbox" class="invisible absolute" />
                </label>
              </div>
            </div>

            <!-- 忘记密码链接 -->
            <p class="text-[#49699c] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer hover:text-[#2071f3] transition-colors duration-200 animate-fade-in-up" style="animation-delay: 0.7s;">
              忘记密码？
            </p>

            <!-- 登录按钮 -->
            <div class="flex px-4 py-3 animate-fade-in-up" style="animation-delay: 0.8s;">
              <button
                type="submit"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-gradient-to-r from-[#2071f3] to-[#4facfe] text-white text-base font-bold leading-normal tracking-[0.015em] hover:from-[#1557b7] hover:to-[#3b8bfe] transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl transform-gpu relative overflow-hidden"
                :disabled="!isFormValid"
                :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
              >
                <span class="truncate relative z-10">登录</span>
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../components/base/Icon.vue'
import { currentUser, setCurrentUser } from '@/store'
import { LOCAL_STORAGE_USER_KEY } from '@/constants'

interface LoginForm {
  username: string
  password: string
  rememberPassword: boolean
}

const router = useRouter()

// 响应式数据
const loginForm = ref<LoginForm>({
  username: '',
  password: '',
  rememberPassword: false
})

// 计算属性
const isFormValid = computed(() => {
  return loginForm.value.username.trim() !== '' && loginForm.value.password.trim() !== ''
})

const handleLogin = () => {
  if (!isFormValid.value) return

  // 模拟登录逻辑
  console.log('Login attempt with:', loginForm.value)

  // 清除之前的用户信息
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
  setCurrentUser(null) // Reset reactive store value

  // 导航到角色选择页面
  router.push('/select-role')
}
</script>

<style scoped>
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-fade-in-right {
  animation: fade-in-right 0.6s ease-out;
  animation-fill-mode: both;
}

.animate-fade-in-left {
  animation: fade-in-left 0.6s ease-out;
}

.animate-slide-in-up {
  animation: slide-in-up 0.8s ease-out;
  animation-fill-mode: both;
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out;
}

.group:hover .group-hover\:translate-x-full {
  transform: translateX(100%);
}
</style> 