type FetcherResult<T> = { data: T }
type FetcherOptions = {
  watcher?: boolean
  headers?: HeadersInit
  startsWith?: string | null
}

export async function useFetcher<T>(
  route: ComputedRef<string> | Ref<string> | string,
  options?: FetcherOptions
): Promise<FetcherResult<T>> {
  const slug = unref(route)
  const { locale } = useI18n()

  const fetchData = async (): Promise<T> => {
    const data = await $fetch('/api/storyblok', {
      params: {
        lang: locale.value,
        ...(options?.startsWith ? { startsWith: options.startsWith } : { slug })
      }
    })

    return data.story ?? data.stories
  }

  const { data } = await useAsyncData<T>(`${slug}-${locale.value}`, fetchData)

  return { data: data as FetcherResult<T>['data'] }
}
