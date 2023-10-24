import { defineConfig } from 'vite';
import viteSvgLoader from 'vite-svg-loader';
import handlebars from './vite-plugin-handlebars-precompile.ts';

export default defineConfig({
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/_main.scss";
        `,
      },
    },
  },
  plugins: [handlebars(), viteSvgLoader()],
});
