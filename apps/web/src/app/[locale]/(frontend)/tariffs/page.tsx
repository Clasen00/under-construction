import { resolveLocaleParam } from '@iva360/shared'

import { getTariffsPage } from '@/shared/api'
import { TariffsPage } from '@/widgets/tariffs-page'

export default async function TariffsRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params
  const locale = resolveLocaleParam(localeParam)
  const content = await getTariffsPage(locale)

  if (!content) {
    return null
  }

  return <TariffsPage content={content} locale={locale} />
}
