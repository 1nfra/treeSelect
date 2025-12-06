import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  rules: {
    'vue/multi-word-component-names': 'off',
  },
  ignores: ['dist', 'node_modules'],
})
