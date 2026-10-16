import localFont from 'next/font/local'

/**
 * Шрифты сайта (self-hosted, как на проде): тело — Inter, заголовки — Guaruja Neue.
 * `next/font/local` отдаёт переменные `--font-inter` / `--font-guaruja-neue`,
 * которые маппятся на токены Tailwind в `globals.css`.
 *
 * Для Guaruja Neue заданы `*override`, как на проде: нормализуют вертикальные
 * метрики дисплейного шрифта, чтобы line-height и базовая линия совпадали.
 */
export const inter = localFont({
  src: [
    { path: '../assets/fonts/inter/Inter-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../assets/fonts/inter/Inter-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/inter/Inter-SemiBold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const guarujaNeue = localFont({
  src: [
    { path: '../assets/fonts/guaruja-neue/GuarujaNeue-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../assets/fonts/guaruja-neue/GuarujaNeue-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-guaruja-neue',
  display: 'swap',
  preload: true,
  declarations: [
    { prop: 'ascent-override', value: '82%' },
    { prop: 'descent-override', value: '18%' },
    { prop: 'line-gap-override', value: '0%' },
  ],
})
