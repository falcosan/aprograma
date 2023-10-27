<template>
  <div class="translate text-xs">
    <div
      class="translate-container relative h-full z-10"
      :style="`background-color: ${parentBackgroundColor};`"
    >
      <div
        v-if="translateTransition"
        :class="`current-language cursor-pointer ${styleCurrentLanguage}`"
        @click="$emit('current-lang-action')"
      >
        <template v-for="selector in blok">
          <span
            v-if="
              cutLanguage(selector) === locale || (cutLanguage(selector) === 'en' && locale === '')
            "
            :key="selector._uid"
            class="language-item"
          >
            {{ selector.language.toUpperCase() }}
          </span>
        </template>
      </div>
    </div>
    <ul
      :class="`translate-list ${styleTranslateList}`"
      :style="`background-color: ${parentBackgroundColor};`"
    >
      <template v-for="language in blok">
        <li
          v-if="
            translateTransition
              ? (cutLanguage(language) !== locale && locale !== '') ||
                (cutLanguage(language) !== 'en' && locale === '')
              : true
          "
          :key="language._uid"
          :class="`translate-item cursor-pointer ${styleTranslateItem}`"
          @click="
            setLocale(language.language);
            $emit('translate-list-action');
          "
        >
          <span class="translate-language">{{ language.language.toUpperCase() }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    blok: {
      type: Array,
      required: true
    },
    translateTransition: {
      type: Boolean,
      default: false
    },
    parentBackgroundColor: {
      type: String,
      default: ''
    },
    styleTranslateItem: {
      type: String,
      default: ''
    },
    styleTranslateList: {
      type: String,
      default: ''
    },
    styleCurrentLanguage: {
      type: String,
      default: ''
    }
  },
  setup() {
    const { locale, setLocale, getBrowserLocale, getLocaleCookie, setLocaleCookie } = useI18n();
    const cookieLocale = getLocaleCookie();
    const browserLocale = getBrowserLocale();
    if (cookieLocale == null) {
      onMounted(() => {
        setLocale(browserLocale);
        setLocaleCookie(browserLocale);
      });
    }
    const cutLanguage = abbr => abbr.language.toLowerCase().substring(0, 2);
    return {
      locale,
      setLocale,
      cutLanguage
    };
  }
});
</script>
