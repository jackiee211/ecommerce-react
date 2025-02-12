import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ecommerce-react/', // Make sure this matches your GitHub Pages URL
  plugins: [react()],
});
