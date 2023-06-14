<template>
  <div :class="['modal', { opened: openEvent || open }]">
    <slot name="activator" :open="openModal" />
    <div
      v-show="openEvent || open"
      ref="modal"
      :class="[
        'modal-backdrop w-full fixed flex justify-center inset-0 z-50 overflow-auto focus:outline-none bg-opacity-90 bg-gray-200',
        modalStyle,
        { 'cursor-close': closeMode }
      ]"
      tabindex="0"
      @keydown.esc="closeMode && closeModal()"
      @click.stop="closeMode && closeModal()"
    >
      <div class="modal-container">
        <header v-if="hasSlot('header') || closeMode" class="modal-header">
          <slot name="header" />
        </header>
        <section
          v-if="hasSlot('body')"
          :class="['modal-body w-full h-full', { 'cursor-close': closeMode }]"
        >
          <transition enter-active-class="duration-300" enter-class="opacity-0">
            <div class="body-container h-full">
              <slot name="body" />
            </div>
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default defineNuxtComponent({
  props: {
    open: {
      type: Boolean,
      default: false
    },
    closeMode: {
      type: Boolean,
      default: false
    },
    modalStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      openEvent: false
    };
  },
  watch: {
    openEvent() {
      this.checkModal();
    },
    open() {
      this.checkModal();
    }
  },
  beforeUnmount() {
    if (this.openEvent || this.open) {
      this.$refs.modal.parentNode.removeChild(this.$refs.modal);
      this.$noscroll(false);
    }
  },
  methods: {
    openModal() {
      this.openEvent = true;
    },
    closeModal() {
      this.openEvent = false;
    },
    checkModal() {
      if (this.openEvent || this.open) {
        document.body.appendChild(this.$refs.modal);
        this.$nextTick(function () {
          this.$refs.modal.focus({ preventScroll: true });
        });
        this.$noscroll(true);
      } else {
        this.$refs.modal.parentNode.removeChild(this.$refs.modal);
        document.querySelector('.modal.opened').appendChild(this.$refs.modal);
        this.$noscroll(false);
      }
    },
    hasSlot(name = 'default') {
      return !!this.$slots[name] || !!this.$slots[name];
    }
  }
});
</script>
<style>
.body-container > * {
  height: 100%;
  object-fit: contain;
}
.body-container > *:not(:first-child) {
  margin-top: 20px;
}
</style>
