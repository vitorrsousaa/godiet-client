import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@godiet-assets': path.resolve(__dirname, './src/view/assets'),
      '@godiet-components': path.resolve(__dirname, './src/view/ui'),
      '@godiet-hooks': path.resolve(__dirname, './src/app/hooks'),
      '@godiet-storage': path.resolve(__dirname, './src/app/storage'),
      '@godiet-utils': path.resolve(__dirname, './src/app/utils'),
      '@godiet-pages': path.resolve(__dirname, './src/view/pages'),
      '@godiet-layouts': path.resolve(__dirname, './src/view/layouts'),
      '@godiet-contexts': path.resolve(__dirname, './src/app/contexts'),
      '@godiet-config': path.resolve(__dirname, './src/app/config/index.ts'),
      '@godiet-query': path.resolve(__dirname, './src/app/libs/query.tsx'),
      '@godiet-services': path.resolve(__dirname, './src/app/service'),
    },
  },
});
