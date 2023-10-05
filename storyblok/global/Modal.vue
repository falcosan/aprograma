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
      @click.stop="closeMode && closeModal()"
      @keydown.esc="closeMode && closeModal()"
    >
      <div class="modal-container">
        <header v-if="hasSlot('header') || closeMode" class="modal-header">
          <slot name="header" />
        </header>
        <section
          v-if="hasSlot('body')"
          :class="['modal-body w-full h-full', { 'cursor-close': closeMode }]"
        >
          <Transition enter-active-class="duration-300" enter-class="opacity-0">
            <div class="body-container h-full">
              <slot name="body" />
            </div>
          </Transition>
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
  setup(props) {
    const { $noscroll } = useNuxtApp();
    const modal = ref(null);
    const state = reactive({ openEvent: false });
    const { openEvent } = toRefs(state);
    const openModal = () => (openEvent.value = true);
    const closeModal = () => (openEvent.value = false);
    const checkModal = () => {
      if (props.open || openEvent.value) {
        document.body.appendChild(modal.value);
        nextTick(() => modal.value.focus({ preventScroll: true }));
        $noscroll(true);
      } else {
        modal.value.parentNode.removeChild(modal.value);
        document.querySelector('.modal.opened').appendChild(modal.value);
        $noscroll(false);
      }
    };
    const hasSlot = name => {
      const slots = useSlots();
      return Boolean(slots[name]);
    };
    watch(() => [props.open, openEvent.value], checkModal);
    onBeforeUnmount(() => {
      if (props.open || openEvent.value) {
        modal.value.parentNode.removeChild(modal.value);
        $noscroll(false);
      }
    });
    return {
      modal,
      hasSlot,
      openEvent,
      openModal,
      closeModal
    };
  }
});
</script>
<style>
.body-container > * {
  @apply h-full object-contain;
}
.body-container > *:not(:first-child) {
  @apply mt-5;
}
</style>
