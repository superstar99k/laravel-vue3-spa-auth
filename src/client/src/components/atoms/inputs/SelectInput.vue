<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { NSelect } from 'naive-ui'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const handleCreate = (label) => {
  emit('create', label)
  return { value: label, label }
}

const instanceRef = ref()

const emit = defineEmits([
  'update:modelValue',
  'create',
  'focus',
  'show',
  'hide',
])

const blur = () => {
  instanceRef.value?.blur()
}

const handleUpdateValue = (value) => emit('update:modelValue', value)

const handleFocus = (event) => emit('focus', event)

const handleUpdateShow = (value) => {
  if (value) {
    emit('show')
  } else {
    emit('hide')
  }
}

defineExpose({
  blur,
})
</script>

<template>
  <NSelect
    :ref="(instance) => (instanceRef = instance)"
    :value="props.modelValue"
    :options="props.options"
    :on-create="handleCreate"
    :on-focus="handleFocus"
    :on-update:show="handleUpdateShow"
    @update:value="handleUpdateValue"
  />
</template>
