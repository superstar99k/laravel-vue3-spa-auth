import { defineRule, configure } from 'vee-validate'
import {
  confirmed,
  required,
  length,
  email,
  image,
  size,
  min,
  max,
  min_value as minValue,
  max_value as maxValue,
  between,
  alpha_dash as alphaDash,
  numeric,
} from '@vee-validate/rules'
import { setLocale, localize } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import dayjs from 'dayjs'

defineRule('password_char', (value) => {
  if (!/^[a-z\d!-/:-@[-`{-~]*$/i.test(value)) {
    return 'パスワードは半角小文字アルファベットと半角数字および記号の組み合わせで入力してください。'
  }
  return true
})
defineRule('date', (value) => {
  if (value === null || value === undefined || value === '') {
    return true
  }

  if (!dayjs(value).isValid()) {
    return '日時を入力して下さい。'
  }
  return true
})
defineRule('gt', (value, [target, label], ctx) => {
  if (value > ctx.form[target]) {
    return true
  }

  return `${label}よりも大きな値を指定してください。`
})
defineRule('lt', (value, [target, label], ctx) => {
  if (value < ctx.form[target]) {
    return true
  }

  return `${label}よりも小さい値を指定してください。`
})
defineRule('after', (value, [target], ctx) => {
  if (dayjs(value) > dayjs(ctx.form[target])) {
    return true
  }

  return `${ctx.field}は${dayjs(ctx.form[target]).format(
    'YYYY年MM月'
  )}以上です。`
})

defineRule('confirmed', confirmed)
defineRule('required', required)
defineRule('length', length)
defineRule('email', email)
defineRule('image', image)
defineRule('size', size)
defineRule('min', min)
defineRule('max', max)
defineRule('minValue', minValue)
defineRule('maxValue', maxValue)
defineRule('between', between)
defineRule('alpha_dash', alphaDash)
defineRule('numeric', numeric)

configure({
  generateMessage: localize({
    ja,
  }),
})

setLocale('ja')
