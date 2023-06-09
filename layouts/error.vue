<template>
  <div
    class="error fixed h-screen flex items-center justify-center inset-0 px-5"
  >
    <div
      v-if="error.statusCode === 404"
      :class="`error-404 w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl flex flex-col justify-center items-center p-20 space-y-5 text-center rounded-b bg-opacity-80 bg-white ${
        !$device.isDesktop ? '' : 'md:rounded-t'
      }`"
    >
      <span class="text-7xl">{{ error.statusCode }}</span>
      <Logo
        class="relative w-max h-max justify-self-center -top-1 brightness-0 animate-pulse"
        size="50px"
      />
      <span
        class="text-xs xs:text-base sm:text-lg text-center pointer-events-none uppercase italic"
      >
        {{ error.message }}</span
      >
      <NuxtLink
        class="w-max justify-self-center py-3 px-4 rounded text-sm bg-neutral-800 text-white"
        to="/"
      >
        Home
      </NuxtLink>
    </div>
    <div
      v-else
      :class="`error-500 w-full max-w-screen-md flex flex-col justify-center items-center p-20 space-y-5 text-center rounded-b bg-opacity-80 bg-white ${
        !$device.isDesktop ? '' : 'md:rounded-t'
      }`"
    >
      <span class="text-7xl">{{ error.statusCode }}</span>
      <Logo
        class="relative w-max h-max justify-self-center -top-1 brightness-0 animate-pulse"
        size="50px"
      />
      <span
        class="text-xs xs:text-base sm:text-lg text-center pointer-events-none uppercase italic"
      >
        {{ error.message }}</span
      >
      <NuxtLink
        class="w-max justify-self-center py-3 px-4 rounded text-sm bg-neutral-800 text-white"
        to="/"
      >
        Home
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.$noscroll(true);
  },
  beforeDestroy() {
    this.$noscroll(false);
  },
};
</script>
