import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
//    origin: 'http://localhost:8081/',
    //origin: 'https://canavesio.syslab.com.ar/cotizador/'
  },
})
