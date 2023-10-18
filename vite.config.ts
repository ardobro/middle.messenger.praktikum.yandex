import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";
import viteSvgLoader from "vite-svg-loader";

export default defineConfig({
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
