import api from '@/api'

export const namespaced = true

export const state = () => ({
  data: {},
})

export const getters = {
  all: ({ data }) => data,
}

export const mutations = {
  set(state, data) {
    state.data = data
  },
}

export const actions = {
  async fetch({ commit }) {
    const { data } = await api.constant.attributes()
    commit('set', data)
  },
}
