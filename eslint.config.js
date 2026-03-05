import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';

//
// Naming conventions
// https://google.github.io/styleguide/tsguide.html#naming-rules-by-identifier-type
//
const namingConventionRule = [
  'warn',
  {
    selector: 'variable',
    format: ['camelCase'],
  },
  //
  // Enforce that boolean variables are prefixed with an allowed verb
  // https://typescript-eslint.io/rules/naming-convention/#enforce-that-boolean-variables-are-prefixed-with-an-allowed-verb
  // https://github.com/airbnb/javascript?tab=readme-ov-file#accessors--boolean-prefix
  //
  {
    selector: ['variable'],
    types: ['boolean'],
    format: ['camelCase'],
    prefix: ['can', 'did', 'has', 'is', 'must', 'need', 'should', 'will'],
  },
  //
  // Only symbols declared on the module level, static fields of module level classes, and values of module level enums, may use CONST_CASE.
  // https://google.github.io/styleguide/tsguide.html#identifiers-constants
  //
  {
    selector: ['enum', 'enumMember'],
    format: ['UPPER_CASE'],
  },
  {
    selector: 'function',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  // https://google.github.io/styleguide/tsguide.html#class-members
  {
    selector: 'accessor',
    format: ['camelCase'],
  },
  {
    selector: 'parameter',
    format: ['camelCase'],
    leadingUnderscore: 'allow',
  },
  {
    selector: 'class',
    format: ['PascalCase'],
  },
  //
  // Type parameters, like in Array<T>, may use a single upper case character (T) or UpperCamelCase
  // https://google.github.io/styleguide/tsguide.html#identifiers-type-parameters
  //
  {
    selector: 'typeParameter',
    format: ['PascalCase'],
  },
];

export default tseslint.config(
  //
  // Global ignores
  //
  {
    ignores: ['dist/', '.Trash-*/'],
  },

  //
  // ESLint recommended rules
  //
  js.configs.recommended,

  //
  // typescript-eslint strict + type-checked rules
  // https://typescript-eslint.io/getting-started/typed-linting/
  //
  ...tseslint.configs.strictTypeChecked,

  //
  // eslint-plugin-import-x recommended config
  //
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,

  //
  // Shared settings for all TypeScript files
  //
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      //
      // @typescript-eslint custom rules
      //
      '@typescript-eslint/naming-convention': namingConventionRule,

      //
      // import-x rules
      //

      //
      // When importing ES modules without using a bundler or transpiler, file extensions are required:
      //   https://nodejs.org/api/esm.html#esm_mandatory_file_extensions
      //   https://github.com/import-js/eslint-plugin-import/blob/v2.17.2/docs/rules/extensions.md#examples
      //
      'import-x/extensions': ['error', 'always', { ignorePackages: true }],

      //
      // https://engineering.linecorp.com/ja/blog/you-dont-need-default-export
      // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
      //
      'import-x/no-anonymous-default-export': ['error', { allowCallExpression: false }],

      'import-x/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-mutable-exports': 'error',

      //
      // Core ESLint rules
      //
      'no-console': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      curly: ['error', 'multi-line'],
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'acc',
          'accumulator',
          'e',
          'ctx',
          'context',
          'req',
          'request',
          'res',
          'response',
        ],
      }],
    },
  },

  //
  // Override for config files (rollup, vitest, etc.)
  //
  {
    files: ['vite.config.*[cmjt]*s', 'vitest.config.*[cmjt]*s', 'rollup.config.*[cmjt]*s', 'eslint.config.*[cmjt]*s'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
);
