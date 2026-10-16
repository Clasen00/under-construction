import type { AppLocale } from '@iva360/shared'

import type { TariffsPageContent } from '@/shared/api'
import { TariffBundles } from '@/widgets/tariff-bundles'
import { TariffConsultation } from '@/widgets/tariff-consultation'
import { TariffPlans } from '@/widgets/tariff-plans'

/**
 * Композиция страницы тарифов: набирается из виджетов, бизнес-логики нет.
 */
export function TariffsPage({
  content,
  locale,
}: {
  content: TariffsPageContent
  locale: AppLocale
}) {
  return (
    <>
      <TariffPlans
        title={content.title}
        lead={content.lead}
        periods={content.periods ?? []}
        products={content.products ?? []}
        plans={content.plans ?? []}
        locale={locale}
      />

      <TariffBundles bundles={content.bundles ?? []} locale={locale} />

      {content.consultation ? (
        <TariffConsultation consultation={content.consultation} locale={locale} />
      ) : null}
    </>
  )
}
