import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js', // or .ts
    css: true,
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],  
  },
});