<script setup>
import { NConfigProvider } from 'naive-ui'
import { jaJP, dateJaJP } from 'naive-ui'
</script>

<template>
  <NConfigProvider :locale="jaJP" :date-locale="dateJaJP">
    <slot></slot>
  </NConfigProvider>
</template>
