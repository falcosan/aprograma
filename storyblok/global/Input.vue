<template>
  <input
    v-if="blok"
    :id="`${blok.type}-input`"
    :class="`input cursor-pointer py-3 px-4 rounded text-sm transition ${
      !$device.isDesktop ? '' : 'hover:opacity-80'
    } ${$themeColor(blok.background_color.color) ? 'text-white' : ''}`"
    :style="`background-color: ${
      blok.background_color.color ? blok.background_color.color : 'transparent'
    };`"
    :type="blok.type"
    :value="blok.text"
    @click="blok.type === 'reset' && $emit('resetInput')"
  />
  <input
    v-else
    :id="`${text}-input`"
    :class="`input cursor-pointer py-3 px-4 rounded text-sm transition ${
      !$device.isDesktop ? '' : 'hover:opacity-80'
    }`"
    :type="type"
    :value="text"
  />
</template>
<script>
export default {
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    type: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
};
</script>
