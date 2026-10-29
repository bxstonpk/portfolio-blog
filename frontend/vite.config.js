import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Relative base so the build works from any subpath (e.g. GitHub Pages
// project sites at username.github.io/repo-name, or /portfolio-blog/ on the
// company platform) without extra config. The company platform serves build/.
export default defineConfig({
  base: './',
  build: { outDir: 'build' },
  plugins: [react(), tailwindcss()],
})
