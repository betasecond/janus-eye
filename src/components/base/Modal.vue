<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="$emit('close')"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <div class="p-6">
          <h3 class="text-xl font-bold mb-4">{{ title }}</h3>
          <p class="text-gray-600">
            <slot>Are you sure you want to proceed?</slot>
          </p>
        </div>
        <div class="bg-gray-100 px-6 py-3 flex justify-end gap-3 rounded-b-lg">
          <button
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            {{ cancelButtonText }}
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 text-white rounded-lg"
            :class="confirmButtonClass"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  show: boolean;
  title?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: 'primary' | 'danger';
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  title: 'Confirmation',
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  confirmButtonType: 'primary',
});

defineEmits(['close', 'confirm']);

const confirmButtonClass = computed(() => ({
  'bg-blue-500 hover:bg-blue-600': props.confirmButtonType === 'primary',
  'bg-red-500 hover:bg-red-600': props.confirmButtonType === 'danger',
}));
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style> 