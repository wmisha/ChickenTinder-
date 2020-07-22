module.exports = {
  env: {
    browser: false,
    es2020: true
  },
  globals: {
    'fetch': true,
    'Exception': true,
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    "react/prop-types": 0
  }
}
