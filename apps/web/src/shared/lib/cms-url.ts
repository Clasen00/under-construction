export function getCmsInternalUrl(): string {
  return process.env.CMS_INTERNAL_URL ?? 'http://localhost:3333'
}

/**
 * Base URL медиа для HTML.
 *
 * - `CMS_PUBLIC_URL` задан и отличается от origin сайта → абсолютный URL к CMS;
 * - иначе → пустая строка, медиа отдаётся same-origin через rewrite `/api/*`.
 *
 * Абсолютный URL на собственный origin ломает `next/image`: оптимизатор считает
 * такой src локальным, но требует относительный путь → 400. Поэтому при совпадении
 * с origin сайта возвращаем ''.
 */
export function getCmsPublicUrl(): string {
  const cms = process.env.CMS_PUBLIC_URL?.trim().replace(/\/$/, '') ?? ''

  if (!cms) {
    return ''
  }

  const web = process.env.WEB_PUBLIC_URL?.trim().replace(/\/$/, '') ?? ''

  return web && cms === web ? '' : cms
}
