module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  // parserOptions: {
  //   ecmaVersion: 2018,
  // },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        /* useTabs: true,*/
        tabWidth: 2,
      },
    ],
  },
};
