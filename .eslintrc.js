module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-use-before-define': 0,
    'jsx-a11y/no-autofocus': 0,
    'react/sort-comp': 0,
    'react/prefer-stateless-function': 0,
    'no-underscore-dangle': 0,
    'no-debugger': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'object-shorthand': 0,
    'react/forbid-prop-types': 0,
    'class-methods-use-this': 0,
    'no-param-reassign': [
      2,
      {
        props: false
      }
    ],
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'arrow-parens': ['error', 'as-needed'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-default': 0,
    'no-self-compare': 0,
    'no-new': 0,
    'jsx-a11y/label-has-for': 0,
    'no-shadow': 0,
    'no-case-declarations': 0,
    camelcase: 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
    'react/jsx-pascal-case': 0,
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
