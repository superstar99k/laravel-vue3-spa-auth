export const booleanLikeToNumber = (value) => {
  if (!value) {
    return null
  }

  if (String(value || '').toLowerCase() === 'true') {
    return 1
  }

  if (String(value || '').toLowerCase() === 'false') {
    return 0
  }

  if (
    String(value)
      .trim()
      .match(/^[01]$/)
  ) {
    return Number(value)
  }

  return Number(Boolean(value))
}

export const isLikeBoolean = (value) => {
  if (String(value || '').toLowerCase() === 'true') {
    return true
  }

  if (String(value || '').toLowerCase() === 'false') {
    return true
  }

  if (
    String(value)
      .trim()
      .match(/^[01]$/)
  ) {
    return true
  }

  return typeof value === 'boolean'
}

export const isNumber = (value) => {
  value = String(value || '')
  return value.match(/^[\d]+$/) && value.match(/^[^0]/)
}
