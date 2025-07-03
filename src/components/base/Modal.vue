<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        @click.self="handleClose"
      >
        <div 
          class="bg-white rounded-2xl shadow-2xl w-full max-w-md transform-gpu transition-all duration-300 border border-gray-100"
          :class="modalSizeClass"
        >
          <!-- 头部 -->
          <div class="relative p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-gray-900 pr-8">{{ title }}</h3>
              <button
                v-if="showCloseButton"
                @click="handleClose"
                class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
          </div>

          <!-- 内容区域 -->
          <div class="p-6">
            <div class="text-gray-600 leading-relaxed">
              <slot>
                <p>Are you sure you want to proceed?</p>
              </slot>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
            <button
              v-if="showCancelButton"
              @click="handleClose"
              class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
            >
              {{ cancelButtonText }}
            </button>
            <button
              v-if="showConfirmButton"
              @click="handleConfirm"
              class="px-4 py-2 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              :class="confirmButtonClass"
              :disabled="confirmLoading"
            >
              <div v-if="confirmLoading" class="flex items-center gap-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Loading...</span>
              </div>
              <span v-else>{{ confirmButtonText }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';

interface Props {
  show: boolean;
  title?: string;
  subtitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: 'primary' | 'danger' | 'success' | 'warning';
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: 'Confirmation',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  confirmButtonType: 'primary',
  showCloseButton: true,
  showCancelButton: true,
  showConfirmButton: true,
  confirmLoading: false,
  size: 'md',
  persistent: false,
});

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const modalSizeClass = computed(() => ({
  'max-w-sm': props.size === 'sm',
  'max-w-md': props.size === 'md',
  'max-w-lg': props.size === 'lg',
  'max-w-2xl': props.size === 'xl',
}));

const confirmButtonClass = computed(() => ({
  'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700': props.confirmButtonType === 'primary',
  'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700': props.confirmButtonType === 'danger',
  'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700': props.confirmButtonType === 'success',
  'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600': props.confirmButtonType === 'warning',
  'opacity-50 cursor-not-allowed': props.confirmLoading,
}));

const handleClose = () => {
  if (props.persistent) return;
  emit('close');
};

const handleConfirm = () => {
  if (props.confirmLoading) return;
  emit('confirm');
};

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show && !props.persistent) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
  if (props.show) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-active {
  transition: all 0.2s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-enter-from .bg-white {
  transform: scale(0.9) translateY(-20px);
}

.modal-leave-to {
  opacity: 0;
}

.modal-leave-to .bg-white {
  transform: scale(0.95) translateY(10px);
}
</style> 