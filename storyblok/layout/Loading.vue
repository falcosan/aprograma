<template>
  <div v-if="loading" :class="`loader fixed w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl left-1/2 z-40 p-px transform -translate-x-1/2 translate-y-1/2 ${!$device.isDesktop ? 'top-10' : 'md:z-50 top-10 md:-top-px'}`">
    <div class="loader-bar absolute rounded-full inset-0 bg-gray-900" />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loader .loader-bar {
  animation: loading 2s linear infinite;
}

@keyframes loading {
  0% {
    left:0%;
    right:100%;
    width:0%;
  }
  10% {
    left:0%;
    right:75%;
    width:25%;
  }
  90% {
    right:0%;
    left:75%;
    width:25%;
  }
  100% {
    left:100%;
    right:0%;
    width:0%;
  }
}
</style>
