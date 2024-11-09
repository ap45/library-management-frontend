import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/', // Add this for serving static files correctly
  build: {
    outDir: 'dist', // Ensure the output directory remains 'dist'
  }
})
