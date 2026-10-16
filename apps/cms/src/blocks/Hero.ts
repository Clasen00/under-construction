import type { Block } from 'payload'

import { buttonVariantField } from '../fields/button-variant'
import { productSelectField } from '../fields/product-select'

/**
 * Hero главной. Контент-менеджер меняет тексты, картинку и кнопки, но не может
 * повлиять на сетку, кегль заголовка, цвета пилюль или размеры кнопок — они
 * заданы вёрсткой и токенами UI Kit.
 */
export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Hero',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      localized: true,
      required: true,
      label: 'Заголовок',
      admin: {
        description: 'Одна мысль. Переносы строк сохраняются на сайте.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Описание',
      admin: {
        description: 'Необязательно. Выводится под заголовком.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Изображение',
      admin: {
        description: 'Основная картинка Hero. Меняется без правки вёрстки.',
      },
    },
    {
      name: 'imageAlt',
      type: 'text',
      localized: true,
      label: 'Alt изображения',
      admin: {
        description: 'Необязательно. По умолчанию берётся alt из медиафайла.',
      },
    },
    {
      name: 'mediaSide',
      type: 'select',
      label: 'Положение изображения',
      defaultValue: 'right',
      options: [
        { label: 'Справа', value: 'right' },
        { label: 'Слева', value: 'left' },
      ],
      admin: {
        description: 'Меняет только порядок колонок. Сетка и отступы фиксированы.',
      },
    },
    {
      name: 'productPills',
      type: 'array',
      label: 'Плашки продуктов',
      maxRows: 12,
      admin: {
        description: 'Пилюли под заголовком. Цвет берётся из пресета продукта.',
      },
      fields: [
        productSelectField(),
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: 'Название',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Ссылка',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Иконка',
          admin: {
            description: 'Необязательно. Без неё используется иконка продукта по умолчанию.',
          },
        },
      ],
    },
    {
      name: 'ctas',
      type: 'array',
      label: 'Кнопки',
      maxRows: 3,
      admin: {
        description: 'Основные действия Hero. Размер кнопок фиксирован.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: 'Текст кнопки',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Ссылка',
        },
        buttonVariantField(),
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Открывать в новой вкладке',
          defaultValue: false,
        },
      ],
    },
  ],
}
