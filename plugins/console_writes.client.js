import { getWilly } from '@/utils/console';
export default defineNuxtPlugin(({ $i18n }) => {
  const config = useRuntimeConfig();
  const { locale } = $i18n;
  watch(
    locale,
    () => {
      switch (locale.value) {
        case 'es':
          return getWilly('Yo soy Willy');
        case 'it':
          return getWilly('Io sono Willy');
        default:
          return getWilly("I'm Willy");
      }
    },
    { immediate: config.public.envProductionDomain }
  );
});
