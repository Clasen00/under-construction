import type { SelectField } from 'payload'

/**
 * Стиль кнопки — закрытый список вариантов UI Kit (@iva360/button).
 * Контент-менеджер выбирает пресет и не может задать произвольные цвета,
 * градиенты или размеры — вёрстка кнопок остаётся неизменной.
 */
export const buttonVariantOptions = [
  { label: 'Основная', value: 'default' },
  { label: 'Вторичная (серая)', value: 'secondary' },
  { label: 'Контурная', value: 'outline' },
  { label: 'Прозрачная', value: 'ghost' },
  { label: 'Брендовая контурная', value: 'green' },
  { label: 'Белая', value: 'white' },
  { label: 'Ссылка', value: 'link' },
] as const

export type ButtonVariantValue = (typeof buttonVariantOptions)[number]['value']

/** Поле «Стиль кнопки» (`name: 'variant'`). */
export function buttonVariantField(defaultValue: ButtonVariantValue = 'default'): SelectField {
  return {
    name: 'variant',
    type: 'select',
    label: 'Стиль кнопки',
    required: true,
    defaultValue,
    options: buttonVariantOptions.map((option) => ({ ...option })),
    admin: {
      description: 'Оформление берётся из пресетов UI Kit. Произвольные цвета недоступны.',
    },
  }
}
