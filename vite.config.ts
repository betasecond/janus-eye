import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api/file': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/file/, '/api/file')
      },
      '/api/directory': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/directory/, '/api/directory')
      },
      '/api/search': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/search/, '/api/search')
      },
      '/api/file-info': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/file-info/, '/api/file-info')
      }
    }
  },
  define: {
    // 定义环境变量
    'import.meta.env.VITE_DASHSCOPE_API_KEY': JSON.stringify(process.env.VITE_DASHSCOPE_API_KEY || 'sk-7dadf5c894664d9abd339cc95dd84697'),
  },
})
