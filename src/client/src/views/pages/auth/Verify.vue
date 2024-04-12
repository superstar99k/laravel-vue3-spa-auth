<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '@/api'
import { extractFormErrors } from '@/errors/utils'
import { preprocessStringfyingQuery, processRouteQuery } from '@/utils/http'

const store = useStore()
const route = useRoute()
const router = useRouter()

const verify = async () => {
  try {
    const query = processRouteQuery(route.query)
    const { data } = await api.auth.verify(route.query)

    if (query.emailChange) {
      store.commit('alert/putSuccess', [
        'メールアドレスの有効化が完了しました。',
      ])

      return router.push({
        name: 'auth-login',
      })
    }

    router.push({
      name: 'auth-reset_password',
      query: preprocessStringfyingQuery(data),
    })
  } catch (error) {
    console.error(error)
    const { message } = extractFormErrors(error)
    store.commit('alert/putError', [message])
    router.push({ name: 'auth-login' })
  }
}

verify()
</script>

<template>
  <div></div>
</template>
