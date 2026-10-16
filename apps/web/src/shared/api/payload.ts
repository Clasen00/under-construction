import { buildPayloadLocaleQuery, type AppLocale } from '@iva360/shared/i18n'

import { getCmsInternalUrl } from '@/shared/lib/cms-url'

export class PayloadRequestError extends Error {
  readonly status: number

  constructor(status: number, path: string) {
    super(`Payload request failed: ${status} ${path}`)
    this.name = 'PayloadRequestError'
    this.status = status
  }
}

type FetchOptions = {
  locale: AppLocale
  /** Глубина разворачивания связей (upload → media). Арапы/группы глубину не считают. */
  depth?: number
  /** ISR-ревалидация Next.js. `0` — всегда свежие данные (по умолчанию), `false` — кэш навсегда. */
  revalidate?: number | false
}

type NextRequestInit = RequestInit & { next?: { revalidate?: number | false } }

/**
 * Запрос к REST API Payload. Ходим только с сервера по внутреннему URL CMS и
 * никогда не импортируем код из `apps/cms` — граница пакетов не пересекается.
 *
 * Отсутствующий global (ещё не заполнен в админке) отдаёт 404 → `null`,
 * чтобы страница рендерилась без контента, а не падала.
 */
export async function payloadFetch<T>(
  path: string,
  { locale, depth = 2, revalidate = 0 }: FetchOptions,
): Promise<T | null> {
  const query = buildPayloadLocaleQuery({ locale, depth })
  const url = `${getCmsInternalUrl()}${path}?${query}`

  const init: NextRequestInit = {
    headers: { Accept: 'application/json' },
    next: { revalidate },
  }

  let response: Response

  try {
    response = await fetch(url, init)
  } catch (error) {
    // CMS недоступна (dev/build без CMS, сетевой сбой) — рендерим сайт без контента,
    // а не отдаём 500. Настоящие ответы об ошибках (4xx/5xx) ниже всё ещё бросаем.
    console.error(`[payload] ${path} is unavailable`, error)
    return null
  }

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new PayloadRequestError(response.status, path)
  }

  return (await response.json()) as T
}
