<template>
  <div class="blank-space w-full flex flex-col justify-center rounded px-5" :style="`height: ${blok.height};`">
    <hr v-if="blok.add_line" />
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
});
</script>
