<template>
  <li v-if="postContent" class="post-teaser w-full overflow-hidden rounded">
    <NuxtLink :to="`${blogRoute}${postLink}`" class="teaser-link">
      <div
        :class="`teaser-content h-full flex flex-col ${
          rowContainer || sliderContainer || containerContainer || carouselContainer
            ? ''
            : 'lg:flex-row'
        }`"
        @mouseover="expanded = true"
        @mouseleave="expanded = false"
      >
        <div
          :class="`teaser-file-container w-full aspect-video ${
            rowContainer || sliderContainer || containerContainer || carouselContainer
              ? ''
              : 'container-mode lg:w-1/2 md:aspect-[16/10] lg:aspect-[14/4] xl:aspect-[14/3] 2xl:aspect-[11/2]'
          } ${postContent.file.filename ? '' : 'bg-black'}`"
        >
          <component
            :is="postContent.file.filename ? lookFile ?? 'ImageSet' : 'ImageSet'"
            :loading="checkFile"
            :file="postContent.file"
            :class="`teaser-file w-full h-full object-center select-none ${
              postContent.file.filename ? 'object-cover' : 'object-contain'
            }`"
            :alt="
              postContent.file.filename
                ? lookFile === 'ImageSet'
                  ? postContent.file.alt
                  : false
                : $languageCase('quantum vacuum', 'vacío cuántico', 'vuoto quantistico')
            "
            :src="setFile"
            :width="checkFile ? '1200' : false"
            :height="checkFile ? '434' : false"
            :sizes="checkFile ? 'xs:299px sm:380px md:514px lg:620px xl:984px 2xl:1200px' : false"
          />
        </div>
        <div
          :class="`teaser-text w-full flex flex-col flex-auto justify-between space-y-2.5 lg:space-y-px 2xl:space-y-0 p-5 ${
            rowContainer || sliderContainer || carouselContainer || containerContainer
              ? ''
              : 'lg:w-1/2'
          }`"
          :style="`background-color: ${
            postContent.background_color.color ? postContent.background_color.color : '#e0e0e0'
          }; color: ${postContent.text_color.color};`"
        >
          <div class="text-description">
            <span class="teaser-title mb-2.5 overflow-hidden text-lg sm:text-xl">
              {{ postContent.title }}
            </span>
            <span class="teaser-intro h-12 overflow-hidden leading-relaxed text-sm">
              {{ postContent.intro }}
            </span>
          </div>
          <ul class="teaser-categories w-full flex flex-wrap lg:flex-nowrap -mx-1 overflow-x-auto">
            <li
              v-for="(category, index) in sortedCategories"
              :key="index"
              class="teaser-category text-xs p-2 m-1 rounded shadow italic brightness-90"
              :style="`background-color: ${
                postContent.background_color.color ? postContent.background_color.color : '#e0e0e0'
              };`"
            >
              {{ category }}
            </li>
          </ul>
          <span
            class="teaser-date flex-none self-end text-xs text-right"
            v-text="changeDate(postContent.date)"
          />
        </div>
      </div>
    </NuxtLink>
  </li>
</template>

<script>
export default {
  props: {
    postContent: {
      type: Object,
      required: true
    },
    postLink: {
      type: String,
      required: true
    },
    rowContainer: {
      type: Boolean,
      required: true
    },
    sliderContainer: {
      type: Boolean,
      required: true
    },
    carouselContainer: {
      type: Boolean,
      required: true
    },
    containerContainer: {
      type: Boolean,
      required: true
    },
    fullWidth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    blogRoute() {
      return /blog/.test(window.location.pathname) ? '' : 'blog/';
    },
    setFile() {
      return this.postContent.file.filename
        ? this.postContent.file.filename
        : 'https://a.storyblok.com/f/106240/4065x1468/5c83c3e7de/noimeageteaser.png';
    },
    sortedCategories() {
      return this.postContent.categories
        .map(category => category.toLowerCase().split('; ')[this.$languageCase(0, 1, 2)])
        .sort();
    },
    lookFile() {
      switch (this.postContent.file.filename.toLowerCase().split('.').pop()) {
        case 'pdf':
          return 'embed';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'svg':
        case 'webp':
        case 'bmp':
        case 'tiff':
          return 'ImageSet';
        default:
          return null;
      }
    },
    checkFile() {
      return this.lookFile === 'ImageSet' || !this.postContent.file.filename;
    }
  },
  methods: {
    changeDate(date) {
      const currentDateTime = new Date(date.replace(' ', 'T'));
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`;
      return formattedDate.toString();
    }
  }
};
</script>
<style scoped>
@supports not (aspect-ratio: 1 / 1) {
  .post-teaser {
    @apply lg:h-[212px] xl:h-[184px] 2xl:h-[182px];
  }
  .teaser-file-container {
    @apply relative md:h-[calc(50%_-_20px)] lg:h-full flex-none lg:flex-auto;
  }
  .teaser-file-container::before {
    content: '';
    @apply float-left pt-[calc((9_/_16)_*_100%)];
  }
  .teaser-file-container.container-mode::before {
    @apply md:pt-[calc((10_/_16)_*_100%)] lg:pt-[calc((4_/_14)_*_100%)] xl:pt-[calc((3_/_14)_*_100%)] 2xl:pt-[calc((2_/_11)_*_100%)];
  }
  .teaser-file-container::after {
    content: '';
    @apply block clear-both;
  }
}
.teaser-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.teaser-intro {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
