import { HugeiconsIcon } from '@hugeicons/react'
import { Call02Icon } from '@hugeicons/core-free-icons'

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import type { TariffsPageContent } from '@/shared/api'
import { Button } from '@/shared/ui/button'

type TariffConsultation = NonNullable<TariffsPageContent['consultation']>

/** Тёмная полоса внизу страницы тарифов: телефон и CTA. */
export function TariffConsultation({
  consultation,
  locale,
}: {
  consultation: TariffConsultation
  locale: AppLocale
}) {
  const hasContent = Boolean(consultation.title || consultation.text || consultation.phone)

  if (!hasContent) {
    return null
  }

  return (
    <div className="container">
      <div
        className="overflow-hidden rounded-xl p-4 text-white md:p-8 xl:p-10"
        style={{ backgroundImage: 'linear-gradient(111deg, #292834 2%, #525382 41%, #23232A 97%)' }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            {consultation.title ? (
              <h3 className="font-heading text-2xl leading-tight font-normal text-white">
                {consultation.title}
              </h3>
            ) : null}
            {consultation.text ? (
              <p className="text-base leading-relaxed text-white">{consultation.text}</p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 md:items-end md:gap-6">
            {consultation.phone ? (
              <a
                className="inline-flex items-center gap-2 text-xl font-bold whitespace-nowrap text-white"
                href={`tel:${consultation.phone.replace(/[^+\d]/g, '')}`}
              >
                <HugeiconsIcon icon={Call02Icon} strokeWidth={2} className="size-5 shrink-0" />
                <span>{consultation.phoneLabel ?? consultation.phone}</span>
              </a>
            ) : null}

            {consultation.cta?.label && consultation.cta.href ? (
              <Button
                variant="white"
                size="lg"
                className="min-h-12 border-transparent whitespace-nowrap"
                render={<a href={localizeAppHref(consultation.cta.href, locale)} />}
              >
                {consultation.cta.label}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
