module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  ignorePatterns: ['.eslintrc.js', '**/dist/**'],
  rules: {
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-empty-function': 1,
    'no-var': 1,
    '@typescript-eslint/ban-types': 1,
  },
};
