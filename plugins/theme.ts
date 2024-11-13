import { useColorMode } from '@vueuse/core'

export default defineNuxtPlugin(() => {
  const storageModeKey = 'ap_mode'
  const storageMode = useCookie(storageModeKey, {
    sameSite: 'lax',
    default: () => 'light'
  })

  useServerHead({ htmlAttrs: { class: storageMode.value } })

  return {
    provide: {
      mode: useColorMode({
        initialValue: storageMode.value,
        storageKey: `${storageModeKey}_cross_tabs`,
        onChanged: (val, defaultHandler) => {
          defaultHandler(val)
          if (storageMode.value !== val) storageMode.value = val
        }
      })
    }
  }
})
