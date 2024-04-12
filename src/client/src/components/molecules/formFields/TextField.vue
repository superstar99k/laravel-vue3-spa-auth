<script setup>
import { ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import {
  createEmits,
  createInnerValue,
  createProps,
  errorCss,
} from '@/components/molecules/formFields/baseFormField'

const props = defineProps({
  ...createProps(),
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: 'off',
  },
})

const emit = defineEmits(createEmits().concat(['focus']))

const innerValue = createInnerValue(props, emit)
const element = ref()
const focus = () => element.value.querySelector('input').focus()

defineExpose({ focus })
</script>

<template>
  <div :ref="element">
    <label v-if="showLabel && label" :for="id" :class="[labelClass]">{{
      label
    }}</label>
    <div class="prefix">
      <Field
        :id="id"
        v-model="innerValue"
        :type="type"
        :name="name"
        :label="validName || label"
        class="form-control text-field"
        :class="[inputClass, errorCss(props, errors)].join(' ')"
        :rules="rules"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :standalone="props.standalone"
        @focus="$emit('focus')"
      />
    </div>
    <ErrorMessage v-if="showErrorMessage" :name="name" class="text-danger" />
  </div>
</template>
