import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "base": "/strapi_memo_app_front/",
  server: {
    host: true,
    watch: {
      usePolling: true
    }
  }
})
