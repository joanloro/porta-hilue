import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages sirve el proyecto en https://<usuario>.github.io/<repo>/,
  // por eso las rutas de assets llevan el prefijo del repositorio.
  // Si más adelante se usa un dominio propio, cambiar a '/'.
  base: process.env.VITE_BASE ?? '/porta-hilue/',
})
