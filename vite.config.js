import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Example: bundle React separately
          // Add more chunks as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Set a custom chunk size limit
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
