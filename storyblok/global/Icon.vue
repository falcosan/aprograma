<template>
  <component :is="blok?.tag ?? tag" :class="[
    'icon-wrapper grid gap-5 justify-center items-center select-none',
    { 'p-10': blok && !blok.remove_space }
  ]" @click="animateMenu ? (open = !open) : ''">
    <ImageComponent v-if="blok?.icon_image.filename" :class="`icon ${blok.icon_image.filename
      .split(/[\\/]/)
      .pop()
      .replace(
        /\.[^/.]+$/,
        ''
      )}-icon mx-auto my-0 fill-current object-contain object-center pointer-events-none`" :style="`width: ${/[a-zA-Z]/g.test(blok.size) ? blok.size : `${blok.size}px`}; height: ${/[a-zA-Z]/g.test(blok.size) ? blok.size : `${blok.size}px`
        }; filter: invert(${blok && blok.invert_color ? '1' : '0'})`"
      :title="(blok.title && !blok.show_title) || tooltip ? (blok ? blok.title : tooltip) : ''"
      :src="blok.icon_image.filename" :alt="blok.icon_image.alt" :height="blok.size" :width="blok.size" :file="blok"
      sizes="xs:64px md:128px" />

    <!-- HOME-->
    <svg v-else-if="home" width="24" height="24" viewBox="0 0 24 24" :class="`home-icon fill-current ${size}`"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z" />
    </svg>

    <!-- BACK-->
    <svg v-else-if="arrow" width="24" height="24" viewBox="0 0 24 24" :class="`arrow-icon fill-current ${size}`"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" />
    </svg>

    <!--CLOSE-->
    <svg v-else-if="close" :class="`close-icon fill-current ${size}`" width="24" height="24" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
    </svg>

    <!--NEXT-->
    <svg v-else-if="next" :class="`next-icon fill-current ${size}`" width="24" height="24" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z" />
    </svg>

    <!--PREVIOUS-->
    <svg v-else-if="previous" :class="`previous-icon fill-current ${size}`" width="24" height="24" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
    </svg>

    <!--RESTART-->
    <svg v-else-if="restart" width="24" height="24" viewBox="0 0 24 24" :class="`restart-icon fill-current ${size}`"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
    </svg>

    <!-- MENU -->
    <div v-else-if="animateMenu" :class="`animate-menu ${open ? 'open' : ''} ${size}`">
      <span class="absolute h-px w-full block left-0 transform rotate-0 rounded"
        :style="`background-color: ${colorIconAnimatedMenu || '#000000'};`" />
      <span class="absolute h-px w-full block left-0 transform rotate-0 rounded"
        :style="`background-color: ${colorIconAnimatedMenu || '#000000'};`" />
      <span class="absolute h-px w-full block left-0 transform rotate-0 rounded"
        :style="`background-color: ${colorIconAnimatedMenu || '#000000'};`" />
      <span class="absolute h-px w-full block left-0 transform rotate-0 rounded"
        :style="`background-color: ${colorIconAnimatedMenu || '#000000'};`" />
    </div>
    <svg v-else-if="menu" :class="`menu-icon fill-current ${size}`" width="24" height="24" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z" fill="#1040e2" />
      <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
    </svg>

    <!--LINK-->
    <svg v-else-if="link" :class="`link-icon fill-current ${size}`" width="24" height="24" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
    </svg>

    <!--EYE-->
    <svg v-else-if="eye" :class="`eye-icon fill-current ${size}`" width="24" height="24" viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z" />
    </svg>

    <!--EYE_BOLD-->
    <svg v-else-if="eyeBold" :class="`eye-bold-icon fill-current ${size}`" xmlns="http://www.w3.org/2000/svg" width="24"
      height="24" viewBox="0 0 24 24">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
    </svg>

    <!--GIT-->
    <svg v-else-if="git" :class="`git-icon fill-current ${size}`" xmlns="http://www.w3.org/2000/svg" width="24"
      height="24" viewBox="0 0 24 24">
      <title v-if="tooltip">{{ tooltip }}</title>
      <path
        d="M21 3c0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.323.861 2.433 2.05 2.832.168 4.295-2.021 4.764-4.998 5.391-1.709.36-3.642.775-5.052 2.085v-7.492c1.163-.413 2-1.511 2-2.816 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 1.305.837 2.403 2 2.816v12.367c-1.163.414-2 1.512-2 2.817 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.295-.824-2.388-1.973-2.808.27-3.922 2.57-4.408 5.437-5.012 3.038-.64 6.774-1.442 6.579-7.377 1.141-.425 1.957-1.514 1.957-2.803zm-16.8 0c0-.993.807-1.8 1.8-1.8s1.8.807 1.8 1.8-.807 1.8-1.8 1.8-1.8-.807-1.8-1.8zm3.6 18c0 .993-.807 1.8-1.8 1.8s-1.8-.807-1.8-1.8.807-1.8 1.8-1.8 1.8.807 1.8 1.8zm10.2-16.2c-.993 0-1.8-.807-1.8-1.8s.807-1.8 1.8-1.8 1.8.807 1.8 1.8-.807 1.8-1.8 1.8z" />
    </svg>

    <!--LOADER-->
    <svg v-else-if="loader" :class="`loader-icon fill-current ${size}`" version="1.1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0"
      xml:space="preserve">
      <title v-if="tooltip">{{ tooltip }}</title>
      <circle fill="none" stroke="#c1c1c1" stroke-width="4" cx="50" cy="50" r="44" class="opacity-40" />
      <circle fill="#fff" stroke="#ccc" stroke-width="2" cx="8" cy="54" r="6">
        <animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52"
          repeatCount="indefinite" />
      </circle>
    </svg>
    <span v-if="(blok && blok.title && blok.show_title) || title" class="icon-title text-center" :style="blok && blok.title && blok.show_title && blok.text_color.color
      ? `color: ${blok.text_color.color};`
      : false
      ">{{ blok ? blok.title : title }}</span>
  </component>
</template>

<script>
import ImageComponent from '@/storyblok/global/Image';
export default defineNuxtComponent({
  components: { ImageComponent },
  props: {
    blok: {
      type: Object,
      default: undefined
    },
    size: {
      type: String,
      default: ''
    },
    home: {
      type: Boolean,
      default: false
    },
    arrow: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },
    next: {
      type: Boolean,
      default: false
    },
    previous: {
      type: Boolean,
      default: false
    },
    restart: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Boolean,
      default: false
    },
    animateMenu: {
      type: Boolean,
      default: false
    },
    colorIconAnimatedMenu: {
      type: String,
      default: ''
    },
    link: {
      type: Boolean,
      default: false
    },
    eye: {
      type: Boolean,
      default: false
    },
    eyeBold: {
      type: Boolean,
      default: false
    },
    git: {
      type: Boolean,
      default: false
    },
    loader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'span'
    },
    tooltip: {
      type: String,
      default: ''
    },
    sliderMode: {
      type: Boolean,
      default: false
    },
    carouselMode: {
      type: Boolean,
      default: false
    },
    containerMode: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const state = reactive({ open: false });
    const { open } = toRefs(state);
    return {
      open
    };
  }
});
</script>
<style scoped>
.animate-menu {
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
}

.animate-menu span {
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.animate-menu span:nth-child(1) {
  top: 4px;
}

.animate-menu span:nth-child(2),
.animate-menu span:nth-child(3) {
  top: 10px;
}

.animate-menu span:nth-child(4) {
  top: 16px;
}

.animate-menu.open span:nth-child(1) {
  top: 16px;
  width: 0%;
  left: 50%;
}

.animate-menu.open span:nth-child(4) {
  top: 16px;
  width: 0%;
  left: 50%;
}

.animate-menu.open span:nth-child(2) {
  transform: rotate(45deg);
}

.animate-menu.open span:nth-child(3) {
  transform: rotate(-45deg);
}
</style>
