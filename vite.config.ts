import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    visualizer({
      open: true, // 打包后自动在浏览器中打开分析报告
      filename: 'stats.html', // 分析报告的文件名
    }),],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    // 设置开发服务器超时时间为3000秒
    timeout: 3000000, // 3000秒 = 3000000毫秒
    proxy: {
      '/api': {
        target: 'http://localhost:9901',
        changeOrigin: true,
        timeout: 3000000, // 代理超时时间
        rewrite: (path) => path.replace(/^\/api\/file/, '/api/file')
      },
    }
  },
  // #################################################################
  // ### 新增的生产环境打包配置 (Build Configuration) ###
  // #################################################################
  build: {
    // 开启/关闭 source map
    sourcemap: false,
    // Terser 压缩配置，用于移除生产环境的 console.log 和 debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },

    },
    rollupOptions: {
      output: {
        // manualChunks 用于精细化控制代码分割
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }


      }
    }
  },
})
