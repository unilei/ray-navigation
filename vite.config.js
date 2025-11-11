import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/ray-navigation/' : '/',
  plugins: [vue()],
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue']
        }
      }
    }
  }
})
