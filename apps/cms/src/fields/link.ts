import type { CheckboxField, TextField } from 'payload'

/** Поле «Ссылка» (`name: 'href'`, обязательное). */
export function hrefField(): TextField {
  return {
    name: 'href',
    type: 'text',
    label: 'Ссылка',
    required: true,
    admin: {
      description: 'Внутренний путь (/tariffs) или внешний адрес (https://…).',
    },
  }
}

/** Чекбокс «Открывать в новой вкладке» (`name: 'openInNewTab'`). */
export function openInNewTabField(): CheckboxField {
  return {
    name: 'openInNewTab',
    type: 'checkbox',
    label: 'Открывать в новой вкладке',
    defaultValue: false,
  }
}
