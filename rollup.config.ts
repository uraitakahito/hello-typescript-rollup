import typescript from "@rollup/plugin-typescript";
import type { RollupOptions } from "rollup";

const config: RollupOptions = {
  input: "./src/app.ts", // conditionally required
  output: [
    {
      file: "bundle.js",
      format: "iife",
    },
  ],
  plugins: [typescript()],
};

export default config;
