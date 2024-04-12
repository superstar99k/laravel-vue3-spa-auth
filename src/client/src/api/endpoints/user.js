import { filterQueryParams } from '@/utils/http'

export default (httpClient) => ({
  fetch(params) {
    return httpClient.fetch(
      'admin/users',
      {},
      { query: filterQueryParams(params) }
    )
  },

  create(payload) {
    return httpClient.post('admin/users', payload)
  },

  update(id, payload) {
    return httpClient.patch(`admin/users/${id}`, payload)
  },

  activate(id) {
    return httpClient.patch(`admin/users/${id}/activate`)
  },

  deactivate(id) {
    return httpClient.patch(`admin/users/${id}/deactivate`)
  },
})
