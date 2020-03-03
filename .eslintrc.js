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
    'no-console': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warning' : 'off',
    'linebreak-style': [0, "windows"],
    "import/extensions": [0, "never"],
    "no-restricted-syntax": [0],
    "no-useless-return": [0]
  },
};
