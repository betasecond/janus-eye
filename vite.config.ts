import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // 定义环境变量
    'import.meta.env.VITE_DASHSCOPE_API_KEY': JSON.stringify(process.env.VITE_DASHSCOPE_API_KEY || 'sk-7dadf5c894664d9abd339cc95dd84697'),
  },
})
