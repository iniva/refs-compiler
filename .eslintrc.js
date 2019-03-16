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
  extends: ['airbnb-base'],
  rules: {
    // Customized Rules
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
  }
};
