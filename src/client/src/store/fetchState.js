export const namespaced = true

export const state = () => ({
  pending: false,
})

export const getters = {
  pending: ({ pending }) => pending,
}

export const mutations = {
  pending(state, value) {
    state.pending = value
  },
}
