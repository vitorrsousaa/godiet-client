import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/html/**',
      '**/coverage/**',
    ],
    reporters: ['basic'],
    coverage: {
      provider: 'v8',
    },
    globals: true,
    alias: {
      '@godiet-assets': path.resolve(__dirname, './src/view/assets'),
      '@godiet-ui': path.resolve(__dirname, './src/view/ui'),
      '@godiet-components': path.resolve(__dirname, './src/view/components'),
      '@godiet-hooks': path.resolve(__dirname, './src/app/hooks'),
      '@godiet-storage': path.resolve(__dirname, './src/app/storage'),
      '@godiet-utils': path.resolve(__dirname, './src/app/utils'),
      '@godiet-pages': path.resolve(__dirname, './src/view/pages'),
      '@godiet-layouts': path.resolve(__dirname, './src/view/layouts'),
      '@godiet-contexts': path.resolve(__dirname, './src/app/contexts'),
      '@godiet-config': path.resolve(__dirname, './src/app/config/index.ts'),
      '@godiet-query': path.resolve(__dirname, './src/app/libs/query.tsx'),
      '@godiet-services': path.resolve(__dirname, './src/app/services'),
      '@godiet-entities': path.resolve(
        __dirname,
        './src/app/entities/index.ts'
      ),
      '@testing-suit': path.resolve(__dirname, './src/app/libs/testing/suit'),
      '@testing-react': path.resolve(__dirname, './src/app/libs/testing/react'),
    },
  },
});
