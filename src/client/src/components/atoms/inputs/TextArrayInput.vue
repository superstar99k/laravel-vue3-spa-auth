<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  separator: {
    type: String,
    default: ',',
  },
})

const value = computed(() => props.modelValue.join(props.separator))

/**
 * @param {Event} event
 */
const handleUpdate = (event) => {
  const value = event.target.value

  emit('update:modelValue', String(value || '').split(props.separator))
}
</script>

<template>
  <input
    :id="props.id"
    :value="value"
    :name="props.name"
    @input="handleUpdate"
  />
</template>
