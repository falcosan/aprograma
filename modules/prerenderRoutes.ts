import { Data } from '../schema/enums';
import { isProduction } from 'std-env';
import { fetchStories } from '../utils/fetch';
import { defineNuxtModule, addPrerenderRoutes } from '@nuxt/kit';

export default defineNuxtModule({
  async setup() {
    const envProductionDomain =
      isProduction && !/netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify');
    const staticRoutes = [
      '/',
      `/${Data.sitemap}`,
      envProductionDomain ? '/robots.txt' : null,
      ...Object.values(Data.rss).map(item => {
        if (item instanceof Object) return `/${item.path}`;
        else return '';
      })
    ].filter(route => typeof route === 'string')
    const dynamicRoutes = await fetchStories();
    const routes = [...staticRoutes, ...dynamicRoutes]
    addPrerenderRoutes(routes);
  }
});
