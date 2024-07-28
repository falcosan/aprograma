import { isProduction, isDevelopment } from 'std-env'

export const Mode = {
  production:
    isProduction && !/netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify'),
  development: !!(
    isDevelopment ||
    /netlify/gm.test(process.env.NUXT_ENV_DOMAIN || 'netlify') ||
    process.env.NUXT_ENV_LOCAL_BUILD
  )
}
