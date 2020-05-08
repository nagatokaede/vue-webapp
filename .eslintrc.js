module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: [
    'vue',
  ],
  rules: {
    // 禁止 console
    'no-console': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'config',
      ]
    }],
    'linebreak-style': 'off',
  },
};
