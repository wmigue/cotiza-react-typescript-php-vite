import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// para hacer los build
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    //    origin: 'http://localhost:8081/',
    //origin: 'https://canavesio.syslab.com.ar/cotizador/'
  },
})


/////////////////////////////////////////////////////////////////////


