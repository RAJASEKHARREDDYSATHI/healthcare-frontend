import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/healthcare-frontend/',   // 👈 ensures assets load from correct sub-path
})
