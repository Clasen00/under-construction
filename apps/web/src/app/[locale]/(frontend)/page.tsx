import { resolveLocaleParam } from '@iva360/shared'

import { getHome } from '@/shared/api'
import { PageBlocks } from '@/widgets/page-blocks'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = resolveLocaleParam(localeParam)
  const home = await getHome(locale)

  return <PageBlocks blocks={home?.layout ?? []} locale={locale} />
}
