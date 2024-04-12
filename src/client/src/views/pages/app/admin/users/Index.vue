<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import PageTitle from '@/components/atoms/titles/PageTitle.vue'
import Pagination from '@/components/molecules/Pagination.vue'
import { extractFormErrors } from '@/errors/utils'

const route = useRoute()
const store = useStore()
const { setErrors } = useForm()

const pagination = computed(() => store.getters['user/meta'])

const fetchData = async () => {
  try {
    store.commit('alert/clear', { type: 'error' })
    store.commit('fetchState/pending', true)

    await store.dispatch('user/fetch', { params: route.query })
  } catch (error) {
    console.error(error)
    const { message, errors } = extractFormErrors(error)
    setErrors(errors)
    store.commit('alert/putError', [message])
  } finally {
    store.commit('fetchState/pending', false)
  }
}

fetchData()
</script>

<template>
  <section class="px-lg-4 pt-4">
    <PageTitle class="fs-3">ユーザー一覧</PageTitle>
    <div class="mw-md">
      <!-- <UserList :data="users" :loading="pending" /> -->
      <div class="mt-3 d-flex justify-content-end">
        <Pagination
          :current-page="pagination?.currentPage"
          :last-page="pagination?.lastPage"
          :query="route.query"
        />
      </div>
    </div>
  </section>
</template>
