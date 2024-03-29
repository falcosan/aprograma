import VueGtag, { trackRouter } from 'vue-gtag-next';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig();
  if (config.public.envMode.production) {
    nuxtApp.vueApp.use(VueGtag, {
      property: {
        id: config.public.envGTagId
      }
    });
    trackRouter(useRouter());
  }
});
