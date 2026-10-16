/**
 * Пресеты продуктов IVA 360. Единственное место, где живут акцентные цвета
 * продуктов: контент-менеджер выбирает продукт (`select`), а конкретные классы
 * и токены темы берутся отсюда. Произвольные hex-цвета в CMS недоступны.
 *
 * Значения — литеральные строки, чтобы Tailwind видел их при сканировании.
 */
export type ProductKey =
  | 'meetings'
  | 'messenger'
  | 'mail'
  | 'webinars'
  | 'ai'
  | 'drive'
  | 'board'
  | 'broadcasts'

export type ProductTheme = {
  /** Мягкая плашка/чип: светлый фон + акцентный текст. */
  soft: string
  /** Заливка: активная вкладка, основная кнопка. */
  solid: string
  /** Неактивная вкладка: акцентный текст + мягкий hover. */
  idle: string
  /** Контурная кнопка в цвете продукта. */
  outline: string
  /** Рамка выделенной карточки. */
  border: string
  /** Акцентный текст-класс. */
  text: string
}

export const productTheme: Record<ProductKey, ProductTheme> = {
  meetings: {
    soft: 'bg-meetings-secondary text-meetings-primary',
    solid: 'bg-meetings-primary text-on-accent',
    idle: 'text-meetings-text hover:bg-meetings-secondary',
    outline: 'border-meetings-primary text-meetings-primary hover:bg-meetings-secondary',
    border: 'border-meetings-primary',
    text: 'text-meetings-primary',
  },
  messenger: {
    soft: 'bg-messenger-secondary text-messenger-primary',
    solid: 'bg-messenger-primary text-on-accent',
    idle: 'text-messenger-text hover:bg-messenger-secondary',
    outline: 'border-messenger-primary text-messenger-primary hover:bg-messenger-secondary',
    border: 'border-messenger-primary',
    text: 'text-messenger-primary',
  },
  mail: {
    soft: 'bg-mail-secondary text-mail-primary',
    solid: 'bg-mail-primary text-on-accent',
    idle: 'text-mail-text hover:bg-mail-secondary',
    outline: 'border-mail-primary text-mail-primary hover:bg-mail-secondary',
    border: 'border-mail-primary',
    text: 'text-mail-primary',
  },
  webinars: {
    soft: 'bg-webinars-secondary text-webinars-primary',
    solid: 'bg-webinars-primary text-on-accent',
    idle: 'text-webinars-text hover:bg-webinars-secondary',
    outline: 'border-webinars-primary text-webinars-primary hover:bg-webinars-secondary',
    border: 'border-webinars-primary',
    text: 'text-webinars-primary',
  },
  ai: {
    soft: 'bg-ai-secondary text-ai-primary',
    solid: 'bg-ai-primary text-on-accent',
    idle: 'text-ai-text hover:bg-ai-secondary',
    outline: 'border-ai-primary text-ai-primary hover:bg-ai-secondary',
    border: 'border-ai-primary',
    text: 'text-ai-primary',
  },
  drive: {
    soft: 'bg-drive-secondary text-drive-primary',
    solid: 'bg-drive-primary text-on-accent',
    idle: 'text-drive-text hover:bg-drive-secondary',
    outline: 'border-drive-primary text-drive-primary hover:bg-drive-secondary',
    border: 'border-drive-primary',
    text: 'text-drive-primary',
  },
  board: {
    soft: 'bg-board-secondary text-board-primary',
    solid: 'bg-board-primary text-on-accent',
    idle: 'text-board-text hover:bg-board-secondary',
    outline: 'border-board-primary text-board-primary hover:bg-board-secondary',
    border: 'border-board-primary',
    text: 'text-board-primary',
  },
  broadcasts: {
    soft: 'bg-broadcasts-secondary text-broadcasts-primary',
    solid: 'bg-broadcasts-primary text-on-accent',
    idle: 'text-broadcasts-text hover:bg-broadcasts-secondary',
    outline: 'border-broadcasts-primary text-broadcasts-primary hover:bg-broadcasts-secondary',
    border: 'border-broadcasts-primary',
    text: 'text-broadcasts-primary',
  },
}

/**
 * Вариант Button `*-primary` для каждого продукта. Используется, когда цвет кнопки
 * должен совпадать с продуктом (CTA тарифов) — контент-менеджер не выбирает цвет.
 */
export const productButtonPrimaryVariant = {
  meetings: 'meetings-primary',
  messenger: 'messenger-primary',
  mail: 'mail-primary',
  webinars: 'webinars-primary',
  ai: 'ai-primary',
  drive: 'drive-primary',
  board: 'board-primary',
  broadcasts: 'broadcasts-primary',
} as const satisfies Record<ProductKey, string>
