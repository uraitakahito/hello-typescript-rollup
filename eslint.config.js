import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

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

  //
  // Shared settings for all TypeScript files
  //
  {
    languageOptions: {
      parserOptions: {
        //
        // strictTypeChecked は全ファイルに @typescript-eslint/parser を適用し、
        // projectService 経由で型情報を要求する。しかし tsconfig.json は
        // デフォルトで .ts のみを対象とするため、.js ファイルは Project Service に
        // 認識されず Parsing error になる。
        //
        // allowDefaultProject で .js ファイルを列挙し、defaultProject で
        // allowJs: true を設定した ESLint 専用 tsconfig を指定することで、
        // .js ファイルにも型情報を提供する。
        //
        // 注意: allowDefaultProject は ** を含む再帰 glob を禁止しているため、
        // ディレクトリ階層ごとに個別のパターンを指定する必要がある。
        // また、デフォルト上限は 8 ファイルである。
        //
        projectService: {
          allowDefaultProject: [
            'eslint.config.js',
            'src/get-files/*.js',
            'src/get-files/a/*.js',
            'src/get-files/b/*.js',
          ],
          defaultProject: './tsconfig.eslint.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    //
    // import-x TypeScript settings
    //
    // importX.flatConfigs.typescript を使わず手動で設定している理由:
    //
    // flatConfigs.typescript は 'import-x/resolver': { typescript: true } を設定するが、
    // これはレガシーリゾルバ API で eslint-import-resolver-typescript パッケージを探す仕組み。
    // 内部で requireResolver("typescript") が呼ばれた際、eslint-import-resolver-typescript が
    // 見つからないと TypeScript コンパイラ本体が代わりに読み込まれ、リゾルバインターフェースを
    // 満たさないため "typescript with invalid interface loaded as resolver" エラーになる。
    //
    // これを避けるため、flatConfigs.typescript を削除し、以下のように手動で設定する:
    // - settings: flatConfigs.typescript が提供していた extensions/parsers 等を手動記述
    // - resolver-next: 新しいリゾルバ API (interfaceVersion 3) で eslint-import-resolver-typescript を使用
    //
    // 詳細: eslint-import-resolver-explanation.md
    //
    settings: {
      // import-x がモジュール解決時に認識する拡張子
      // （flatConfigs.typescript では .cts/.mts も含まれるが、このプロジェクトでは未使用のため省略）
      'import-x/extensions': ['.ts', '.tsx', '.js', '.jsx'],
      // @types/* パッケージの型定義も外部モジュールとして認識させる
      'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
      // .ts/.tsx ファイルを @typescript-eslint/parser でパースさせる
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      //
      // resolver-next: 新しいリゾルバ API (interfaceVersion 3)
      //
      // レガシーの 'import-x/resolver' ではなく 'import-x/resolver-next' を使用する。
      // resolve.js の fullResolve() は resolver-next が設定されていればレガシーパスを
      // 完全にバイパスし、{ typescript: true } による誤ったリゾルバ読み込みを回避できる。
      //
      // createTypeScriptImportResolver は eslint-import-resolver-typescript が提供する関数で、
      // tsconfig.json の paths/baseUrl 解決、package.json exports 解釈、
      // .ts → .js 拡張子マッピング等に対応する。
      //   https://github.com/import-js/eslint-import-resolver-typescript
      //
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          // @types/* パッケージからの型解決を常に試みる
          alwaysTryTypes: true,
        }),
      ],
    },
    rules: {
      // TypeScript の型情報を使った named export の検証は不要
      // （flatConfigs.typescript が設定していたルール）
      'import-x/named': 'off',
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
  // Override for JS files
  //
  // JS ファイルは TypeScript のグローバル型定義 (lib.dom.d.ts 等) が適用されないため、
  // console 等のグローバル変数が no-undef で未定義扱いになる。
  // Node.js 環境のグローバル変数を明示的に設定する。
  //
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        console: 'readonly',
      },
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
