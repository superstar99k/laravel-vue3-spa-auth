<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import {
  createProps,
  errorCss,
  createInnerValue,
} from '@/components/molecules/formFields/baseFormField'
import DatePicker from '@/components/atoms/inputs/DatePicker.vue'

const props = defineProps({
  ...createProps(),
  type: {
    type: String,
    default: 'date',
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

const emit = defineEmits(['update:modelValue'])
const handleUpdate = (value) => emit('update:modelValue', value)
const innerValue = createInnerValue(props, emit)

defineExpose({ focus })
</script>

<template>
  <div>
    <label v-if="showLabel && label" :for="id" :class="[labelClass]">{{
      label
    }}</label>
    <div class="prefix">
      <Field
        :id="id"
        v-slot="{ field, handleInput }"
        v-model="innerValue"
        :name="name"
        :label="label"
        :class="[inputClass, errorCss(props, errors)].join(' ')"
        :rules="rules"
        :disabled="disabled"
        :standalone="props.standalone"
        @update:model-value="handleUpdate"
      >
        <DatePicker
          :model-value="field.value"
          :clearable="clearable"
          :reset-menu-on-options-change="true"
          :type="props.type"
          :disabled="props.disabled"
          :format="props.format"
          @update:model-value="handleInput"
        />
      </Field>
    </div>
    <ErrorMessage v-if="showErrorMessage" :name="name" class="text-danger" />
  </div>
</template>
