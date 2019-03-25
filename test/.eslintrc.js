module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  globals: {},
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018
  },
  extends: ['../.eslintrc.js'],
  rules: {
    // Customized Rules
    'no-console': 'off',
    'object-curly-newline': 'off'
  }
};