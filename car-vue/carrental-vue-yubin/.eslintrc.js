module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "semi": 'off',
    'indent': 'off',
     'quotes': 'off',
     'comma-dangle': 'off',
    'vue/script-indent': [
      'error',
      4,
      {
        'baseIndent': 1
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-components':process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-parsing-error': [
        2,
      {
        "x-invalid-end-tag": false
      }
    ]
  }
}
