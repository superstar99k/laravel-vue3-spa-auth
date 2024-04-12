<script setup>
import { NAlert } from 'naive-ui'
import { defineProps } from 'vue'
import * as messageType from '@/constants/messageType'

const props = defineProps({
  type: {
    type: String,
    default: messageType.INFO,
    validate(value) {
      return Object.values(messageType).includes(value)
    },
  },
  title: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <NAlert :type="props.type" :title="props.title" :closable="closable">
    <slot></slot>
  </NAlert>
</template>
