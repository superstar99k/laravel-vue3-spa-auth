<script setup>
import { computed } from 'vue'
import { NDatePicker } from 'naive-ui'
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: {
    type: [String],
    default: null,
  },
  name: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'date',
    validate(value) {
      return ['date', 'datetime'].includes(value)
    },
  },
  format: {
    type: String,
    default: 'yyyy/MM/dd',
  },
  clearable: {
    type: Boolean,
    default: true,
  },
})

const normalize = (value) => {
  value = dayjs(value)

  if (!value.isValid()) {
    return null
  }

  return value.format('YYYY-MM-DD')
}

const innerValue = computed(() => normalize(props.modelValue))

const emit = defineEmits(['update:modelValue'])

/**
 * @param {Event} event
 */
const handleInput = (value) => {
  return emit('update:modelValue', value)
}
</script>

<template>
  <NDatePicker
    :type="props.type"
    :formatted-value="innerValue"
    :format="props.format"
    :clearable="props.clearable"
    :disabled="props.disabled"
    value-format="yyyy-MM-dd"
    @update-formatted-value="handleInput"
  />
</template>
