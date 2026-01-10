import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Setting base to './' ensures assets are loaded correctly regardless of 
  // whether the site is at root or a subdirectory (e.g. user.github.io/repo)
  base: './',
  build: {
    outDir: 'dist',
  },
});