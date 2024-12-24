import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import autoprefixer from 'autoprefixer';

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: 'build',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(), // Add options if needed
        ],
      },
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ['import', 'legacy-js-api'],
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        // {
        //   find: '@components',
        //   replacement: path.resolve(__dirname, 'src/components'),
        // },
        // {
        //   find: '@assets',
        //   replacement: path.resolve(__dirname, 'src/assets'),
        // },
        // {
        //   find: '@utils',
        //   replacement: path.resolve(__dirname, 'src/utils'),
        // },
        // {
        //   find: '@styles',
        //   replacement: path.resolve(__dirname, 'src/styles'),
        // },
        // {
        //   find: 'src/',
        //   replacement: path.resolve(__dirname, 'src'),
        // },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // Add proxy configuration here if needed
      },
    },
  };
});
