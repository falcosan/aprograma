/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NuxtError } from '#app'
import type { KeysOf, PickFrom } from '#app/composables/asyncData'

type FetcherInstance = string | Ref<string> | ComputedRef<string>
type FetcherResult<T> = {
  data: Ref<PickFrom<T, KeysOf<T>> | null>
  error: Ref<NuxtError<unknown> | null>
  refresh: () => Promise<void>
}
type FetcherOptions = {
  watcher?: boolean
  headers?: HeadersInit
  startsWith?: string | null
}

export async function useFetcher<T>(
  route: FetcherInstance,
  options?: FetcherOptions
): Promise<FetcherResult<T>> {
  const slug = unref(route)
  const { locale } = useI18n()
  const nuxtApp = tryUseNuxtApp()

  const fetchData = async (): Promise<T> => {
    const cookie = useRequestHeaders(['cookie'])

    const data = await $fetch('/api/storyblok', {
      params: {
        lang: locale.value,
        ...(options?.startsWith ? { startsWith: options.startsWith } : { slug })
      },
      headers: { ...cookie, ...(options?.headers ?? {}) }
    })

    return data.story ?? data.stories
  }

  const requestFromClient = async (fetcher: () => Promise<T>) => {
    const state = reactive({
      data: null as unknown as FetcherResult<T>['data'],
      error: null as unknown as FetcherResult<T>['error']
    })
    const { data, error } = toRefs(state)

    const refresh = async () => {
      try {
        data.value = await fetcher()
      } catch (err: any) {
        error.value = err.data ?? err
      }
    }

    await refresh()

    return { data, error, refresh }
  }

  if (nuxtApp) {
    const isFromServer = !(import.meta.client && !nuxtApp.isHydrating)

    if (!isFromServer) return await requestFromClient(fetchData)

    const { data, error, refresh } = await useAsyncData<T>(
      slug.split('?')[0],
      fetchData,
      { ...(!!options?.watcher && { watch: [locale] }) }
    )

    return { data, error, refresh }
  } else {
    return await requestFromClient(fetchData)
  }
}
