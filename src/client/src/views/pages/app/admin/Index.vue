<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/views/layouts/AdminLayout.vue'

const route = useRoute()
const key = computed(() => `${route.fullPath}-${JSON.stringify(route.query)}`)
</script>

<template>
  <AdminLayout>
    <RouterView :key="key" />
  </AdminLayout>
</template>
