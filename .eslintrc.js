module.exports = {
  root: true,

  extends: [
    'eslint:recommended',
    //'prettier'
  ],
  plugins: ['only-warn'],
  //plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@angular-eslint/recommended',
        //'plugin:prettier/recommended',
        'airbnb-typescript',
      ],
      rules: {
        'react/jsx-filename-extension': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',

        'arrow-spacing': ['warn', { before: true, after: true }],
        'object-curly-spacing': ['warn', 'always'],
        'block-spacing': ['warn', 'always'],
        'semi-spacing': ['warn', { before: false, after: true }],
        'arrow-parens': ['warn', 'as-needed'],
        
        //'@typescript-eslint/comma-dangle': ['warn', 'only-multiline', { functions: 'never'}],
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-extra-parens': ['warn', 'all', { nestedBinaryExpressions: false }],
        '@typescript-eslint/quotes': ['warn', 'single', { allowTemplateLiterals: true }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        '@angular-eslint/no-empty-lifecycle-method': 'off',
        '@angular-eslint/component-class-suffix': [
          'warn',
          {
            suffixes: ['Component', 'Page'],
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            prefix: 'ill',
            style: 'kebab-case',
            type: 'element',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            prefix: 'ill',
            style: 'camelCase',
            type: 'attribute',
          },
        ],
      },
    },
    {
      files: ['**/*.html'],
      extends: [
        'plugin:@angular-eslint/template/recommended',
        //'plugin:prettier/recommended'
      ],
      rules: {
        //'prettier/prettier': 'warn',
      },
    },
  ],
};
