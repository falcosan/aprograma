export default defineNuxtPlugin(() => {
  const { visibility } = useScreen();
  const lastFetch = ref(new Date().getTime());
  watch(visibility, val => {
    if (val === 'visible') {
      const now = new Date().getTime();
      if (now - lastFetch.value > 600000) window.location.reload();
      lastFetch.value = now;
    }
  });
});
