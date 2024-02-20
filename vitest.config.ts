//PARA TESTING

import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment"
import { defineConfig, configDefaults } from 'vitest/config'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), EnvironmentPlugin("all")],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './__tests__/setup.ts',
        coverage: {
            provider: 'istanbul' // or 'v8'
        },
        exclude: [...configDefaults.exclude] //excluye de los test las carpetas node_modules, etc.
    },

    server: {
        open: true,

        //    origin: 'http://localhost:8081/',
        //origin: 'https://canavesio.syslab.com.ar/cotizador/'
    },
})
