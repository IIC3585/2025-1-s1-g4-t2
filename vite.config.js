import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/T2-WebAvanzado-Fork/',
  plugins: [react()],
  assetsInclude: ['**/*.wasm'],
});