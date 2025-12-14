import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Göreli yollar (GitHub Pages vb. için)
  publicDir: 'public', // Statik dosyaların yeri
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    host: true // Ağdaki diğer cihazlardan erişim için
  }
});