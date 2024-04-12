<script setup>
import { h } from 'vue'
import { NIcon, NDropdown, NButton } from 'naive-ui'
import {
  LogOutOutlined as LogOutIcon,
  KeyboardArrowDownOutlined as ArrowDownIcon,
} from '@vicons/material'
import api from '@/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const LOGOUT = 'logout'

const router = useRouter()
const store = useStore()

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const options = [
  {
    label: 'ログアウト',
    key: 'logout',
    icon: renderIcon(LogOutIcon),
  },
]

const handleSelect = (key) => {
  switch (key) {
    case LOGOUT:
      logout()
      break
    default:
      break
  }
}

const logout = async () => {
  await api.auth.logout()
  store.commit('auth/setCurrentUser', null)
  router.push({ name: 'auth-login' })
}
</script>

<template>
  <nav class="header-nav gb-gray-200 justify-content-end px-3">
    <NDropdown
      :options="options"
      placement="bottom-end"
      trigger="click"
      @select="handleSelect"
    >
      <NButton text icon-placement="right">
        <template #icon>
          <NIcon>
            <ArrowDownIcon />
          </NIcon>
        </template>
        <span>{{ store.getters['auth/currentUser']?.name }}</span></NButton
      >
    </NDropdown>
  </nav>
</template>

<style lang="scss" scoped>
.header-nav {
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 998;
}
</style>
