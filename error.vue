<script setup>
defineProps({
  error: {
    type: Object,
    required: true
  }
});
const localePath = useLocalePath();
const handleError = () => clearError({ redirect: localePath('index') });
</script>

<template>
  <div>
    <div
      class="error fixed w-screen h-screen flex items-center justify-center inset-0 px-5 bg-white"
    >
      <div
        :class="`error-${error.statusCode} w-full max-w-3xl flex flex-col justify-center items-center space-y-5 text-center`"
      >
        <span class="text-7xl md:text-9xl animate-pulse text-gray-700">{{ error.statusCode }}</span>
        <span class="text-center text-gray-900">
          {{ error.statusMessage }}
        </span>
        <button class="py-3 px-4 rounded text-sm text-white bg-gray-800" @click="handleError">
          Back
        </button>
      </div>
    </div>
  </div>
</template>
