import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.yarn', '.pnp.cjs', '.pnp.loader.mjs', 'yarn.lock'] },
  {
    extends: [js.configs.recommended],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-restricted-imports': ['error', {
        name: 'lodash',
        message: 'Please use "import foo from \'lodash/foo\'" instead.'
      }],
    },
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'semi': ['error', 'always'],
      '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'max-lines': ['error', { max: 120, skipBlankLines: true }],
    },
  },
);