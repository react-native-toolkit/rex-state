import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";
import ts from "@wessberg/rollup-plugin-ts";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    },
    {
      file: pkg["umd:main"],
      format: "umd",
      name: "rexstate"
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [ts({}), terser()]
};
