<template>
  <div class="logo-container">
    <svg
      key="logo"
      ref="logo"
      :style="`height: ${blok && blok.size ? blok.size : size ? size : 'auto'}; width: ${
        blok && blok.size ? blok.size : size ? size : 'auto'
      };`"
      class="logo cursor-pointer max-w-full max-h-full mx-auto my-0"
      version="1.1"
      baseProfile="basic"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="710.8732px"
      height="710.8732px"
      viewBox="0 0 710.8732 710.8732"
      xml:space="preserve"
      @click="blok?.transition || transition ? play() : null"
    >
      <g :class="`transition-logo logo-a ${moved.a}`">
        <path
          :fill="
            blok && blok.color_a.color
              ? blok.color_a.color
              : colorA
                ? colorA
                : '#999999'
          "
          d="M255.8788,165.9017c-83.6324,0-151.4281,69.7552-151.4281,153.3876
          c7.9283,200.7676,294.8678,200.9176,302.8661,0C407.3168,235.657,339.5111,165.9017,255.8788,165.9017z M283.7986,355.8837
          c-9.6093,9.6093-23.8822,15.5201-37.4688,15.5201c-14.3574,0-27.1014-6.003-37.4687-15.5201
          c-10.4047-9.5513-14.9063-23.7646-15.5201-37.4687c-0.5912-13.1996,6.3296-28.2783,15.5201-37.4688
          c9.6092-9.6092,23.8821-15.52,37.4687-15.52c14.3574,0,27.1014,6.003,37.4688,15.52c10.4047,9.5513,14.9062,23.7646,15.52,37.4688
          C299.9098,331.6145,292.989,346.6932,283.7986,355.8837z"
        />
        <path
          :fill="
            blok && blok.color_a.color
              ? blok.color_a.color
              : colorA
                ? colorA
                : '#999999'
          "
          d="M362.7918,472.2758h-15.7596c-24.4153,0-44.2078-19.7925-44.2078-44.2079V208.5204
          c0-24.4153,19.7925-44.2078,44.2078-44.2078h15.7596c24.4153,0,44.2078,19.7925,44.2078,44.2078v219.5475
          C406.9996,452.4832,387.2071,472.2758,362.7918,472.2758z"
        />
      </g>
      <g :class="`transition-logo logo-p ${moved.p}`">
        <path
          :fill="
            blok && blok.color_p.color
              ? blok.color_p.color
              : colorP
                ? colorP
                : '#000000'
          "
          d="M606.4182,314.8502c-1.7396-92.0206-73.0146-151.8879-149.2385-151.878c-25.4046,0-51.3691,6.6486-75.4841,20.9756
          c-29.9037,16.8764-66.7359,59.2875-73.1945,110.9466c-0.9298,6.9985-1.2198,13.4971-1.2198,19.9458
          c0,106.3876,1.1498,188.8901,1.8396,229.2316c0.05,2.6995,0.9598,3.8292,2.3195,3.8292c1.4597,0,3.4293-1.2997,5.4189-3.3693
          c84.6222-88.5313,212.875-45.8603,270.253-151.0581C605.9483,358.9409,606.4882,322.8285,606.4182,314.8502z M497.9223,355.8837
          c-9.6092,9.6093-23.8821,15.5201-37.4687,15.5201c-14.3574,0-27.1014-6.003-37.4688-15.5201
          c-10.4047-9.5513-14.9062-23.7646-15.5201-37.4687c-0.5912-13.1996,6.3295-28.2783,15.5201-37.4688
          c9.6092-9.6092,23.8822-15.52,37.4688-15.52c14.3574,0,27.1013,6.003,37.4687,15.52
          c10.4047,9.5513,14.9063,23.7646,15.5201,37.4688C514.0336,331.6145,507.1128,346.6932,497.9223,355.8837z"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default defineNuxtComponent({
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    size: {
      type: String,
      default: ''
    },
    transition: {
      type: Boolean,
      default: false
    },
    colorA: {
      type: String,
      default: ''
    },
    colorP: {
      type: String,
      default: ''
    }
  },
  setup() {
    const logo = ref(null)
    const state = reactive({
      moved: {
        a: '',
        p: ''
      },
      loading: false,
      loadingTimer: 0
    })
    const { moved } = toRefs(state)
    const play = () => {
      moved.value.a =
        'transform origin-center-left rotate-360 transition duration-700 ease-out'
      moved.value.p =
        'transform origin-center rotate-360 transition duration-700 ease-out'
      logo.value.ontransitionend = () => {
        moved.value.p = ''
        moved.value.a = ''
      }
    }
    return {
      logo,
      play,
      moved
    }
  }
})
</script>
