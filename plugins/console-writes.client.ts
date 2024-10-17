import { getWilly } from '@/utils/console'
import type { BaseFormatProps } from 'vue-i18n'

export default defineNuxtPlugin((app) => {
  const config = useRuntimeConfig()
  const i18n = app.$i18n as BaseFormatProps['i18n']

  watch(
    () => i18n,
    (val) => {
      switch (val?.locale.value) {
        case 'es':
          return getWilly('Yo soy Willy')
        case 'it':
          return getWilly('Io sono Willy')
        default:
          return getWilly("I'm Willy")
      }
    },
    { immediate: config.public.envProductionDomain }
  )
})
