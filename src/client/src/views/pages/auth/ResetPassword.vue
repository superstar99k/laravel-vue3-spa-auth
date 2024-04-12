<script setup>
import Default from '@/views/layouts/Default.vue'
import PageTitle from '@/components/atoms/titles/PageTitle.vue'
import TextField from '@/components/molecules/formFields/TextField.vue'
import LoadableButton from '@/components/molecules/buttons/LoadableButton.vue'
import AlertList from '@/components/organisms/alerts/AlertList.vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { extractFormErrors } from '@/errors/utils'

const store = useStore()
const route = useRoute()
const router = useRouter()

const inputs = reactive({
  password: '',
  passwordConfirmation: '',
  verificationCode: route.query.verification_code,
})

const { handleSubmit, setErrors } = useForm({
  validationSchema: {
    password: 'required|password_char|min:8',
    passwordConfirmation: 'required|password_char|min:8|confirmed:@password',
  },
})

const pending = computed(() => store.getters['fetchState/pending'])

const handleReset = handleSubmit(async () => {
  try {
    const params = { ...inputs }

    store.commit('alert/clear', { type: 'error' })
    store.commit('fetchState/pending', true)

    await store.dispatch('auth/resetPassword', { params })

    store.commit('alert/putSuccess', ['パスワードリセット完了しました。'])
    router.push({ name: 'auth-login' })
  } catch (error) {
    console.error(error)
    const { message, errors } = extractFormErrors(error)
    setErrors(errors)
    store.commit('alert/putError', [message])
  } finally {
    store.commit('fetchState/pending', false)
  }
})
</script>

<template>
  <Default>
    <div class="container-fluid mw-sm">
      <div class="mb-4">
        <PageTitle class="mb-5 mt-5 fs-3 text-center"
          >パスワードをリセットする</PageTitle
        >
        <AlertList />
      </div>
      <form @submit="handleReset" @keydown.enter.prevent="">
        <div class="mb-3">
          <TextField
            id="password"
            v-model="inputs.password"
            name="password"
            type="password"
            label="パスワード"
          />
        </div>
        <div>
          <TextField
            id="password_confirmation"
            v-model="inputs.passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            label="確認用パスワード"
          />
        </div>
        <LoadableButton
          class="d-block btn btn-primary mt-4 w-100"
          type="submit"
          :loading="pending"
          >パスワードをリセットする</LoadableButton
        >
        <div class="mt-3 text-center">
          <RouterLink :to="{ name: 'auth-login' }" class="btn btn-link"
            >ログイン画面に戻る</RouterLink
          >
        </div>
      </form>
    </div>
  </Default>
</template>
