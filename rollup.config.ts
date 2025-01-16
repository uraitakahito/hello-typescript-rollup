/* eslint-disable max-len */
import type { RollupOptions } from 'rollup';

import typescript from '@rollup/plugin-typescript';
// The @rollup/plugin-node-resolve plugin teaches Rollup how to find external modules.
import resolve from '@rollup/plugin-node-resolve';
// To generate a minified bundle with terser
import terser from '@rollup/plugin-terser';

const config: RollupOptions[] = [
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
    input: 'src/import-check/import-conditional-exports.ts',

    output: [
      {
        dir: 'dist/iife',
        format: 'iife',
        plugins: [terser()],
      },
      {
        dir: 'dist/es6',
        format: 'es',
      },
      {
        dir: 'dist/umd',
        format: 'umd',
      },
    ],
    plugins: [
      resolve(),
    ],

    //
    // Sample configuration to explicitly throw an error if an external dependency is not found.
    // By default, Rollup only shows a warning and the build succeeds if an external dependency is not found.
    // https://rollupjs.org/configuration-options/#onwarn
    //
    onwarn(warning, warn) {
      if (warning.code === 'UNRESOLVED_IMPORT') {
        throw new Error(`Unresolved import: ${warning}`);
      }
      warn(warning);
    },
  },

  {
    input: './src/import-check/import-conditional-exports.ts',
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

    // The hello-esmodule package is not bundled into the output.
    // https://rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
    external: ['@uraitakahito/hello-esmodule'],
  },
];

export default config;
