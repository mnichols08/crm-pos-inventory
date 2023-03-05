module.exports = {
  extends: ['../.eslintrc.js','plugin:jsdoc/recommended'],
  plugins: ['jsdoc'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', '/']
      }
    }
  },
  rules: {
    'no-console': 0,
    'jsdoc/newline-after-description': 0,
    // NOTE: This is added since eslint-plugin-import does not support exports in package.json
    // which is what firebase-admin v10 uses. See: https://github.com/import-js/eslint-plugin-import/issues/1810
    'import/no-unresolved': [
      2,
      {
        ignore: [
          'firebase-admin/app',
          'firebase-admin/database',
          'firebase-admin/auth',
          'firebase-admin/storage',
          'firebase-admin/firestore',
          'firebase-admin/messaging',
          'firebase-admin/project-management',
          'firebase-admin/remote-config',
          'firebase-admin/instanceId',
          'firebase-admin/machine-learning'
        ]
      }
    ]
  },
  overrides: [
    ,
    {
      files: ['src/**/*.spec.js'],
      env: {
        jest: true
      },
      globals: {
        functionsTest: true,
        projectId: true
      },
      rules: {
        'no-console': 0,
        'no-unused-expressions': 0,
        'import/no-dynamic-require': 0,
        'import/prefer-default-export': 0
      }
    }
  ]
}
