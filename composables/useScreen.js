import { useWindowSize, useWindowScroll, useElementSize } from '@vueuse/core';

export const useScreen = () => {
  const { width: windowWidth } = useWindowSize();
  const { y: scrollPosition } = useWindowScroll();
  const elementSize = element => useElementSize(element);
  const sizes = computed(() => ({
    xl: windowWidth.value >= 1280,
    lg: windowWidth.value >= 1024,
    md: windowWidth.value >= 768
  }));
  return {
    sizes,
    windowWidth,
    elementSize,
    scrollPosition
  };
};
