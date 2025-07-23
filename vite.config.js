import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '66de-74-57-172-42.ngrok-free.app', // Add your ngrok host here
    ],
    cors: true,
  },
})