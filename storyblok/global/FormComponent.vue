<template></template>
<!-- <div
    :class="`form relative w-full my-0 mx-auto overflow-hidden ${
      blok.reduce_width ? 'max-w-3xl' : ''
    }`"
  >
    <Modal
      v-if="submitting"
      class="modal-submit"
      :open="submitting"
      modal-style="cursor-wait"
    >
      <template #body>
        <Icon
          tag="span"
          loader
          class="form-loader max-h-full"
          size="w-32 h-32"
        />
      </template>
    </Modal>
    <transition
      enter-active-class="duration-200 linear"
      leave-active-class="duration-200 linear"
      enter-class="-translate-y-full opacity-0"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="alert.message"
        v-click-outside="removeAlert"
        :class="`form-alert fixed w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-5xl 2xl:max-w-7xl left-1/2 top-10 z-30 p-5 transform -translate-x-1/2 text-center text-sm transform rounded-b cursor-pointer bg-opacity-80 text-white ${
          !$device.isDesktop
            ? ''
            : 'md:absolute md:left-0 md:top-0 md:translate-x-0 md:rounded'
        } ${alert.color}`"
        @click="removeAlert"
        v-text="alert.message"
      />
    </transition>
    <h2 v-if="blok.title" :class="`form-title text-4xl`">
      {{ blok.title }}
    </h2>
    <form
      :name="blok.name.toLowerCase().replace(/ /g, '_')"
      class="form-fields"
      novalidate="true"
      @submit.prevent="submit"
    >
      <Field
        v-for="(input, index) in $contentByName(blok.body, 'Field')"
        :key="input._uid"
        class="contact-field"
        :field-value.sync="fields[index]"
        :blok="input"
      />
      <div class="from-controls grid gap-5 grid-cols-fit-tiny mt-7">
        <Input
          v-for="input in $contentByName(blok.body, 'Input')"
          :key="input._uid"
          class="buttons"
          :blok="input"
          @resetInput="clearFields"
        />
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./ModalComponent";
export default {
  components: { Modal },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      fields: {},
      submitting: false,
      alert: {
        timer: 0,
        message: null,
        color: "",
      },
    };
  },
  computed: {
    mandatoryFields() {
      return this.$contentByName(this.blok.body, "Field").filter(
        (field) => field.mandatory
      );
    },
    checkEmptyFields() {
      return this.mandatoryFields.map((field, index) =>
        field.title === Object.keys(this.nameField)[index]
          ? Object.values(this.nameField)[index]
          : null
      );
    },
    nameField() {
      return Object.assign(
        ...this.$contentByName(this.blok.body, "Field").map(
          ({ title }, index) => ({
            [title.toLowerCase()]: Object.values(this.fields)[index],
          })
        )
      );
    },
  },
  beforeDestroy() {
    this.clearFields();
  },
  methods: {
    setAlert(message, color) {
      this.alert.message = message;
      this.alert.color = color;
      clearInterval(this.alert.timer);
      this.alert.timer = setTimeout(() => {
        this.removeAlert();
      }, 5000);
    },
    removeAlert() {
      clearInterval(this.alert.timer);
      this.alert.message = null;
      this.alert.color = "";
    },
    clearFields() {
      clearInterval(this.alert.timer);
      this.fields = {};
      this.alert.timer = 0;
      this.alert.message = null;
      this.alert.color = "";
      this.$store.dispatch("validator/clearValues");
    },
    async submit() {
      if (this.blok.type === "contact_form") {
        this.$store.dispatch("validator/checkValues");
        if (
          this.$store.state.validator.email.passed === "yes" &&
          this.$store.state.validator.message.passed === "yes" &&
          Object.keys(this.fields).length >= this.mandatoryFields.length &&
          this.checkEmptyFields.every((text) => text.length > 0)
        ) {
          this.removeAlert();
          this.submitting = true;
          try {
            await axios.post("/.netlify/functions/sendmail", {
              name: this.nameField.name,
              email: this.nameField.email,
              message: this.nameField.message,
            });
            this.submitting = false;
            document.querySelector("form").reset();
            this.clearFields();
            this.setAlert(this.blok.passed_message, "bg-green-400");
          } catch {
            this.submitting = false;
            this.setAlert(this.blok.error_message, "bg-red-400");
          }
        } else {
          this.setAlert(this.blok.reject_message, "bg-red-400");
        }
      }
    },
  },
};
</script> -->
