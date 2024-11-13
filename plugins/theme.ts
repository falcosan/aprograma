import { useColorMode } from '@vueuse/core'

export default defineNuxtPlugin(() => {
  const storageMode = useCookie('ap_mode', {
    sameSite: 'lax',
    default: () => 'light'
  })

  return {
    provide: {
      mode: useColorMode({
        storageKey: 'ap_mode_cross_tab',
        initialValue: storageMode.value,
        onChanged: (val, defaultHandler) => {
          storageMode.value = val
          defaultHandler(val)
        }
      })
    }
  }
})
