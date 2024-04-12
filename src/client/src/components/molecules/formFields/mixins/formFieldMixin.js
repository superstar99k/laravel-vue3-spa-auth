export default {
  props: {
    modelValue: {
      default: null,
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
    inputClass: {
      type: String,
      default: '',
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    labelClass: {
      type: String,
      default: '',
    },
    errors: {
      type: Object,
      default: () => ({}),
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    showErrorMessage: {
      type: Boolean,
      default: true,
    },
    showErrorStyle: {
      type: Boolean,
      default: true,
    },
    validName: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    innerValue: {
      set(value) {
        if (value !== this.modelValue) {
          this.$emit('update:modelValue', value)
        }
      },
      get() {
        return this.modelValue ?? ''
      },
    },
  },
}
