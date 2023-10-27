<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
});
const localePath = useLocalePath();
const handleError = () => clearError({ redirect: localePath('index') });
</script>

<template>
  <div class="error fixed w-full h-full flex items-center justify-center inset-0 px-5 bg-white">
    <div
      :class="`error-${error.statusCode} w-full flex flex-col justify-center items-center p-20 space-y-5 text-center`"
    >
      <span class="text-7xl animate-pulse text-gray-700">{{ error.statusCode }}</span>
      <span class="text-xs xs:text-base sm:text-lg text-center text-gray-900">
        {{ error.statusMessage }}
      </span>
      <button class="py-3 px-4 rounded text-sm text-white bg-gray-800" @click="handleError">
        Back
      </button>
    </div>
  </div>
</template>
