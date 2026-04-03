import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Serve all HTML files as entry points for multi-page app
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        yogaDetails: resolve(__dirname, 'yoga-details.html'),
        instructor: resolve(__dirname, 'instructor.html'),
        faq: resolve(__dirname, 'faq.html'),
      },
    },
  },
});
