export default [
  {
    ignores: [
      'cypress/generated/**',
      'cypress/reports/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
      'node_modules/**',
    ],
  },
  {
    files: ['cypress/e2e/step_definitions/**/*.js', 'cypress/support/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-dupe-keys': 'error',
      'no-redeclare': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'valid-typeof': 'error',
    },
  },
]
