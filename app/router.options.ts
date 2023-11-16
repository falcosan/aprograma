import type { RouterOptions } from '@nuxt/schema';
export default <RouterOptions>{
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) return savedPosition;
    else {
      const { $scrollToSmoothly } = useNuxtApp();
      $scrollToSmoothly(0);
    }
  }
};
