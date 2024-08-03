import { useColorMode } from '@vueuse/core'

export default defineNuxtPlugin(() => {
  const storageMode = useCookie('ap_mode', {
    sameSite: 'lax',
    default: () => 'light'
  })

  useServerHead({ htmlAttrs: { class: storageMode.value } })

  return {
    provide: {
      mode: useColorMode({
        storageKey: 'mode-cross-tab',
        initialValue: storageMode.value,
        storage: {
          getItem: () => storageMode.value,
          removeItem: () => (storageMode.value = 'light'),
          setItem: (_, value) => (storageMode.value = value)
        },
        onChanged: (val, defaultHandler) => {
          storageMode.value = val
          defaultHandler(val)
        }
      })
    }
  }
})
