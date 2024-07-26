import { Mode } from './mode'
import { isProduction, isDevelopment } from 'std-env';

const Public = {
  envProductionDomain: Mode.production,
  envXAuth: process.env.NUXT_ENV_X_AUTH,
  envDomain: process.env.NUXT_ENV_DOMAIN,
  envApiVersion: process.env.NUXT_ENV_API_VERSION,
  envPaymentPointer: process.env.NUXT_ENV_PAYMENT_POINTER,
  envMode: { production: isProduction, development: isDevelopment },
  envGoogleSiteVerification: process.env.NUXT_ENV_GOOGLE_SITE_VERIFICATION
}

const Private = {
  envAccessToken: process.env.NUXT_ENV_ACCESS_TOKEN,
}

export const ENV = {
  Public,
  Private,
}
