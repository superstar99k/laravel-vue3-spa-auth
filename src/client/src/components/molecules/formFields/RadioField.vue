<script setup>
import { defineProps, defineEmits } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import {
  createProps,
  createEmits,
  createInnerValue,
} from '@/components/molecules/formFields/baseFormField'

const props = defineProps({
  ...createProps(),
  options: {
    type: Array,
    default: () => [],
  },
  labelClass: {
    type: String,
    default: 'form-check-label',
  },
})
const emit = defineEmits(createEmits().concat(['focus']))
const innerValue = createInnerValue(props, emit)
</script>

<template>
  <div>
    <label class="d-block mb-1">{{ label }}</label>
    <div
      v-for="(option, index) in options"
      :key="index"
      class="form-check form-check-inline"
    >
      <Field
        :id="`${name}_${option.value}`"
        v-model="innerValue"
        type="radio"
        :name="name"
        :label="option.label"
        class="form-check-input cursor-pointer"
        :class="
          [
            inputClass,
            showErrorStyle && Object.keys(errors).length > 0
              ? 'border border-danger'
              : '',
          ].join(' ')
        "
        :rules="rules"
        :disabled="disabled"
        :value="option.value"
        :standalone="props.standalone"
      />
      <label
        :for="`${name}_${option.value}`"
        :class="[labelClass]"
        class="cursor-pointer"
        >{{ option.label }}</label
      >
      <ErrorMessage v-if="showErrorMessage" :name="name" class="text-danger" />
    </div>
  </div>
</template>
