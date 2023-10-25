import { usePostsStore } from './posts';
import { useProjectsStore } from './projects';

export default {
  posts: () => usePostsStore(),
  projects: () => useProjectsStore()
};
