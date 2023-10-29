import {resolve} from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['axios'],
    },
    target: 'modules',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'storefront-api-sdk',
      formats: ['es'],
    },
  },

  plugins: [dts()],
});
