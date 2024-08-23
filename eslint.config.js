import eslintPluginSvelte from 'eslint-plugin-svelte'
import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import tseslint from 'typescript-eslint'
import tsParser from '@typescript-eslint/parser'

export default [
  ...eslintPluginSvelte.configs['flat/recommended'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parser: svelteParser,
      ecmaVersion: 'latest',
      sourceType: 'script',

      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.svelte'],
      },
    },

    // 👉🏽 https://github.com/sveltejs/eslint-plugin-svelte?tab=readme-ov-file#white_check_mark-rules
    rules: {
      'svelte/no-target-blank': 'error',
      'svelte/button-has-type': 'warn',
      'svelte/html-self-closing': [
        'error',
        {
          void: 'always',
          normal: 'never',
          component: 'always',
          svelte: 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      '@typescript-eslint/ban-tslint-comment': 'error',
    },
  },
  {
    ignores: ['**/*.d.ts', 'dist/*'],
  },
]
