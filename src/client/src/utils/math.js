/**
 * 10のN乗倍に数値を変換する
 *
 * @param {Number} value
 * @param {Number} num
 * @return {Number}
 */
export const multiply10NthPower = (value, num) => {
  if (!value) {
    return value
  }

  if (num === 0) {
    return value
  }

  return num > 0
    ? multiply10PositiveNthPower(value, num)
    : multiply10NegativeNthPower(value, num * -1)
}

/**
 * 10のN乗倍（プラスのみ）に数値を変換する
 *
 * @param {Number} value
 * @param {Number} num
 * @return {Number}
 */
export const multiply10PositiveNthPower = (value, num = 2) => {
  if (!value || Number.isNaN(Number(value)) || Number(value) === 0) {
    return value
  }

  const decimalPoint = String(value).indexOf('.')

  const sequence = (
    decimalPoint > -1
      ? String(value)
          .match(/(\d*)\.(\d*)/)
          .slice(1)
      : [String(value)]
  )
    .join('')
    .split('')

  if (decimalPoint !== -1 && sequence.length >= decimalPoint + num) {
    sequence.splice(decimalPoint + num, 0, '.')
  } else {
    const padNumber =
      decimalPoint === -1
        ? num
        : Math.max(decimalPoint + num - sequence.length, 0)
    sequence.push(...[...new Array(padNumber)].map(() => 0))
  }

  return sequence
    .join('')
    .replace(/^0+(0\.)/, '$1')
    .replace(/^0+([\d])/, '$1')
    .replace(/\.$/, '')
}

/**
 * 1/10のN乗倍に数値を変換する
 *
 * @param {Number} value
 * @param {Number} num
 * @return {Number}
 */
export const multiply10NegativeNthPower = (value, num = 2) => {
  if (!value || Number.isNaN(Number(value)) || Number(value) === 0) {
    return value
  }

  const decimalPoint = String(value).indexOf('.')

  const sequence = (
    decimalPoint > -1
      ? String(value)
          .match(/(\d*)\.(\d*)/)
          .slice(1)
      : [String(value)]
  )
    .join('')
    .split('')

  const index = decimalPoint > -1 ? decimalPoint : sequence.length
  const newDecimalPoint = Math.max(index - num, 0)
  const padNumber = Math.min(index - num, 0) * -1

  sequence.splice(
    newDecimalPoint,
    0,
    [newDecimalPoint > 0 ? '.' : '0.']
      .concat([...new Array(padNumber)].map(() => 0))
      .join('')
  )

  return sequence.join('')
}

export const sum = (items, prop = null) =>
  (items || []).reduce(
    (sum, item) => Number(prop ? item[prop] : item || 0) + sum,
    0
  )

export const avg = (items, prop = null) =>
  (items || []).reduce(
    (sum, item) => Number(prop ? item[prop] : item || 0) + sum,
    0
  ) / (items || []).length

/**
 *
 * @param {Number|String} value
 * @param {Number} precision
 *
 * @returns {Number}
 */
export const round = (value, precision = 0) => {
  if (precision === 0) {
    return Math.round(value)
  }

  if (!value) {
    return 0
  }

  const rounded = Number(
    multiply10NegativeNthPower(
      Math.round(
        Number(multiply10PositiveNthPower(Math.abs(value), precision))
      ),
      precision
    )
  )

  if (value < 0) return rounded * -1

  return rounded
}

/**
 * @param {Array<Number>} array
 * @returns {Array<Number>}
 */
export const cumulative = (array) =>
  array.reduce((cumulativeArray, value, index) => {
    const previous = cumulativeArray[index - 1] ?? 0
    cumulativeArray.push(Number(previous || 0) + Number(value || 0))
    return cumulativeArray
  }, [])

export const isValid = (value) => {
  if (!Number.isFinite(value)) {
    return false
  }

  if (Number.isNaN(value)) {
    return false
  }

  return true
}
