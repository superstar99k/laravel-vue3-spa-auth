import { computed } from 'vue'

export const createProps = () => ({
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
  standalone: {
    type: Boolean,
    default: false,
  },
})

export const createEmits = () => ['update:modelValue', 'input']

export const createInnerValue = (props, emit) =>
  computed({
    set: (value) => {
      emit('update:modelValue', value)
      emit('input', value)
    },
    get: () => props.modelValue ?? null,
  })

/**
 * @param {Object} props
 * @param {Array} errors
 * @returns
 */
export const errorCss = (props, errors) =>
  props.showErrorStyle && Object.keys(errors).length > 0
    ? 'border border-danger'
    : ''
