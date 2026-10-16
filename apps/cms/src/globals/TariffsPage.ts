import type { GlobalConfig } from 'payload'

import { productOptions, productSelectField } from '../fields/product-select'

/**
 * Страница тарифов. Контент-менеджер управляет вкладками продуктов, карточками
 * тарифов, пакетами «готовые решения» и блоком консультации.
 *
 * Вёрстка, сетка, размеры и цвета — из темы UI Kit. Редактор выбирает только
 * пресеты (продукт, тон, стиль кнопки) — произвольные цвета и размеры недоступны.
 */
export const TariffsPage: GlobalConfig = {
  slug: 'tariffs-page',
  label: 'Тарифы',
  admin: {
    group: 'Структура сайта',
    description: 'Контент страницы /tariffs.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
      label: 'Заголовок страницы',
      admin: {
        description: 'Например, «Подписки на продукты».',
      },
    },
    {
      name: 'lead',
      type: 'textarea',
      localized: true,
      label: 'Подзаголовок',
      admin: {
        description: 'Необязательно.',
      },
    },
    {
      name: 'periods',
      type: 'array',
      label: 'Периоды оплаты',
      maxRows: 4,
      admin: {
        description:
          'Переключатель «3 / 6 / 12 мес». Значение месяцев сопоставляется с ценами в вариантах тарифов.',
      },
      fields: [
        {
          name: 'months',
          type: 'number',
          required: true,
          min: 1,
          label: 'Месяцев',
        },
        {
          name: 'discount',
          type: 'text',
          localized: true,
          label: 'Скидка',
          admin: {
            description: 'Например, −10%. Необязательно.',
          },
        },
      ],
    },
    {
      name: 'products',
      type: 'array',
      label: 'Вкладки продуктов',
      maxRows: 8,
      admin: {
        description: 'Порядок вкладок над карточками. Вкладки без тарифов не выводятся.',
      },
      fields: [
        productSelectField(),
        {
          name: 'label',
          type: 'text',
          localized: true,
          required: true,
          label: 'Название вкладки',
        },
        {
          name: 'badge',
          type: 'select',
          label: 'Бейдж',
          defaultValue: 'none',
          options: [
            { label: 'Нет', value: 'none' },
            { label: 'AI', value: 'ai' },
          ],
        },
        {
          name: 'disabled',
          type: 'checkbox',
          label: 'Недоступна (Скоро)',
          defaultValue: false,
          admin: {
            description: 'Вкладка отображается приглушённой и не переключается.',
          },
        },
      ],
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Тарифы',
      maxRows: 24,
      admin: {
        description:
          'Карточки тарифов. Показываются на вкладке своего продукта (или на всех, если продукт не указан).',
      },
      fields: [
        {
          name: 'product',
          type: 'select',
          label: 'Продукт (вкладка)',
          options: productOptions.map((option) => ({ ...option })),
          admin: {
            description: 'Вкладка, на которой показывать карточку. Пусто — карточка на всех вкладках.',
          },
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          label: 'Название тарифа',
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          label: 'Выделить рамкой',
          defaultValue: false,
        },
        {
          name: 'variants',
          type: 'array',
          label: 'Варианты тарифа',
          minRows: 1,
          admin: {
            description:
              'Вариант = тир (например, число докладчиков) со своими ценами по периодам. Если у тарифа нет тиров — оставьте один вариант с пустым названием.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              label: 'Название варианта',
              admin: {
                description: 'Например, «10 докладчиков». Пусто — селектор в карточке не показывается.',
              },
            },
            {
              name: 'prices',
              type: 'array',
              label: 'Цены по периодам',
              minRows: 1,
              admin: {
                description: 'Цена для каждого периода из списка «Периоды оплаты».',
              },
              fields: [
                {
                  name: 'months',
                  type: 'number',
                  required: true,
                  min: 1,
                  label: 'Месяцев',
                },
                {
                  name: 'price',
                  type: 'text',
                  localized: true,
                  required: true,
                  label: 'Цена',
                  admin: {
                    description: 'Текст как на сайте: «Бесплатно», «4 837 ₽», «По запросу».',
                  },
                },
                {
                  name: 'note',
                  type: 'text',
                  localized: true,
                  label: 'Примечание',
                  admin: {
                    description: 'Например, «при оплате за 3 месяца».',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'includesProducts',
          type: 'array',
          label: 'Содержит продукты',
          admin: {
            description: 'Иконки продуктов в карточке (для тарифа с полным набором).',
          },
          fields: [productSelectField()],
        },
        {
          name: 'featureGroups',
          type: 'array',
          label: 'Группы возможностей',
          fields: [
            {
              name: 'title',
              type: 'text',
              localized: true,
              label: 'Заголовок группы',
              admin: {
                description: 'Необязательно.',
              },
            },
            {
              name: 'items',
              type: 'array',
              label: 'Пункты',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  localized: true,
                  required: true,
                  label: 'Текст',
                },
              ],
            },
          ],
        },
        {
          name: 'primaryCta',
          type: 'group',
          label: 'Основная кнопка',
          admin: {
            description: 'Цвет кнопки берётся из продукта тарифа.',
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
              name: 'href',
              type: 'text',
              required: true,
              label: 'Ссылка',
            },
          ],
        },
        {
          name: 'secondaryCta',
          type: 'group',
          label: 'Дополнительная кнопка',
          admin: {
            description: 'Необязательно. Контурная кнопка в цвете продукта.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              label: 'Текст',
            },
            {
              name: 'href',
              type: 'text',
              label: 'Ссылка',
            },
          ],
        },
      ],
    },
    {
      name: 'bundles',
      type: 'array',
      label: 'Готовые решения',
      maxRows: 8,
      admin: {
        description: 'Карусель пакетов из нескольких продуктов.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
          label: 'Заголовок',
        },
        {
          name: 'subtitle',
          type: 'text',
          localized: true,
          label: 'Подзаголовок',
        },
        {
          name: 'tone',
          type: 'select',
          label: 'Цвет фона',
          required: true,
          defaultValue: 'green',
          options: [
            { label: 'Зелёный', value: 'green' },
            { label: 'Голубой', value: 'blue' },
            { label: 'Индиго', value: 'indigo' },
          ],
          admin: {
            description: 'Фон — из пресетов. Произвольные цвета недоступны.',
          },
        },
        {
          name: 'chips',
          type: 'array',
          label: 'Продукты пакета',
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
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Иконка',
              admin: {
                description: 'Необязательно. SVG/PNG из медиатеки. Без иконки — цветная плашка продукта'
              }
            },
          ],
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Кнопка',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              label: 'Текст',
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'Ссылка',
            },
          ],
        },
      ],
    },
    {
      name: 'consultation',
      type: 'group',
      label: 'Блок консультации',
      admin: {
        description: 'Тёмная полоса с телефоном внизу страницы.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: 'Заголовок',
        },
        {
          name: 'text',
          type: 'textarea',
          localized: true,
          label: 'Текст',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
          admin: {
            description: 'Например, +7 495 648-66-73.',
          },
        },
        {
          name: 'phoneLabel',
          type: 'text',
          localized: true,
          label: 'Подпись телефона',
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Кнопка',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              label: 'Текст',
            },
            {
              name: 'href',
              type: 'text',
              label: 'Ссылка',
            },
          ],
        },
      ],
    },
  ],
}
