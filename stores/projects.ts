import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    items: []
  }),
  getters: {
    projectsGet(state) {
      return state.items
    }
  },
  actions: {
    addProjects(projects: never[]) {
      this.items = projects
    }
  }
})
