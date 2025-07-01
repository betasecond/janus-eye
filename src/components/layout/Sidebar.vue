<template>
  <div class="flex h-full min-h-[700px] flex-col justify-between bg-[#f8f9fc] p-4 w-80">
    <div class="flex flex-col gap-4">
      <!-- 应用品牌 -->
      <div class="flex gap-3 items-center">
        <div
          class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          :style="`background-image: url('${user.avatar}')`"
        />
        <h1 class="text-[#0d131c] text-base font-medium leading-normal">{{ appName }}</h1>
      </div>

      <!-- 导航菜单 -->
      <div class="flex flex-col gap-2">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-[#e7ecf4] transition-colors"
          :class="{ 'bg-[#e7ecf4]': item.isActive }"
          @click="handleMenuClick(item)"
        >
          <Icon :name="item.icon" size="24" :color="item.isActive ? '#0d131c' : '#0d131c'" />
          <p class="text-[#0d131c] text-sm font-medium leading-normal">{{ item.label }}</p>
        </div>
      </div>
    </div>

    <!-- 底部帮助项 -->
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-[#e7ecf4] rounded-lg transition-colors">
        <Icon name="question" size="24" color="#0d131c" />
        <p class="text-[#0d131c] text-sm font-medium leading-normal">帮助和文档</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '../base/Icon.vue'
import type { MenuItem, User } from '../../types'

interface Props {
  menuItems: MenuItem[]
  user: User
  appName?: string
}

interface Emits {
  (e: 'menu-click', item: MenuItem): void
}

const props = withDefaults(defineProps<Props>(), {
  appName: 'EduAssist'
})

const emit = defineEmits<Emits>()

const handleMenuClick = (item: MenuItem) => {
  emit('menu-click', item)
}
</script> 