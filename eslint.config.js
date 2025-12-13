import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  typescript: true,
  stylistic: true,
  rules: {
    'vue/multi-word-component-names': 'off',
    'antfu/if-newline': 'off',
    'style/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'curly': ['error', 'multi-or-nest', 'consistent'],
    'style/semi': ['error', 'always'],
    'style/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      },
    ],
  },
  ignores: ['dist', 'node_modules', '*.yaml', '*.yml'],
});
