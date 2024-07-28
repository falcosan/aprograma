import { type AsyncDataRequestStatus } from '#app'

type FetcherInstance = ComputedRef<string> | Ref<string> | string
type FetcherResult<T> = {
  data: T
  status: Ref<AsyncDataRequestStatus>
  refresh?: () => Promise<void>
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
  const config = useRuntimeConfig()

  const fetchData = async (): Promise<T> => {
    const data = await $fetch('/api/storyblok', {
      headers: { 'x-auth': config.public.envXAuth, ...options?.headers },
      params: {
        lang: locale.value,
        ...(options?.startsWith ? { startsWith: options.startsWith } : { slug })
      }
    })

    return data.story ?? data.stories
  }

  const { data, status, refresh } = await useAsyncData<T>(slug, fetchData, {
    ...(!!options?.watcher && { watch: [locale] })
  })

  return { data: data as FetcherResult<T>['data'], status, refresh }
}
