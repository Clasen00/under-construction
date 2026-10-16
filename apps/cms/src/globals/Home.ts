import type { GlobalConfig } from 'payload'

import { Hero } from '../blocks/Hero'

/**
 * Главная страница. Контент-менеджер собирает страницу из блоков; сейчас доступен
 * блок Hero. Порядок и состав блоков — единственное, что он может менять, —
 * сетка внутри блока остаётся за фронтендом.
 */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Главная',
  admin: {
    group: 'Структура сайта',
    description: 'Контент главной страницы.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      label: 'Блоки страницы',
      blocks: [Hero],
      admin: {
        description: 'Содержимое главной. Сейчас доступен блок Hero.',
      },
    },
  ],
}
