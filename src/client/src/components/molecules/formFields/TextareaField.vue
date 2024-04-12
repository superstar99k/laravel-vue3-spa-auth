<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import {
  createEmits,
  createInnerValue,
  createProps,
} from '@/components/molecules/formFields/baseFormField'

const props = defineProps({
  ...createProps(),
  modelValue: {
    type: [String, Number],
    default: null,
  },
})

const emit = defineEmits(createEmits().concat(['focus']))

const innerValue = createInnerValue(props, emit)
const element = ref()
const focus = () => element.value.querySelector('input').focus()

defineExpose({ focus })
</script>

<template>
  <div>
    <label v-if="showLabel && label" :for="id" :class="[labelClass]">{{
      label
    }}</label>
    <Field
      v-slot="{ field, handleInput }"
      v-model="innerValue"
      :name="name"
      :label="label"
      :class="
        [
          inputClass,
          showErrorStyle && Object.keys(errors).length > 0
            ? 'border border-danger'
            : '',
        ].join(' ')
      "
      :rules="rules"
      :standalone="props.standalone"
      @focus="$emit('focus')"
    >
      <textarea
        :id="id"
        :value="field.value"
        class="w-100 h-100 form-control"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
      />
    </Field>
    <ErrorMessage v-if="showErrorMessage" :name="name" class="text-danger" />
  </div>
</template>

<style lang="scss" scoped>
textarea {
  height: 100%;
}
</style>
