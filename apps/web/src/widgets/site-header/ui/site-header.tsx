import type { AppLocale } from '@iva360/shared'

import type { HeaderContent } from '@/shared/api'

import { HeaderActions } from './header-actions'
import { HeaderLogo } from './header-logo'
import { HeaderNav } from './header-nav'
import { HeaderTopbar } from './header-topbar'

/**
 * Общая шапка сайта. Получает данные из CMS и раскладывает их по готовым
 * пресет-компонентам: сетка, отступы и состояния заданы здесь, а не в админке.
 */
export function SiteHeader({ content, locale }: { content: HeaderContent; locale: AppLocale }) {
  const topbar = content.topbar ?? null
  const nav = content.nav ?? []
  const actions = content.actions ?? []

  return (
    <header
      data-test-scope="header"
      className="fixed inset-x-0 top-0 z-50 w-full max-w-full bg-background shadow-lg shadow-secondary/10 lg:sticky lg:top-0 lg:isolate"
    >
      {topbar ? <HeaderTopbar topbar={topbar} locale={locale} /> : null}

      <div className="relative z-50">
        <div className="container flex h-16 items-center gap-2 xl:gap-4" data-test-id="header-row">
          <div className="flex min-w-0 shrink items-center justify-start lg:shrink-0">
            <HeaderLogo logo={content.logo} title={content.title} locale={locale} />
          </div>

          <HeaderNav items={nav} locale={locale} />
          <HeaderActions actions={actions} nav={nav} topbar={topbar} locale={locale} />
        </div>
      </div>
    </header>
  )
}