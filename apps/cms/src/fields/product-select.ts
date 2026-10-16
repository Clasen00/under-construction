import type { SelectField } from 'payload'

/**
 * Продукт IVA 360 — источник акцентных цветов (токены `--<product>-*`).
 * Вместо ввода hex-кода редактор выбирает продукт: палитра и контраст
 * гарантированы темой UI Kit.
 */
export const productOptions = [
  { label: 'Встречи', value: 'meetings' },
  { label: 'Мессенджер', value: 'messenger' },
  { label: 'Почта', value: 'mail' },
  { label: 'Вебинары', value: 'webinars' },
  { label: 'ИИ-Ассистент', value: 'ai' },
  { label: 'Диск и документы', value: 'drive' },
  { label: 'Интерактивная доска', value: 'board' },
  { label: 'Онлайн-трансляции', value: 'broadcasts' },
] as const

export type ProductValue = (typeof productOptions)[number]['value']

/** Поле «Продукт» (`name: 'product'`). */
export function productSelectField(): SelectField {
  return {
    name: 'product',
    type: 'select',
    label: 'Продукт',
    required: true,
    options: productOptions.map((option) => ({ ...option })),
    admin: {
      description: 'Определяет акцентные цвета из темы. Произвольные цвета недоступны.',
    },
  }
}
