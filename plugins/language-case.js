export default defineNuxtPlugin(({ $i18n }) => ({
  provide: {
    languageCase: (english, spanish, italian) => {
      const { locale } = $i18n;
      switch (locale.value) {
        case 'es':
          return spanish;
        case 'it':
          return italian;
        default:
          return english;
      }
    }
  }
}));
