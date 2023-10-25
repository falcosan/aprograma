import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit';
import enums from '../utils/enums';

export default defineNuxtModule({
  setup() {
    const routes = [
      `/${enums.sitemap}`,
      ...Object.values(enums.rss)
        .map(item => {
          if (item instanceof Object) return `/${item.path}`;
          else return '';
        })
        .filter(Boolean)
    ];
    addPrerenderRoutes(routes);
  }
});
