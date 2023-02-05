module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'react-app',
    'react-app/jest',
    'prettier',
  ],
  parserOptions: { project: ['./tsconfig.json'] },
  env: {
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/no-empty-function': 1,
    'no-var': 1,
    '@typescript-eslint/ban-types': 1,
  },
}
