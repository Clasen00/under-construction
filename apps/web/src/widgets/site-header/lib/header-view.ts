import {
  Book01Icon,
  Call02Icon,
  HeadsetIcon,
  Mail01Icon,
  Search01Icon,
} from '@hugeicons/core-free-icons'
import type { IconSvgElement } from '@hugeicons/react'

import type { HeaderContent } from '@/shared/api'

export type TopbarContact = NonNullable<NonNullable<HeaderContent['topbar']>['contacts']>[number]
export type TopbarLink = NonNullable<NonNullable<HeaderContent['topbar']>['links']>[number]
export type NavItem = NonNullable<HeaderContent['nav']>[number]
export type NavChild = NonNullable<NavItem['children']>[number]
export type HeaderAction = NonNullable<HeaderContent['actions']>[number]
export type Topbar = NonNullable<HeaderContent['topbar']>

/** Иконки топбара: значение select из CMS → иконка Hugeicons. */
export const headerIconMap: Partial<Record<string, IconSvgElement>> = {
  phone: Call02Icon,
  mail: Mail01Icon,
  search: Search01Icon,
  support: HeadsetIcon,
  book: Book01Icon,
}

/** Телефон/e-mail превращаем в tel:/mailto:, обычную ссылку отдаём как есть. */
export function resolveContactHref(contact: TopbarContact): string | null {
  if (contact.type === 'phone') {
    return contact.phone ? `tel:${contact.phone.replace(/[^+\d]/g, '')}` : null
  }

  if (contact.type === 'email') {
    return contact.email ? `mailto:${contact.email}` : null
  }

  return contact.href ?? null
}

/** Кнопки, видимые на конкретном брейкпоинте. */
export function selectActions(
  actions: HeaderAction[],
  visibility: 'desktop' | 'mobile',
): HeaderAction[] {
  return actions.filter(
    (action) => action.visibility === 'both' || action.visibility === visibility,
  )
}

/** Стабильный ключ для элементов CMS-массивов. */
export function itemKey(item: { id?: string | null }, fallback: string): string {
  return item.id ?? fallback
}
