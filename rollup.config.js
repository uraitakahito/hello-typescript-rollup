import typescript from "@rollup/plugin-typescript";
// https://rollupjs.org/command-line-interface/#config-intellisense
import { defineConfig } from "rollup";

const config = defineConfig({
  input: "./src/app.ts", // conditionally required
  output: [
    {
      file: "bundle.js",
      format: "iife",
    }
  ],
  plugins: [typescript()],
});

export default config;
