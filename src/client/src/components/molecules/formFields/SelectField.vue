<script setup>
import { computed, ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import {
  createEmits,
  createInnerValue,
  createProps,
  errorCss,
} from '@/components/molecules/formFields/baseFormField'
import SelectInput from '@/components/atoms/inputs/SelectInput.vue'

const props = defineProps({
  ...createProps(),
  options: {
    type: Array,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  filterable: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showUnselected: {
    type: Boolean,
    default: true,
  },
  unselectedText: {
    type: String,
    default: '選択して下さい',
  },
  unselectedValue: {
    type: [Object, String, Number],
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  fallbackOption: {
    type: Boolean,
    default: false,
  },
  allowCreateOption: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([...createEmits(), 'search', 'create', 'show', 'hide'])

const instanceRef = ref()

const blur = () => {
  instanceRef.value?.blur()
}

const handleCreate = (label) => {
  emit('create', label)
}

const handleFocus = (event) => {
  emit('focus', event)
}

const innerOptions = computed(() =>
  props.options.map((option) =>
    typeof option === 'object' && option !== null
      ? option
      : { value: option, label: option }
  )
)

const innerValue = createInnerValue(props, emit)

defineExpose({
  blur,
})
</script>

<template>
  <div>
    <label v-if="showLabel && label" :for="id" :class="[labelClass]">{{
      label
    }}</label>
    <Field
      :id="id"
      v-slot="{ field, handleInput }"
      v-model="innerValue"
      :name="name"
      :label="label"
      :class="[inputClass, errorCss(props, errors)].join(' ')"
      :rules="rules"
      :disabled="disabled"
      :required="required"
      :standalone="props.standalone"
    >
      <SelectInput
        :ref="(instance) => (instanceRef = instance)"
        :model-value="field.value"
        :options="innerOptions"
        :placeholder="placeholder"
        :multiple="multiple"
        :filterable="filterable"
        :clearable="clearable"
        :remote="remote"
        :loading="loading"
        :disabled="disabled"
        :fallback-option="fallbackOption"
        :reset-menu-on-options-change="true"
        :tag="allowCreateOption"
        @update:model-value="handleInput"
        @search="(value) => emit('search', value)"
        @create="handleCreate"
        @focus="handleFocus"
        @show="() => emit('show')"
        @hide="() => emit('hide')"
      />
    </Field>
    <ErrorMessage v-if="showErrorMessage" :name="name" class="text-danger" />
  </div>
</template>

<style lang="scss" scoped>
select.form-select {
  padding: 6px;
}
</style>
