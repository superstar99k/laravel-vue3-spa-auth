import masterState from '@/store/mixins/masterState'
import * as masterGetters from '@/store/mixins/masterGetters'
import * as masterMutations from '@/store/mixins/masterMutations'
import api from '@/api'
export const namespaced = true

export const state = () => ({
  ...masterState(),
})

export const getters = {
  ...masterGetters,
}

export const mutations = {
  ...masterMutations,
}

export const actions = {
  async fetch({ commit }) {
    const { data } = await api.constant.pref()
    commit('putItems', data)
  },
}
