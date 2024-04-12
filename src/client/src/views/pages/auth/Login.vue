<script setup>
import Default from '@/views/layouts/Default.vue'
import PageTitle from '@/components/atoms/titles/PageTitle.vue'
import TextField from '@/components/molecules/formFields/TextField.vue'
import LoadableButton from '@/components/molecules/buttons/LoadableButton.vue'
import AlertList from '@/components/organisms/alerts/AlertList.vue'
import { useForm } from 'vee-validate'
import { RouterLink, onBeforeRouteLeave } from 'vue-router'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import api from '@/api'
import { extractFormErrors } from '@/errors/utils'

const router = useRouter()
const store = useStore()

const inputs = reactive({
  email: '',
  password: '',
})

const { handleSubmit, setErrors } = useForm({
  validationSchema: {
    email: 'email|required',
    password: 'required',
  },
})

const pending = computed(() => store.getters['fetchState/pending'])

const handleLogin = handleSubmit(async () => {
  try {
    const params = { ...inputs }

    store.commit('alert/clear', { type: 'error' })
    store.commit('fetchState/pending', true)

    await api.auth.initializeCsrfCookie()
    await store.dispatch('auth/passwordLogin', { params })
    await store.dispatch('loggedIn')

    router.push({ name: 'admin-dashboard' })
  } catch (error) {
    console.error(error)
    const { message, errors } = extractFormErrors(error)
    setErrors(errors)
    store.commit('alert/putError', [message])
  } finally {
    store.commit('fetchState/pending', false)
  }
})

onBeforeRouteLeave(() => {
  store.commit('alert/clearAll')
})
</script>

<template>
  <Default>
    <div class="container-fluid mw-sm">
      <div class="mb-4">
        <PageTitle class="mb-5 mt-5 text-center">ログイン</PageTitle>
        <AlertList />
      </div>
      <form @submit="handleLogin" @keydown.enter.prevent="">
        <div class="mb-3">
          <TextField
            id="email"
            v-model="inputs.email"
            name="email"
            label="メールアドレス"
          />
        </div>
        <div class="mb-5">
          <TextField
            id="password"
            v-model="inputs.password"
            name="password"
            label="パスワード"
            type="password"
            autocomplete="current-password"
          />
        </div>
        <LoadableButton
          class="d-block btn btn-primary w-100 mb-3"
          type="submit"
          :loading="pending"
          >ログイン</LoadableButton
        >
        <RouterLink
          :to="{ name: 'auth-forgot_password' }"
          class="d-block btn btn-link"
          >パスワードをリセットする</RouterLink
        >
      </form>
    </div>
  </Default>
</template>
