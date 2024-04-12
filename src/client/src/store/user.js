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
  async fetch({ commit }, { params }) {
    const { data, meta } = await api.user.fetch(params)
    commit('putItems', data)
    commit('setMeta', meta)
  },

  async create(_, { params }) {
    await api.user.create(params)
  },

  async update({ commit }, { id, params }) {
    const { data } = await api.user.update(id, params)
    commit('setItem', data)
  },

  async activate({ commit }, { id }) {
    const { data } = await api.user.activate(id)
    commit('setItem', data)
  },

  async deactivate({ commit }, { id }) {
    const { data } = await api.user.deactivate(id)
    commit('setItem', data)
  },
}
