import { AppProviders } from '../app-providers'

import { resolveLocaleParam } from '@iva360/shared'
import { getHeader } from '@/shared/api'
import { SiteHeader } from '@/widgets/site-header'

export function generateStaticParams() {
  return [{ locale: 'ru' }, { locale: 'en' }]
}

export default async function FrontendLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = resolveLocaleParam(localeParam)
  const header = await getHeader(locale)

  return (
    <AppProviders>
      {header ? <SiteHeader content={header} locale={locale} /> : null}

      {/* Спейсер под фиксированную шапку на мобилке; на десктопе шапка sticky. */}
      <div className="shrink-0 lg:hidden" style={{ height: 64 }} aria-hidden="true" />

      <main className="min-w-0 flex-1 overflow-x-clip">
        <div className="flex flex-col gap-[var(--block-gap-mobile)] md:gap-[var(--block-gap-tablet)] lg:gap-[var(--block-gap-desktop)] pb-[var(--page-content-py-mobile)] md:pb-[var(--page-content-py-tablet)] lg:pb-[var(--page-content-py-desktop)] lg:pt-[var(--page-content-py-desktop)]">
          {children}
        </div>
      </main>
    </AppProviders>
  )
}