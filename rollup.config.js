import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
export default {
  input: "src/index.js",
  output: [
    {
      name: "format-factory",
      file: "dist/format-factory.cjs.js",
      format: "cjs",
    },
    {
      name: "format-factory",
      file: "dist/format-factory.umd.js",
      format: "umd",
    },
    {
      name: "format-factory",
      file: "dist/format-factory.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    terser(),
  ],
};
