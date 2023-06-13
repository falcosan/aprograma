import { usePostsStore } from './posts';
import { useProjectsStore } from './projects';
import { useLanguageStore } from './language';

export default {
  posts: () => usePostsStore(),
  projects: () => useProjectsStore(),
  language: () => useLanguageStore()
};
