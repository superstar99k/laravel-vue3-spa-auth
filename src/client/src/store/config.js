import api from '@/api'

export const namespaced = true

export const state = () => ({
  data: null,
})

export const getters = {
  data: ({ data }) => data,
}

export const mutations = {
  set(state, data) {
    state.data = data
  },
}

export const actions = {
  async fetch({ commit }) {
    const { data } = await api.constant.config()
    commit('set', data)
  },
}
