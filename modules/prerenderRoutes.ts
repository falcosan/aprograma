import { isProduction } from 'std-env';
import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit';
import enums from '../utils/enums';
import { fetchStories } from '../utils/fetch';
export default defineNuxtModule({
  async setup() {
    const envProductionDomain =
      isProduction && !/netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify');
    const staticRoutes = [
      '/',
      `/${enums.sitemap}`,
      envProductionDomain ? '/robots.txt' : null,
      ...Object.values(enums.rss).map(item => {
        if (item instanceof Object) return `/${item.path}`;
        else return '';
      })
    ].filter(Boolean);
    const dynamicRoutes = await fetchStories();
    const routes = [...staticRoutes, ...dynamicRoutes];
    addPrerenderRoutes(routes);
  }
});
