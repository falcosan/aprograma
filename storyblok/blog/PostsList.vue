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
      v-if="blok.categories_action && sortedCategories?.length"
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
      <Transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition duration-100"
        leave-active-class="transition duration-100"
      >
        <ul
          v-if="showFilters"
          class="categories-list flex flex-wrap mb-5 -mt-2.5 -mx-2.5 overflow-hidden"
        >
          <li
            class="reset-container w-full xx:w-auto xx:min-w-[41.666667%] sm:min-w-[initial] sm:max-w-full flex-auto sm:flex-initial m-2.5 overflow-hidden rounded cursor-pointer select-none"
            @click="searchCategory = []"
          >
            <InputComponent
              class="reset-input w-full bg-gray-200"
              type="button"
              :text="$languageCase('Clear filters', 'Borrar filtros', 'Rimuovi filtri')"
            />
          </li>
          <li
            v-for="(filter, index) in sortedCategories"
            :key="index"
            :class="[
              'category-container w-full xx:w-auto xx:min-w-[41.666667%] sm:min-w-[initial] sm:max-w-full flex-auto sm:flex-initial flex justify-between m-2.5 overflow-hidden rounded cursor-pointer select-none transition-all bg-neutral-600 text-white',
              {
                'xx:flex-none':
                  index === sortedCategories.length - 1 && !!!(sortedCategories.length & 1)
              },
              comparedCategories.includes(filter.value)
                ? 'bg-opacity-70'
                : !isDesktop
                  ? ''
                  : 'hover:bg-gray-700'
            ]"
            @click="filterSearch(filter)"
          >
            <InputComponent
              :class="[
                'category-input w-full text-left rounded pointer-events-none italic break-all ss:truncate transition-all',
                comparedCategories.includes(filter.value) ? 'bg-neutral-500' : 'bg-transparent'
              ]"
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
        </ul>
      </Transition>
    </div>
    <TransitionGroup
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
        v-for="(post, indexPost) in searchQuery"
        :key="indexPost"
        :post-link="post.slug"
        :post-content="post.content"
        :row-container="blok.row_container"
        :slider-container="sliderMode"
        :carousel-container="carouselMode"
        :container-container="containerMode"
        :container-width="containerWidth"
      />
    </TransitionGroup>
  </div>
</template>

<script>
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
  async setup(props) {
    const { locale } = useI18n();
    const { isDesktop } = useDevice();
    const config = useRuntimeConfig();
    const { addPosts } = store.posts();
    const { $languageCase } = useNuxtApp();
    const state = reactive({
      searchTerm: '',
      searchCategory: [],
      showFilters: false
    });
    const { searchTerm, searchCategory, showFilters } = toRefs(state);
    const { data: posts } = await useAsyncData('posts', async () => {
      const { stories } = await $fetch('/api/storyblok', {
        headers: { 'x-auth': config.public.envXAuth },
        params: { starts_with: 'blog', lang: locale.value }
      });
      return stories;
    });
    const maxPosts = computed(() => {
      if (props.sliderMode || props.carouselMode || props.containerMode) {
        if (props.containerWidth >= 536) {
          return 'md:grid-cols-fill-medium 2xl:grid-cols-fill-big';
        }
        return props.containerWidth >= 354
          ? 'md:grid-cols-fill-medium'
          : props.sliderMode
            ? 'sm:grid-cols-fill-small'
            : 'sm:grid-cols-fill-small md:grid-cols-fill-medium 2xl:grid-cols-fill-big';
      } else {
        return 'md:grid-cols-fill-medium 2xl:grid-cols-fill-big';
      }
    });
    const sortedPosts = computed(() => {
      const data = props.blok.posts;
      const featuredPosts = posts.value.filter(post => data.includes(post.uuid));
      featuredPosts.sort((a, b) => data.indexOf(a.uuid) - data.indexOf(b.uuid));
      return featuredPosts;
    });
    const sortedCategories = computed(() => {
      return sortedPosts.value
        .map(post => post.content.categories)
        .reduce((acc, cur) => {
          cur?.forEach(str => {
            if (!acc.includes(str)) acc.push(str);
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
      })();
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
    watch(posts, val => addPosts(val), { immediate: true });
    return {
      maxPosts,
      isDesktop,
      searchTerm,
      sortedPosts,
      searchQuery,
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
