<template>
  <div class="post p-5">
    <div class="post-head relative w-full mb-5">
      <h1 class="post-title text-2xl sm:text-3xl" v-text="blok.title" />
      <div
        :class="`post-file-container w-full h-full overflow-hidden rounded ${
          blok.file.filename ? '' : 'bg-black'
        }`"
      >
        <component
          :is="blok.file.filename ? lookFile : 'ImageSet'"
          :format="checkImage ? 'webp' : false"
          class="post-file w-full h-full aspect-[13/8] object-center select-none object-cover"
          :alt="
            blok.file.filename
              ? lookFile === 'ImageSet'
                ? blok.file.alt
                : false
              : $languageCase(
                  'quantum vacuum',
                  'vacío cuántico',
                  'vuoto quantistico'
                )
          "
          :src="setFile"
          :file="blok.file"
          :width="checkImage ? '1366' : false"
          :height="checkImage ? '707' : false"
          :sizes="
            checkImage ? 'xs:380px sm:514px md:711px lg:804px xl:1366px' : false
          "
        />
      </div>
    </div>
    <div
      class="post-body w-full justify-center rounded"
      :style="`background-color: ${
        blok.background_color.color ? blok.background_color.color : '#e0e0e0'
      };`"
    >
      <div class="post-action flex flex-wrap justify-end pt-5 px-5">
        <Icon
          arrow
          :style="`background-color: ${
            blok.background_color.color
              ? blok.background_color.color
              : '#e0e0e0'
          }; color: ${blok.text_color.color};`"
          class="post-close rounded shadow"
          tag="button"
          size="p-3 w-10 h-10"
          @click="$goBack"
        />
      </div>
      <div class="post-article w-full max-w-prose p-5 mx-auto my-0">
        <h2
          :style="`color: ${blok.text_color.color};`"
          class="post-intro text-xl sm:text-2xl"
          v-text="blok.intro"
        />
        <div class="post-info">
          <p
            :style="`color: ${blok.text_color.color};`"
            class="post-author text-sm font-semibold"
          >
            {{ $languageCase("by", "de", "di") }}
            {{
              blok.author
                ? blok.author
                : $languageCase("Anonymous", "Anónimo", "Anonimo")
            }}
          </p>
          <p
            :style="`color: ${blok.text_color.color};`"
            class="post-date mt-2.5 text-xs"
            v-text="changeDate(blok.date)"
          />
          <ul
            class="post-categories flex flex-wrap justify-end mt-5 -mb-1.5 -mx-1.5"
          >
            <li
              v-for="(category, index) in sortedCategories"
              :key="index"
              class="post-category self-start m-1.5 p-2 text-center text-xs rounded shadow italic brightness-90"
              :style="`background-color: ${
                blok.background_color.color
                  ? blok.background_color.color
                  : '#e0e0e0'
              }; color: ${blok.text_color.color};`"
            >
              {{ category }}
            </li>
          </ul>
        </div>
        <article
          :style="`color: ${blok.text_color.color};`"
          :class="`post-article markdown block my-5 ${setAlignText}`"
          v-html="markdownToHtml(blok.long_text)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import markdown from "~/mixins/markdown";
export default {
  mixins: [markdown],
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    lookFile() {
      switch (this.blok.file.filename.toLowerCase().split(".").pop()) {
        case "pdf":
          return "embed";
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "svg":
        case "webp":
        case "bmp":
        case "tiff":
          return "ImageSet";
      }
    },
    setFile() {
      return this.blok.file.filename
        ? this.blok.file.filename
        : "https://a.storyblok.com/f/106240/4067x2440/49d9d1a222/noimagedetail.png";
    },
    sortedCategories() {
      return this.blok.categories
        .map(
          (category) =>
            category.toLowerCase().split("; ")[this.$languageCase(0, 1, 2)]
        )
        .sort();
    },
    checkImage() {
      return this.lookFile === "ImageSet" || !this.blok.file.filename;
    },
    setAlignText() {
      switch (this.blok.align_text) {
        case "right":
          return "text-right";
        case "center":
          return "text-center";
        case "justify":
          return "text-justify";
      }
      return "";
    },
  },
  methods: {
    changeDate(date) {
      const currentDateTime = new Date(date.replace(" ", "T"));
      const formattedDate = `${currentDateTime.getDate()} / ${
        currentDateTime.getMonth() + 1
      } / ${currentDateTime.getFullYear()}`;
      return formattedDate.toString();
    },
  },
};
</script>
<style scoped>
@supports not (aspect-ratio: 1 / 1) {
  .post-file::before {
    content: "";
    @apply float-left pt-[calc((8_/_13)_*_100%)];
  }
  .post-file::after {
    content: "";
    @apply block clear-both;
  }
}
</style>
