module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 'off',
    'linebreak-style': [0, "windows"],
    "import/extensions": [0, "never"],
    "no-restricted-syntax": [0],
    "no-useless-return": [0]
  },
};
