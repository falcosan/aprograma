import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit';
import { fetchStories } from '../services/fetch';
import enums from '../utils/enums';

export default defineNuxtModule({
  async setup() {
    const routes = [
      '/',
      `/${enums.sitemap}`,
      ...Object.values(enums.rss)
        .map(item => {
          if (item instanceof Object) return `/${item.path}`;
          else return '';
        })
        .filter(Boolean)
    ];
    try {
      const dynamicRoutes = await fetchStories();
      routes.push(...dynamicRoutes);
    } catch (err) {
      console.error(err);
    }
    addPrerenderRoutes(routes);
  }
});
