import { type BaseFormatProps } from 'vue-i18n'

export default defineNuxtPlugin((app) => ({
  provide: {
    languageCase: (english: string, spanish: string, italian: string) => {
      const i18n = app.$i18n as BaseFormatProps['i18n']

      switch (i18n?.locale.value) {
        case 'es':
          return spanish
        case 'it':
          return italian
        default:
          return english
      }
    }
  }
}))
