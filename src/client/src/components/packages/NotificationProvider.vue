<script setup>
import { NNotificationProvider } from 'naive-ui'
</script>

<template>
  <NNotificationProvider>
    <slot></slot>
  </NNotificationProvider>
</template>
