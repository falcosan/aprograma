import { useWindowSize, useWindowScroll, useElementSize, useMutationObserver } from '@vueuse/core';

export const useScreen = () => {
  const { width: windowWidth } = useWindowSize();
  const { y: scrollPosition } = useWindowScroll();
  const windowLoad = computed(
    () => typeof window === 'undefined' && String(windowWidth.value).toLowerCase() === 'infinity'
  );
  const elementSize = element => useElementSize(element);
  const elementObserver = (element, callback, config = { attributes: true }) =>
    useMutationObserver(element, mutations => callback(mutations), config);
  return {
    windowLoad,
    windowWidth,
    elementSize,
    scrollPosition,
    elementObserver
  };
};
