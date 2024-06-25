import { useWindowSize, useElementSize } from '@vueuse/core';

export const useScreen = () => {
  const { width: windowWidth } = useWindowSize();
  const elementSize = element => useElementSize(element);
  return {
    windowWidth,
    elementSize
  };
};
