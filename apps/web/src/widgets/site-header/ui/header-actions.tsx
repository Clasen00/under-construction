import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon } from '@hugeicons/core-free-icons'

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import { Button } from '@/shared/ui/button'

import type { HeaderAction, NavItem, Topbar } from '../lib/header-view'
import { itemKey, selectActions } from '../lib/header-view'
import { MobileMenu } from './mobile-menu'

/**
 * Десктопные кнопки в проде используют размер `lg` с адаптивной высотой
 * (h-9 → xl:h-10). Установленный UI Kit даёт фиксированный `lg` (h-10), поэтому
 * выравниваем метрики классами — стиль и вариант остаются китовыми.
 */
const desktopActionClassName = 'h-9 px-3 text-sm xl:h-10 xl:px-4 xl:text-base'

function ActionButton({
  action,
  size,
  className,
  locale,
}: {
  action: HeaderAction
  size: 'lg' | 'default'
  className?: string
  locale: AppLocale
}) {
  return (
    <Button
      variant={action.variant}
      size={size}
      className={className}
      render={
        <a
          href={localizeAppHref(action.href, locale)}
          {...(action.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        />
      }
    >
      {action.label}
    </Button>
  )
}

export function HeaderActions({
  actions,
  nav,
  topbar,
  locale,
}: {
  actions: HeaderAction[]
  nav: NavItem[]
  topbar: Topbar | null
  locale: AppLocale
}) {
  const desktopActions = selectActions(actions, 'desktop')
  const mobileActions = selectActions(actions, 'mobile')

  return (
    <div
      className="ml-auto flex shrink-0 items-center justify-end gap-1.5 sm:gap-2"
      data-test-id="header-actions"
    >
      {/* Desktop */}
      <div className="hidden items-center gap-1.5 xl:gap-2 lg:flex" data-test-scope="header-custom-actions">
        {desktopActions.map((action) => (
          <ActionButton
            key={itemKey(action, action.label)}
            action={action}
            size="lg"
            className={desktopActionClassName}
            locale={locale}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2 lg:hidden">
        <Button variant="outline" size="icon" aria-label="Поиск">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={1.5} className="size-5 shrink-0 text-current" />
        </Button>

        <div className="flex items-center gap-1.5 xl:gap-2" data-test-scope="header-custom-actions">
          {mobileActions.map((action) => (
            <ActionButton
              key={itemKey(action, action.label)}
              action={action}
              size="default"
              locale={locale}
            />
          ))}
        </div>

        <MobileMenu nav={nav} actions={actions} topbar={topbar} locale={locale} />
      </div>
    </div>
  )
}
