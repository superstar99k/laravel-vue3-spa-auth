import {
  createDict,
  createOptions,
  createCodeOptions,
  createCodeNameOptions,
} from '@/utils/array'

export const all = ({ items }) => items

export const find =
  ({ items }) =>
  (searchId, keyName = 'id') =>
    items.find((item) => Number(item[keyName]) === Number(searchId))

export const first = ({ items }) => items[0]

export const last = ({ items }) => items[items.length - 1]

export const options = ({ items }) => createOptions(items)

export const codeOptions = ({ items }) => createCodeOptions(items)

export const codeNameOptions = ({ items }) => createCodeNameOptions(items)

export const dict = ({ items }) => createDict(items)

export const meta = ({ meta }) => meta

export const detail = ({ detail }) => detail
