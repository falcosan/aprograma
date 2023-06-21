<template>
  <div class="translate-container text-xs">
    <div
      v-if="translateTransition"
      :class="`current-language cursor-pointer ${styleCurrentLanguage}`"
      @click="$emit('current-lang-action')"
    >
      <template v-for="selector in blok">
        <span
          v-if="
            cutLanguage(selector) === languageGet ||
            (cutLanguage(selector) === 'en' && languageGet === '')
          "
          :key="selector._uid"
          class="language-item"
        >
          {{ selector.language.toUpperCase() }}
        </span>
      </template>
    </div>
    <ul :class="`translate-list ${styleTranslateList}`">
      <template v-for="language in blok">
        <li
          v-if="
            translateTransition
              ? (cutLanguage(language) !== languageGet && languageGet !== '') ||
                (cutLanguage(language) !== 'en' && languageGet === '')
              : true
          "
          :key="language._uid"
          :class="`translate-item cursor-pointer ${styleTranslateItem} ${
            !translateTransition &&
            (cutLanguage(language) === languageGet ||
              (cutLanguage(language) === 'en' && languageGet === ''))
              ? 'bg-neutral-800 text-white'
              : ''
          }`"
          @click="
            changeLanguage(language.language);
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
import { storeToRefs } from 'pinia';
import store from '@/store';
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
    const languageStore = store.language();
    const { languageAction } = languageStore;
    const { languageGet } = storeToRefs(languageStore);
    const changeLanguage = lang => languageAction(lang);
    const cutLanguage = abbr => abbr.language.toLowerCase().substring(0, 2);
    onBeforeMount(() => {
      const locale = localStorage.getItem('locale');
      if (locale) changeLanguage(locale);
    });
    watch(
      languageGet,
      val => {
        if (val) {
          document.documentElement.setAttribute('lang', val);
          localStorage.setItem('locale', val);
        } else {
          changeLanguage(Intl.DateTimeFormat().resolvedOptions().locale);
        }
      },
      {
        immediate: true
      }
    );
    return {
      languageGet,
      cutLanguage,
      changeLanguage
    };
  }
});
</script>
