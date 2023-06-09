import { ref, computed, onMounted, onUnmounted } from 'vue';
export default function () {
  const scrollPosition = ref(0);
  const windowWidth = ref(window.innerWidth);
  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  const handleScroll = () => (scrollPosition.value = window.scrollY);
  onMounted(() => {
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
  const scrollToSmoothly = (pos, time = 300) => {
    const currentPos = window.pageYOffset;
    const countHead = window.matchMedia('(min-width: 768px)').matches ? 2 : 1;
    const endPos = Number(
      typeof pos === 'string'
        ? document.querySelector(`#${pos}`).offsetTop -
            document.querySelector('header').offsetHeight * countHead
        : pos
    );
    let start = null;
    Number(time);
    window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      const progress = currentTime - start;
      if (currentPos < endPos) {
        window.scrollTo(0, ((endPos - currentPos) * progress) / time + currentPos);
      } else {
        window.scrollTo(0, currentPos - ((currentPos - endPos) * progress) / time);
      }
      if (progress < time) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, endPos);
      }
    });
  };
  return {
    sizes,
    windowWidth,
    scrollPosition,
    scrollToSmoothly
  };
}
