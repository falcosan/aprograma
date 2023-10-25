import store from '@/store';
export default defineNuxtRouteMiddleware(() => {
  const locale = useCookie('locale');
  const { languageAction } = store.language();
  if (locale.value) languageAction(locale.value);
});
