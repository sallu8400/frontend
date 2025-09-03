import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path'; // 1. इस लाइन को जोड़ें

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

//   // 2. इस resolve ब्लॉक को जोड़ें
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
  
//   // आपका मौजूदा optimizeDeps वैसा ही रहेगा
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
// });