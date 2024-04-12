import { createApp } from 'vue'
import '@/bootstrap'
import App from '@/App.vue'
import router from '@/router'
import { store } from '@/store'
import '@/assets/css/main.scss'

const mount = async () => {
  try {
    await store.dispatch('auth/fetchMe')
    await store.dispatch('loggedIn')
  } finally {
    const app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')
  }
}

mount()
