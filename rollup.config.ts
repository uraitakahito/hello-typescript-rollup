import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';

const config: RollupOptions[] = [
  {
    input: './src/app.ts', // conditionally required
    output: [
      {
        dir: 'dist',
        format: 'es',
        // Make sure to remove the sourceMap option from your tsconfig.json:
        // https://github.com/rollup/plugins/issues/216#issuecomment-1776899097
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: 'src' })],
  },
  {
    input: './src/fizzbuzz.ts',
    output: [
      {
        dir: 'dist',
        format: 'es',
        // Make sure to remove the sourceMap option from your tsconfig.json:
        // https://github.com/rollup/plugins/issues/216#issuecomment-1776899097
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: 'src' })],
  },
];

export default config;
