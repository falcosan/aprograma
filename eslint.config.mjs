import pluginVue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...pluginVue.configs['flat/recommended'], {
    ignores: ['{dist,public}/**/*'],
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "vue/no-v-html": "off",
      "vue/multi-word-component-names": "off",

      "no-console": ["warn", {
          allow: ["error"],
      }],
    },
  },
)