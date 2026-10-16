import type { SelectField } from 'payload'

/**
 * Иконка из набора UI Kit. Редактор выбирает из пресетов, а не загружает
 * произвольную картинку — размер и стиль иконок едины по всему сайту.
 */
export const iconOptions = [
  { label: 'Без иконки', value: 'none' },
  { label: 'Телефон', value: 'phone' },
  { label: 'Почта', value: 'mail' },
  { label: 'Поиск', value: 'search' },
  { label: 'Поддержка', value: 'support' },
  { label: 'База знаний', value: 'book' },
] as const

export type IconValue = (typeof iconOptions)[number]['value']

/** Поле «Иконка» (`name: 'icon'`). */
export function iconSelectField(): SelectField {
  return {
    name: 'icon',
    type: 'select',
    label: 'Иконка',
    defaultValue: 'none',
    options: iconOptions.map((option) => ({ ...option })),
    admin: {
      description: 'Иконка из набора UI Kit: единый размер и стиль.',
    },
  }
}
