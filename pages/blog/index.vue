<script setup>
import { storeToRefs } from 'pinia';
import store from '@/store';
const { addPosts } = store.posts();
const { languageGet } = storeToRefs(store.language());
const route = useRoute();
const storyblokApi = useStoryblokApi();
const { data: blog, refresh: refreshBlog } = await useAsyncData(
  route.path,
  async () => await storyblokApi.get(`cdn/stories/${route.path}`, { language: languageGet.value })
);
const { refresh: refreshPosts } = await useAsyncData('posts', async () => await addPosts());
watch(languageGet, () => {
  refreshBlog();
  refreshPosts();
});
</script>
<template>
  <StoryblokComponent :key="blog.data.story.content._uid" :blok="blog.data.story.content" />
</template>
