import * as httpStatusCode from '@/constants/httpStatusCode'
import { flatten } from '@/utils/array'
import ValidationError from '@/errors/ValidationError'

export const isHttpError = (error) => {
  return error.response !== undefined
}

export const isHttpUnprocessableEntityError = (error) => {
  return (
    isHttpError(error) &&
    error.response.status === httpStatusCode.UNPROCESSABLE_ENTITY
  )
}

export const extractErrorMessages = (error) => {
  const defaultMessage = 'エラーが発生したため処理を完了できませんでした。'

  if (!isHttpError(error)) {
    return [defaultMessage]
  }

  const { errors, message } = error.response.data

  if (!errors) {
    return [message || defaultMessage]
  }

  if (Array.isArray(errors)) {
    return flatten(errors)
  }

  return Object.keys(errors).reduce(
    (messages, key) => messages.concat(errors[key]),
    []
  )
}

export const extractFormErrors = (error) => {
  const defaultUnexpectedErrorMessage =
    'エラーが発生したため処理を完了できませんでした。'
  const defaultErrors = {}

  if (error instanceof ValidationError) {
    return { message: error.message, errors: defaultErrors }
  }

  if (!isHttpError(error)) {
    return { message: defaultUnexpectedErrorMessage, errors: defaultErrors }
  }

  const { message, errors } = error.response.data

  return { message, errors: errors || defaultErrors }
}

export const extractFlattenErrors = (error) => {
  const errors = extractFormErrors(error)
  return _extractFlattenErrors(errors)
}

const _extractFlattenErrors = (errors) =>
  Object.keys(errors)
    .reduce(
      (flatened, key) =>
        flatened.concat(
          typeof errors[key] === 'object'
            ? _extractFlattenErrors(errors[key])
            : errors[key]
        ),
      []
    )
    .filter((error) => error)
