module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['*.d.ts'],
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      extends: ['plugin:svelte/recommended'],
      parserOptions: {
        parser: {
          // Specify a parser for each lang.
          ts: '@typescript-eslint/parser',
          js: 'espree',
          typescript: '@typescript-eslint/parser',
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
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/ban-tslint-comment': 'error',
      },
    },
  ],
}
