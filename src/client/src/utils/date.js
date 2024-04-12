import dayjs from 'dayjs'

export const between = (target, [from, to]) =>
  dayjs(target).diff(from) >= 0 && dayjs(target).diff(to) <= 0

export const formatDate = (dateTimeString, format = 'YYYY/MM/DD') => {
  if (!dateTimeString) {
    return ''
  }

  const date = dayjs(dateTimeString)

  if (!date.isValid()) {
    return ''
  }

  return date.format(format)
}
