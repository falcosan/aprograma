export const useScreen = () => {
  const scrollPosition = ref(0);
  const windowWidth = ref(
    (typeof window === 'undefined' && 1024) ||
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
  );
  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  const handleScroll = () => (scrollPosition.value = window.scrollY);
  onBeforeMount(() => {
    window.addEventListener('resize', onWidthChange);
    window.addEventListener('scroll', handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', onWidthChange);
    window.removeEventListener('scroll', handleScroll);
  });
  const sizes = computed(() => ({
    xl: windowWidth.value >= 1280,
    lg: windowWidth.value >= 1024,
    md: windowWidth.value >= 768
  }));
  return {
    sizes,
    windowWidth,
    scrollPosition
  };
};
