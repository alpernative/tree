import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['../lib/src/**/*'] })],
  resolve: {
    alias: {
      lib: path.resolve(__dirname, '../lib'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, '../lib/src/index.ts'),
      name: 'tree',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },

    sourcemap: true,
    emptyOutDir: true,
  },
});
