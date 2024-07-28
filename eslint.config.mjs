import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'

export default withNuxt(
  eslintConfigPrettier,
  ...pluginVue.configs['flat/essential'],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ignores: ['node_modules', 'dist', 'public', '.nuxt'],
    rules: {
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
      'no-console': [
        'warn',
        {
          allow: ['error']
        }
      ]
    }
  }
)
