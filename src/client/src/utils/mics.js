/**
 * @param {Blob} resource
 * @param {String} fileName
 */
export const downloadFile = (resource, fileName) => {
  const url = window.URL.createObjectURL(resource)
  const element = document.createElement('a')

  element.style.setProperty('opacity', '0')

  document.body.appendChild(element)

  element.download = fileName ?? ''
  element.href = url
  element.click()
  element.remove()

  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export const basename = (filepath) =>
  String(filepath || '')
    .split('/')
    .slice(-1)[0] ?? null
