'use client'

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import { ChevronDown } from '@/shared/lib/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import type { NavItem } from '../lib/header-view'
import { itemKey } from '../lib/header-view'

/**
 * Основная навигация (десктоп). Пункты с подпунктами рендерятся Base UI Menu:
 * открытие по клику, правильная ARIA и фокус — из UI Kit, а не самодельный hover.
 */
export function HeaderNav({ items, locale }: { items: NavItem[]; locale: AppLocale }) {
  return (
    <nav
      aria-label="Основная навигация"
      className="hidden min-w-0 flex-1 overflow-hidden lg:flex"
      data-test-id="header-nav"
    >
      <ul className="mx-auto flex shrink-0 items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-8">
        {items.map((item) => {
          const children = item.children ?? []

          if (item.type === 'dropdown' && children.length > 0) {
            return (
              <li key={itemKey(item, item.label)}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center gap-1.5 text-base font-medium tracking-wide text-foreground transition-colors hover:text-primary xl:text-lg">
                    {item.label}
                    <ChevronDown className="size-4 opacity-70" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="min-w-56">
                    {children.map((child) => (
                      <DropdownMenuItem
                        key={itemKey(child, child.label)}
                        render={
                          <a
                            href={localizeAppHref(child.href, locale)}
                            {...(child.openInNewTab
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          />
                        }
                      >
                        {child.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )
          }

          return (
            <li key={itemKey(item, item.label)}>
              <a
                className="inline-flex items-center text-base font-medium tracking-wide text-foreground transition-colors hover:text-primary xl:text-lg"
                href={localizeAppHref(item.href ?? '#', locale)}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}