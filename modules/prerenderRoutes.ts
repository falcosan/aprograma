import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit';
import { fetchStories } from '../services/fetch';
import enums from '../utils/enums';

export default defineNuxtModule({
  async setup() {
    const staticRoutes = [
      '/',
      `/${enums.sitemap}`,
      ...Object.values(enums.rss)
        .map(item => {
          if (item instanceof Object) return `/${item.path}`;
          else return '';
        })
        .filter(Boolean)
    ];
    const dynamicRoutes = await fetchStories();
    const routes = [...staticRoutes, ...dynamicRoutes];
    addPrerenderRoutes(routes);
  }
});
