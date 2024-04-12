import qs from 'qs'
import axios from 'axios'
import merge from 'lodash.merge'
import { decamelizeKeys, camelizeKeys } from '@/utils/object'
import * as httpStatusCode from '@/constants/httpStatusCode'

const BASE_API_URL = import.meta.env.VITE_API_URL

const normalizeValidationErrorKeys = (data) => {
  if (!data.errors || typeof data.errors !== 'object') {
    return data
  }

  Object.keys(data.errors).forEach((key) => {
    if (!String(key).includes('.')) {
      return
    }

    const groupKey = key.split('.')[0]

    if (!data.errors[groupKey]) {
      data.errors[groupKey] = []
    }

    if (!Array.isArray(data.errors[groupKey])) {
      data.errors[groupKey] = [data.errors[groupKey]]
    }

    data.errors[groupKey].push(...data.errors[key])
  })

  return data
}

export default class HttpClient {
  constructor(config = {}) {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }

    this.httpClient = axios.create()

    const urlPrefix = config.urlPrefix ?? 'api/v1'
    this.urlPrefix = urlPrefix.startsWith('/')
      ? urlPrefix.substring(1)
      : urlPrefix
  }

  setHeader(name, value) {
    this.config.headers[name] = value
  }

  removeHeader(name) {
    delete this.config.headers[name]
  }

  fetch(url, config = {}, options = {}) {
    return this.request({ method: 'get', url }, config, options)
  }

  post(url, data = {}, config = {}, options = {}) {
    return this.request({ method: 'post', url, data }, config, options)
  }

  put(url, data = {}, config = {}, options = {}) {
    return this.request({ method: 'put', url, data }, config, options)
  }

  patch(url, data = {}, config = {}, options = {}) {
    return this.request({ method: 'patch', url, data }, config, options)
  }

  delete(url, config = {}, options = {}) {
    return this.request({ method: 'delete', url }, config, options)
  }

  request(request, config, options = {}, retry = false) {
    const {
      decamelizeRequest = true,
      camelizeResponse = true,
      query = {},
      withHeaders = false,
    } = options

    if (!retry) {
      const { url } = request
      const encodedQuery =
        Object.keys(query).length > 0 ? qs.stringify(decamelizeKeys(query)) : ''
      const urlPrefix = config.urlPrefix ?? this.urlPrefix

      request.url = [BASE_API_URL, urlPrefix, url]
        .filter((part) => part)
        .join('/')

      if (encodedQuery) {
        request.url += '?' + encodedQuery
      }

      if (decamelizeRequest && request.data) {
        request.data = decamelizeKeys(request.data)
      }
    }

    return this.httpClient
      .request(merge({}, this.config, config, request))
      .then((response) => (withHeaders ? response : response.data))
      .then((data) => (camelizeResponse ? camelizeKeys(data) : data))
      .catch((error) =>
        this.handleError(error, { request, config, options }, retry)
      )
  }

  // eslint-disable-next-line no-unused-vars
  async handleError(error, requestParams, retry) {
    if (!error.isAxiosError) {
      throw error
    }

    const { status } = error.response

    switch (status) {
      case httpStatusCode.UNAUTHORIZED:
        break
      // return await this.handleUnauthenticatedError(
      //   error,
      //   requestParams,
      //   retry
      // )
      case httpStatusCode.UNPROCESSABLE_ENTITY:
        error.response.data = camelizeKeys(
          normalizeValidationErrorKeys(error.response.data)
        )
        break
      default:
        break
    }

    throw error
  }

  // eslint-disable-next-line no-unused-vars
  async handleUnauthenticatedError(error, requestParams, retry) {
    throw error
  }

  retryRequest(requestParams) {
    const { request, config, options } = requestParams

    return this.request(request, config, options, true)
  }
}
