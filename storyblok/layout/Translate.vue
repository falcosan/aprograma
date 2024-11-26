<template>
  <div class="translate text-xs">
    <div
      class="translate-container relative h-full z-10"
      :style="`background-color: ${parentBackgroundColor};`"
    >
      <div
        v-if="translateTransition"
        :class="`current-language cursor-pointer ${styleCurrentLanguage}`"
        @click="currentLangAction"
      >
        <template v-for="selector in blok">
          <span
            v-if="
              cutLanguage(selector) === locale ||
              (cutLanguage(selector) === 'en' && locale === '')
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
          @click="setLocaleWithTranslateList(language.language)"
        >
          <span class="translate-language">{{
            language.language.toUpperCase()
          }}</span>
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
  emits: ['current-lang-action', 'translate-list-action'],
  setup(_, { emit }) {
    const { locale, setLocale } = useI18n()
    const cutLanguage = (abbr) => abbr.language.toLowerCase().substring(0, 2)
    const currentLangAction = () => emit('current-lang-action')
    const setLocaleWithTranslateList = (language) => {
      emit('translate-list-action')
      setLocale(language)
    }
    return {
      locale,
      cutLanguage,
      currentLangAction,
      setLocaleWithTranslateList
    }
  }
})
</script>
