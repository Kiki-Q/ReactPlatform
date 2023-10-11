module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'no-undef': 'off',
    'no-console': 'off',
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     ts: 'never',
    //     tsx: 'never',
    //     js: 'never',
    //     jsx: 'never',
    //     mjs: 'never',
    //   },
    // ],
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-named-as-default': 'off',
    // dev
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unreachable-loop': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    // [
    //   'error',
    //   {
    //     props: true,
    //     ignorePropertyModificationsFor: [
    //       'e', // for e.returnvalue
    //       'ctx', // for Koa routing
    //       'req', // for Express requests
    //       'request', // for Express requests
    //       'res', // for Express responses
    //       'response', // for Express responses
    //       'state', // for redux state
    //       'config',
    //     ],
    //   },
    // ],
    '@typescript-eslint/no-shadow': 'off',
  },
};
