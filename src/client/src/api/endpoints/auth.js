export default (httpClient) => ({
  initializeCsrfCookie() {
    return httpClient.fetch('sanctum/csrf-cookie', { urlPrefix: '' })
  },

  password(payload) {
    return httpClient.post('auth/password', payload)
  },

  me() {
    return httpClient.fetch('auth/me')
  },

  logout() {
    return httpClient.post('auth/logout')
  },

  verify(payload) {
    return httpClient.post('auth/verify', payload)
  },

  sendResetPasswordEmail(payload) {
    return httpClient.post('auth/send_reset_password_email', payload)
  },

  resetPassword(payload) {
    return httpClient.post('auth/reset_password', payload)
  },
})
