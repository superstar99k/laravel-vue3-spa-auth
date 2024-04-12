export default (httpClient) => ({
  fetch(options = {}) {
    return httpClient.fetch('admin/constants', {}, options)
  },

  attributes() {
    return httpClient.fetch('admin/constants/attributes')
  },

  config() {
    return httpClient.fetch('admin/constants/config')
  },

  pref() {
    return httpClient.fetch('admin/pref')
  },
})
