<template>
  <div v-if="sortedPosts.length" class="posts w-full">
    <div v-if="blok.search_action" class="post-search grid self-start mb-5">
      <input
        v-model="searchTerm"
        :placeholder="$languageCase('Search the post', 'Busca el post', 'Cerca il post')"
        class="search-bar w-full h-10 p-2 rounded border border-gray-500 text-black bg-gray-50"
        type="text"
      />
    </div>
    <div
      v-if="blok.categories_action && sortedCategories.length"
      class="post-categories grid relative overflow-hidden"
    >
      <div
        :class="`show-categories flex justify-self-end row-start-2 row-end-1 mb-5 cursor-pointer rounded transition bg-gray-200 ${
          !isDesktop ? '' : 'hover:opacity-80'
        }`"
        @click="showCategories"
      >
        <InputComponent
          class="input-show w-full pr-0 bg-transparent"
          type="button"
          :text="$languageCase('Categories', 'Categorías', 'Categorie')"
        />
        <IconComponent
          next
          class="px-4 rounded bg-gray-200"
          :size="`w-3 h-3 transition ${
            showFilters ? 'transform -rotate-90' : 'transform rotate-90'
          }`"
        />
      </div>
      <transition
        enter-active-class="duration-150"
        leave-active-class="duration-150"
        enter-class="opacity-0 transform translate-y-full"
        leave-to-class="absolute"
      >
        <ul
          v-if="showFilters"
          class="categories-list grid grid-cols-fit-small row-start-2 row-end-auto auto-cols-fr gap-5 mb-5"
        >
          <li
            v-for="(filter, index) in sortedCategories"
            :key="index"
            :class="`category-container h-full flex justify-between overflow-hidden rounded cursor-pointer select-none transition-all bg-neutral-600 text-white ${
              comparedCategories.includes(filter.value)
                ? 'bg-opacity-70'
                : !isDesktop
                ? ''
                : 'hover:bg-gray-700'
            }`"
            @click="filterSearch(filter)"
          >
            <InputComponent
              :class="`category-input w-full text-left rounded pointer-events-none italic truncate transition-all ${
                comparedCategories.includes(filter.value) ? 'bg-neutral-500' : 'bg-transparent'
              }`"
              type="button"
              :text="filter.render"
            />
            <IconComponent
              close
              size="w-2.5 h-2.5"
              :class="`px-4 pointer-events-none transition ${
                comparedCategories.includes(filter.value) ? '' : 'transform rotate-45'
              }`"
            />
          </li>
          <li
            class="reset-container h-full overflow-hidden col-start-1 col-end-1 row-start-1 row-end-1 rounded cursor-pointer select-none"
            @click="searchCategory = []"
          >
            <InputComponent
              class="reset-input w-full bg-gray-200"
              type="button"
              :text="$languageCase('Clear filters', 'Borrar filtros', 'Rimuovi filtri')"
            />
          </li>
        </ul>
      </transition>
    </div>
    <transition-group
      tag="ul"
      :class="`post-list w-full grid gap-5 auto-cols-fr auto-rows-fr ${
        blok.row_container || sliderMode || carouselMode || containerMode
          ? maxPosts
          : 'md:grid-cols-fill-medium lg:grid-cols-none lg:grid-flow-row'
      }`"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
      enter-active-class="transition duration-150"
      leave-active-class="transition duration-150"
    >
      <PostTeaserComponent
        v-for="post in searchQuery"
        :key="post.uuid"
        :post-link="post.slug"
        :post-content="post.content"
        :row-container="blok.row_container"
        :slider-container="sliderMode"
        :carousel-container="carouselMode"
        :container-container="containerMode"
        :container-width="containerWidth"
      />
    </transition-group>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import store from '@/store';
import IconComponent from '@/storyblok/global/Icon';
import InputComponent from '@/storyblok/global/Input';
import PostTeaserComponent from '@/storyblok/blog/PostTeaser';
export default defineNuxtComponent({
  components: { PostTeaserComponent, IconComponent, InputComponent },
  props: {
    blok: {
      type: Object,
      required: true
    },
    containerWidth: {
      type: Number,
      default: 0
    },
    containerMode: {
      type: Boolean,
      default: false
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { addPosts } = store.posts();
    const { isDesktop } = useDevice();
    const { $languageCase } = useNuxtApp();
    const { postsGet } = storeToRefs(store.posts());
    const { languageGet } = storeToRefs(store.language());
    const state = reactive({
      searchTerm: '',
      searchCategory: [],
      showFilters: false
    });
    const { searchTerm, searchCategory, showFilters } = toRefs(state);
    (async () =>
      await useAsyncData('posts', async () => await addPosts(), { watch: [languageGet] }))();
    const maxPosts = computed(() => {
      if (props.sliderMode || props.carouselMode || props.containerMode) {
        if (props.containerWidth >= 536) {
          return 'md:grid-cols-fill-medium lg:grid-cols-fill-big';
        }
        return props.containerWidth >= 354
          ? 'md:grid-cols-fill-medium'
          : props.sliderMode
          ? 'sm:grid-cols-fill-small'
          : 'sm:grid-cols-fill-small md:grid-cols-fill-medium';
      } else {
        return 'md:grid-cols-fill-medium lg:grid-cols-fill-big';
      }
    });
    const sortedPosts = computed(() => {
      const posts = props.blok.posts;
      const featuredPosts = postsGet.value.filter(post => posts.includes(post.uuid));
      featuredPosts.sort((a, b) => posts.indexOf(a.uuid) - posts.indexOf(b.uuid));
      return featuredPosts;
    });
    const sortedCategories = computed(() => {
      return sortedPosts.value
        .map(post => post.content.categories)
        .reduce((acc, cur) => {
          cur.forEach(str => {
            if (!acc.includes(str)) {
              acc.push(str);
            }
          });
          return acc;
        }, [])
        .map(category => {
          const mapCategory = category.toLowerCase().split('; ');
          return mapCategory.map(render => ({
            render,
            value: mapCategory[0]
          }))[$languageCase(0, 1, 2)];
        })
        .sort((a, b) => a.render.localeCompare(b.render));
    });
    const comparedCategories = computed(() => searchCategory.value.map(({ value }) => value));
    const searchQuery = computed(() => {
      return (() => {
        if (
          searchTerm.value &&
          props.blok.search_action &&
          (!props.blok.categories_action || !comparedCategories.value.length)
        ) {
          return filterByTerms.value;
        } else if (
          (!searchTerm.value || !props.blok.search_action) &&
          props.blok.categories_action &&
          comparedCategories.value.length
        ) {
          return filterByCategory.value;
        } else if (
          searchTerm.value &&
          props.blok.search_action &&
          props.blok.categories_action &&
          comparedCategories.value.length
        ) {
          return filterBoth.value;
        } else {
          return sortedPosts.value;
        }
      })().sort(
        ({ content: contentA }, { content: contentB }) =>
          new Date(contentB.date) - new Date(contentA.date)
      );
    });
    const filterByTerms = computed(() => {
      return sortedPosts.value.filter(post =>
        `${post.content.title} ${post.content.intro}`
          .toLowerCase()
          .includes(searchTerm.value.toLowerCase())
      );
    });
    const filterByCategory = computed(() => {
      return sortedPosts.value.filter(post =>
        post.content.categories.some(postCategory =>
          comparedCategories.value.includes(postCategory.toLowerCase().split('; ')[0])
        )
      );
    });
    const filterBoth = computed(() => {
      return filterByTerms.value.filter(post =>
        post.content.categories.some(postCategory =>
          comparedCategories.value.includes(postCategory.toLowerCase().split('; ')[0])
        )
      );
    });
    const filterSearch = filter => {
      if (!comparedCategories.value.includes(filter.value)) {
        searchCategory.value.push(filter);
      } else {
        searchCategory.value.splice(comparedCategories.value.indexOf(filter.value), 1);
      }
    };
    const showCategories = () => {
      searchCategory.value = [];
      showFilters.value = !showFilters.value;
    };
    return {
      maxPosts,
      isDesktop,
      searchTerm,
      searchQuery,
      sortedPosts,
      showFilters,
      filterSearch,
      searchCategory,
      showCategories,
      sortedCategories,
      comparedCategories
    };
  }
});
</script>
