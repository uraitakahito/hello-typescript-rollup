import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';

const config: RollupOptions = {
  input: './src/app.ts', // conditionally required
  output: [
    {
      file: 'dist/iife/bundle.js',
      format: 'iife',
    },
    {
      dir: 'dist/es6',
      format: 'es',
    },
    {
      dir: 'dist/umd',
      format: 'umd',
      name: 'MyModule',
    },
  ],
  plugins: [typescript()],
};

export default config;
