module.exports = {
  env: {
    browser: true,
    es6: true,
    "cypress/globals": true
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'cypress'
  ],
  rules: {
    'no-restricted-syntax': 'off',
    'prefer-destructuring': 'warn',
    'curly': [
      'error',
      'all',
    ],
    'brace-style': [
      'error',
      '1tbs',
      {
        'allowSingleLine': false,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'never',
        'prev': '*',
        'next': '*',
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': 'function',
      },
      {
        'blankLine': 'always',
        'prev': [
          'function',
          'import',
          'export',
          'cjs-import',
          'cjs-export',
        ],
        'next': '*',
      },
      {
        'blankLine': 'never',
        'prev': [
          'import',
          'cjs-import',
        ],
        'next': [
          'import',
          'cjs-import',
        ],
      },
      {
        'blankLine': 'always',
        'prev': '*',
        'next': [
          'export',
          'cjs-export',
        ],
      },
      {
        'blankLine': 'any',
        'prev': 'multiline-expression',
        'next': '*',
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 0,
        'maxBOF': 0,
      },
    ],
    'no-use-before-define': [
      'error',
      {
        'functions': false,
      },
    ],
    'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'always'],
    'import/extensions': ['error', 'always', {'ignorePackages': true}],
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/prop-types': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off'
  },
};
