import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Specify manual chunks to control the bundle structure
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@fortawesome')) {
            return 'font-awesome';
          }
        },
      },
    },
    // Enable tree shaking
    terserOptions: {
      compress: {
        keep_infinity: true,
        pure_getters: true,
        // Enables tree shaking by discarding unused functions and variables
        passes: 3,
      },
    },
  },
});
