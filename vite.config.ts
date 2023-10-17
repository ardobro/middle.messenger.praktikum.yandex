import { defineConfig } from "vite";
import handlebars from "./vite-plugin-handlebars-precompile";
import viteSvgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [handlebars(), viteSvgLoader()],
});
