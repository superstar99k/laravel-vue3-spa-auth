import camelcase from 'camelcase'
import { arr2Kv } from '@/utils/object'
import api from '@/api'

export const namespaced = true

export const state = () => ({
  constants: {},
})

export const getters = {
  all: ({ constants }) => constants,

  normalized: ({ constants }) =>
    Object.keys(constants).reduce(
      (data, key) => ({
        ...data,
        [camelcase(key.replace(/__/g, '/'))]: constants[key],
      }),
      {}
    ),

  kv: (state, { normalized }) =>
    Object.keys(normalized).reduce(
      (data, key) => ({
        ...data,
        [key]: arr2Kv(normalized[key]),
      }),
      {}
    ),

  vk: (state, { normalized }) =>
    Object.keys(normalized).reduce(
      (data, key) => ({
        ...data,
        [key]: normalized[key].reduce(
          (kv, { value, key }) => ({
            ...kv,
            [value]: key,
          }),
          {}
        ),
      }),
      {}
    ),

  keyLabel: (state, { normalized }) =>
    Object.keys(normalized).reduce(
      (data, key) => ({
        ...data,
        [key]: arr2Kv(normalized[key], {
          valueName: 'label',
        }),
      }),
      {}
    ),

  valueLabel: (state, { normalized }) =>
    Object.keys(normalized).reduce(
      (data, key) => ({
        ...data,
        [key]: normalized[key].reduce(
          (kv, { value, label }) => ({
            ...kv,
            [value]: label,
          }),
          {}
        ),
      }),
      {}
    ),

  options: (state, { normalized }) =>
    Object.keys(normalized).reduce(
      (data, key) => ({
        ...data,
        [key]: normalized[key].map(({ value, label }) => ({
          value,
          label,
        })),
      }),
      {}
    ),
}

export const mutations = {
  set(state, data) {
    state.constants = data
  },
}

export const actions = {
  async fetch({ commit }) {
    const { data } = await api.constant.fetch({ camelizeResponse: false })
    commit('set', data)
  },
}
