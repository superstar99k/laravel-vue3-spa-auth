<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { NPagination } from 'naive-ui'

const router = useRouter()

const emit = defineEmits(['update:currentPage'])

const props = defineProps({
  currentPage: {
    type: Number,
    default: 0,
  },
  lastPage: {
    type: Number,
    default: 0,
  },
  query: {
    type: Object,
    default: () => ({}),
  },
  disableRouter: {
    type: Boolean,
    default: false,
  },
})

const handleUpdate = (page) => {
  const query = { ...props.query }

  query.page = page

  if (!props.disableRouter) {
    router.push({ query })
  }

  emit('update:currentPage', query)
}
</script>

<template>
  <NPagination
    v-if="props.pageCount !== 0"
    :page="currentPage"
    :page-count="lastPage"
    @update:page="handleUpdate"
  />
</template>
