"use strict";

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname, // TODO: https://github.com/typescript-eslint/typescript-eslint/issues/251
    useJSXTextNode: true,
  },

  plugins: ["@typescript-eslint",  "prettier" ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],

  rules: {
    "prettier/prettier": [
      "warn",
      {
        bracketSpacing: true,
        printWidth: 80,
        singleQuote: true,
        tabWidth: 4,
        trailingComma: "es5", // EcmaScript5 において、validな場合には末尾カンマを許可する
        arrowParens: "always", // アロー関数の引数に対する括弧を必須にする
        useTabs: false,
        jsxBracketSameLine: false,
        parser: "typescript",
      },
    ],
    "@typescript-eslint/no-namespace": "off",
    // '@typescript-eslint/indent': 'off',
    // '@typescript-eslint/interface-name-prefix': ['warn', 'always'],
    // '@typescript-eslint/no-empty-interface': 'off',
    // '@typescript-eslint/no-object-literal-type-assertion': 'off',
    // '@typescript-eslint/no-unused-vars': 'warn',
    // '@typescript-eslint/no-explicit-any': 'off',
    // "@typescript-eslint/no-empty-function": [2, {"allow": ["arrowFunctions", "constructors"]}],
    // // 'no-console': ['warn', { allow: ['error', 'warn'] }],
    // // TSLintの例外対応
    // '@typescript-eslint/array-type': 'warn', // 配列を[]で定義(Array<>は許可しない)
    // '@typescript-eslint/camelcase': 'off', // キャメルケースを許可しない
    // '@typescript-eslint/explicit-function-return-type': ['off'], // 関数の戻り値の型の指定
    // '@typescript-eslint/explicit-member-accessibility': 'warn', // TODO: https://github.com/typescript-eslint/typescript-eslint/issues/214
    // 'import/no-extraneous-dependencies': 'off', // package.jsonのdevDependencies import問題
    // 'import/no-unresolved': 'off', // TODO: aliasの時だけ拡張子が解決出来ずエラーになるので対策
    // 'import/order': 'off', // importの順序
    // 'import/prefer-default-export': 'off', // exportが1つしかない場合はdefaultにする
    // 'no-irregular-whitespace': ['error', { skipRegExps: true }], // 正規表現のみスペースの使用を許可する
    // 'no-nested-ternary': 'off', // 三項演算子のネストを許可しない
  },

  settings: {
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" },
    ],
  },
};
