import type { MaybeComputedElementRef, MaybeElement } from '@vueuse/core'

export const useScreen = () => {
  const { width: windowWidth } = useWindowSize()
  const elementSize = (element: MaybeComputedElementRef<MaybeElement>) =>
    useElementSize(element)
  return {
    windowWidth,
    elementSize
  }
}
