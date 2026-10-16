import type { Metadata, Viewport } from 'next'
import { headers } from 'next/headers'

import { defaultLocale, resolveLocaleParam } from '@iva360/shared/i18n'

import { inter, guarujaNeue } from '@/shared/lib/fonts'
import { LOCALE_HEADER } from '@/shared/lib/i18n/constants'
import { cn } from '@/shared/lib/utils'

import './assets/css/globals.css'

export const metadata: Metadata = {
  applicationName: 'Demo',
  description: 'Demo',
  title: 'Demo',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f14' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const headersList = await headers()
  const locale = resolveLocaleParam(headersList.get(LOCALE_HEADER) ?? defaultLocale)

  return (
    <html lang={locale} suppressHydrationWarning className={cn(inter.variable, guarujaNeue.variable)}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  )
}
