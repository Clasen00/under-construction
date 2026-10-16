import type { GlobalConfig } from 'payload'

import { buttonVariantField } from '../fields/button-variant'
import { iconSelectField } from '../fields/icon-select'
import { hrefField, openInNewTabField } from '../fields/link'

/**
 * Общая шапка сайта. Единая на всех страницах, поэтому это global, а не блок.
 * Структура пунктов меню, топбара и кнопок — из пресетов; вёрстка и цвета
 * задаются фронтендом.
 */
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка',
  admin: {
    group: 'Структура сайта',
    description: 'Логотип, топбар, основное меню и кнопки входа. Общая для всех страниц.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Логотип',
      admin: {
        description: 'SVG или PNG с прозрачным фоном. На сайте выводится высотой 36px.',
      },
    },
    {
      name: 'title',
      type: 'text',
      localized: true,
      label: 'Название компании',
      admin: {
        description: 'Подпись логотипа для доступности (alt) и метаданных.',
      },
    },
    {
      name: 'topbar',
      type: 'group',
      label: 'Топбар',
      admin: {
        description: 'Верхняя тонкая полоса. Показывается только на десктопе.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Показывать топбар',
          defaultValue: true,
        },
        {
          name: 'contacts',
          type: 'array',
          label: 'Контакты',
          maxRows: 4,
          admin: {
            description: 'Слева: телефон, e-mail или ссылка.',
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              label: 'Текст',
            },
            {
              name: 'type',
              type: 'select',
              label: 'Тип',
              required: true,
              defaultValue: 'link',
              options: [
                { label: 'Телефон', value: 'phone' },
                { label: 'E-mail', value: 'email' },
                { label: 'Ссылка', value: 'link' },
              ],
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Телефон',
              admin: {
                description: 'Например, +7 495 648-66-73.',
                condition: (_data, siblingData) => siblingData?.type === 'phone',
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'E-mail',
              admin: {
                condition: (_data, siblingData) => siblingData?.type === 'email',
              },
            },
            {
              name: 'href',
              type: 'text',
              label: 'Ссылка',
              admin: {
                description: 'Внутренний путь (/contacts) или внешний адрес.',
                condition: (_data, siblingData) => siblingData?.type === 'link',
              },
            },
            iconSelectField(),
          ],
        },
        {
          name: 'links',
          type: 'array',
          label: 'Ссылки',
          maxRows: 6,
          admin: {
            description: 'Справа: поиск, партнёрам, контакты, база знаний.',
            condition: (_data, siblingData) => Boolean(siblingData?.enabled),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              label: 'Текст',
            },
            hrefField(),
            iconSelectField(),
            openInNewTabField(),
          ],
        },
      ],
    },
    {
      name: 'nav',
      type: 'array',
      label: 'Меню',
      maxRows: 8,
      admin: {
        description: 'Основная навигация. Подпункты доступны только для типа «Выпадающее меню».',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: 'Название пункта',
        },
        {
          name: 'type',
          type: 'select',
          label: 'Тип',
          required: true,
          defaultValue: 'link',
          options: [
            { label: 'Ссылка', value: 'link' },
            { label: 'Выпадающее меню', value: 'dropdown' },
          ],
        },
        {
          name: 'href',
          type: 'text',
          label: 'Ссылка',
          admin: {
            description:
              'Обязательна для типа «Ссылка». Для меню — необязательна: если указана, заголовок кликабелен.',
            condition: (_data, siblingData) => Boolean(siblingData?.type),
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Подпункты',
          maxRows: 8,
          admin: {
            condition: (_data, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              label: 'Название',
            },
            {
              name: 'description',
              type: 'text',
              localized: true,
              label: 'Описание',
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
                description: 'Необязательно.',
              },
            },
            openInNewTabField(),
          ],
        },
      ],
    },
    {
      name: 'actions',
      type: 'array',
      label: 'Кнопки',
      maxRows: 4,
      admin: {
        description: 'Кнопки входа/регистрации справа. Стиль — из пресетов UI Kit.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: 'Текст',
        },
        hrefField(),
        buttonVariantField('secondary'),
        {
          name: 'visibility',
          type: 'select',
          label: 'Показывать',
          required: true,
          defaultValue: 'both',
          options: [
            { label: 'Везде', value: 'both' },
            { label: 'Только десктоп', value: 'desktop' },
            { label: 'Только мобильные', value: 'mobile' },
          ],
        },
        openInNewTabField(),
      ],
    },
  ],
}
