export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', config.public.envGTagId);
});
