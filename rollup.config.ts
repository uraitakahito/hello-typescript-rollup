import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup';
// The @rollup/plugin-node-resolve plugin teaches Rollup how to find external modules.
import resolve from '@rollup/plugin-node-resolve';

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
  {
    input: './src/import-check/import-external-esmodule.ts',
    output: [
      {
        dir: 'dist',
        format: 'es',
        // Make sure to remove the sourceMap option from your tsconfig.json:
        // https://github.com/rollup/plugins/issues/216#issuecomment-1776899097
        sourcemap: true,
      },
    ],
    plugins: [typescript({ rootDir: 'src' }), resolve()],
  },
  {
    input: './src/import-check/import-internal-esmodule.ts',
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
    input: './src/import-check/suppress-warning.ts',
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

    // The hello-npmjs package is not bundled into the output.
    // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
    external: ['@uraitakahito/hello-npmjs'],
  },
];

export default config;
