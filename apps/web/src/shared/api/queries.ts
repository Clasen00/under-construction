import type { Config } from '@iva360/shared'
import type { AppLocale } from '@iva360/shared/i18n'

import { payloadFetch } from './payload'

export type HeaderContent = Config['globals']['header']
export type HomeContent = Config['globals']['home']
export type TariffsPageContent = Config['globals']['tariffs-page']

export function getHeader(locale: AppLocale): Promise<HeaderContent | null> {
  return payloadFetch<HeaderContent>('/api/globals/header', { locale })
}

export function getHome(locale: AppLocale): Promise<HomeContent | null> {
  return payloadFetch<HomeContent>('/api/globals/home', { locale })
}

export function getTariffsPage(locale: AppLocale): Promise<TariffsPageContent | null> {
  return payloadFetch<TariffsPageContent>('/api/globals/tariffs-page', { locale })
}
