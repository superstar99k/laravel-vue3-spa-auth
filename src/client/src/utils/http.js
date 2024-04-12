import { decamelizeKeys, camelizeKeys, emptyObject } from '@/utils/object'
import { booleanLikeToNumber, isLikeBoolean, isNumber } from './cast'

export const filterQueryParams = (params) =>
  Object.keys(params).reduce((queryParams, key) => {
    if (emptyObject(params[key])) {
      return queryParams
    }

    if (!params[key] && params[key] !== 0 && params[key] !== false) {
      return queryParams
    }

    if (Array.isArray(params[key])) {
      queryParams[key] = params[key].filter(
        (value) => value || value === 0 || value === false
      )
      return queryParams
    }

    if (typeof params[key] === 'object') {
      queryParams[key] = filterQueryParams(params[key])
      return queryParams
    }

    queryParams[key] = params[key]

    return queryParams
  }, {})

export const preprocessStringfyingQuery = (params) => {
  params = decamelizeKeys(params)
  params = castAllBoolean(params)

  return params
}

const castAllBoolean = (query) => {
  if (!query || typeof query !== 'object') {
    if (!isLikeBoolean(query)) {
      return query
    }

    return booleanLikeToNumber(query)
  }

  if (Array.isArray(query)) {
    return query.map((value) => castAllBoolean(value))
  }

  return Object.keys(query).reduce(
    (values, key) =>
      Object.assign(values, { [key]: castAllBoolean(query[key]) }),
    {}
  )
}

const castAllNumber = (query) => {
  if (!query || typeof query !== 'object') {
    if (!isNumber(query)) {
      return query
    }

    return Number(query)
  }

  if (Array.isArray(query)) {
    return query.map((value) => castAllNumber(value))
  }

  return Object.keys(query).reduce(
    (values, key) =>
      Object.assign(values, { [key]: castAllNumber(query[key]) }),
    {}
  )
}

export const processRouteQuery = (query) => {
  let params = { ...query }
  params = camelizeKeys(params)
  params = castAllBoolean(params)
  params = castAllNumber(params)

  return params
}

export const extractAttachmentFileName = (headers) => {
  if (typeof headers['content-disposition'] !== 'string') {
    return null
  }

  const matches = headers['content-disposition'].match(
    /attachment; filename="(.+)";?$/
  ) || [null, null]

  return decodeURIComponent(String(matches[1]))
}
