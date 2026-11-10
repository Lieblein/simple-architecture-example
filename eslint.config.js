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
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'max-lines': ['error', { max: 120, skipBlankLines: true }],
    },
  },
);