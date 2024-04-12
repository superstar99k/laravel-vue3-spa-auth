import api from '@/api'

export const namespaced = true

export const state = () => ({
  currentUser: null,
})

export const getters = {
  currentUser: ({ currentUser }) => currentUser,
  loggedIn: ({ currentUser }) => currentUser !== null,
}

export const mutations = {
  setCurrentUser(state, data) {
    state.currentUser = data
  },
}

export const actions = {
  async passwordLogin({ commit }, { params }) {
    const { data } = await api.auth.password(params)

    commit('setCurrentUser', data)
  },

  async fetchMe({ commit }) {
    const { data } = await api.auth.me()

    commit('setCurrentUser', data)
  },

  async sendResetPasswordEmail(_, { params }) {
    await api.auth.sendResetPasswordEmail(params)
  },

  async resetPassword(_, { params }) {
    await api.auth.resetPassword(params)
  },
}
