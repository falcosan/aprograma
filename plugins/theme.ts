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
        storageKey: 'ap_mode_cross_tab',
        initialValue: storageMode.value,
        onChanged: (val, defaultHandler) => {
          storageMode.value = val
          console.log(val)

          defaultHandler(val)
        }
      })
    }
  }
})
