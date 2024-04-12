export const namespaced = true

export const state = () => ({
  info: [],
  success: [],
  warning: [],
  error: [],
})

export const getters = {
  info: ({ info }) => info,
  success: ({ success }) => success,
  warning: ({ warning }) => warning,
  error: ({ error }) => error,
  any: ({ info, success, warning, error }) =>
    [info, success, warning, error].some((alerts) => alerts.length > 0),
}

export const mutations = {
  push(state, { type, messages }) {
    state[type].push(...(Array.isArray(messages) ? messages : [messages]))
  },

  putMessages(state, { type, messages }) {
    state[type] = messages
  },

  remove(state, { type, index }) {
    state[type].splice(index, 1)
  },

  clear(state, { type }) {
    state[type] = []
  },

  pushInfo(state, messages) {
    state.info.push(...(Array.isArray(messages) ? messages : [messages]))
  },

  pushSuccess(state, messages) {
    state.success.push(...(Array.isArray(messages) ? messages : [messages]))
  },

  pushWarning(state, messages) {
    state.warning.push(...(Array.isArray(messages) ? messages : [messages]))
  },

  pushError(state, messages) {
    state.error.push(...(Array.isArray(messages) ? messages : [messages]))
  },

  putInfo(state, messages) {
    state.info = messages
  },

  putSuccess(state, messages) {
    state.success = messages
  },

  putWarning(state, messages) {
    state.warning = messages
  },

  putError(state, messages) {
    state.error = messages
  },

  removeInfo(state, index) {
    state.info.splice(index, 1)
  },

  removeSuccess(state, index) {
    state.success.splice(index, 1)
  },

  removeWarning(state, index) {
    state.warning.splice(index, 1)
  },

  removeError(state, index) {
    state.error.splice(index, 1)
  },

  clearInfo(state) {
    state.info = []
  },

  clearSuccess(state) {
    state.success = []
  },

  clearWarning(state) {
    state.warning = []
  },

  clearError(state) {
    state.error = []
  },

  clearAll(state) {
    state.info = []
    state.success = []
    state.warning = []
    state.error = []
  },
}
