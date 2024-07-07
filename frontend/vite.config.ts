import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// tsconfigPaths: for absolute path
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
