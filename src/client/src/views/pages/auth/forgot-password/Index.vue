<script setup>
import Default from '@/views/layouts/Default.vue'
import PageTitle from '@/components/atoms/titles/PageTitle.vue'
import TextField from '@/components/molecules/formFields/TextField.vue'
import LoadableButton from '@/components/molecules/buttons/LoadableButton.vue'
import AlertList from '@/components/organisms/alerts/AlertList.vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { extractFormErrors } from '@/errors/utils'

const store = useStore()
const router = useRouter()

const inputs = reactive({
  email: '',
  emailConfirmation: '',
})

const { handleSubmit, setErrors } = useForm({
  validationSchema: {
    email: 'email|required',
    emailConfirmation: 'email|required|confirmed:@email',
  },
})

const pending = computed(() => store.getters['fetchState/pending'])

const sendResetPasswordEmail = handleSubmit(async () => {
  try {
    const params = { ...inputs }

    store.commit('alert/clear', { type: 'error' })
    store.commit('fetchState/pending', true)

    await store.dispatch('auth/sendResetPasswordEmail', { params })

    router.push({ name: 'auth-forgot_password-sent' })
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
      <form @submit="sendResetPasswordEmail" @keydown.enter.prevent="">
        <div class="mb-3">
          <TextField
            id="email"
            v-model="inputs.email"
            name="email"
            label="メールアドレス"
          />
        </div>
        <div>
          <TextField
            id="email_confirmation"
            v-model="inputs.emailConfirmation"
            name="emailConfirmation"
            label="確認用メールアドレス"
          />
        </div>
        <LoadableButton
          class="d-block btn btn-primary mt-4 w-100"
          type="submit"
          :loading="pending"
          >パスワード再設定用のメールを送信する</LoadableButton
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
