<script setup>
import { RouterView } from 'vue-router'
import ConfigProvider from '@/components/packages/ConfigProvider.vue'
import NotificationProvider from '@/components/packages/NotificationProvider.vue'
import MessageProvider from '@/components/packages/MessageProvider.vue'
</script>

<template>
  <ConfigProvider>
    <NotificationProvider>
      <MessageProvider>
        <RouterView />
      </MessageProvider>
    </NotificationProvider>
  </ConfigProvider>
</template>
