import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) return savedPosition;
    else {
      const { $scrollToSmoothly } = useNuxtApp();
      $scrollToSmoothly(0);
    }
  }
};
