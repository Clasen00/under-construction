'use client'

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import { resolveMediaUrl } from '@/entities/cms-media'
import { getCmsPublicUrl } from '@/shared/lib/cms-url'
import type { TariffsPageContent } from '@/shared/api'
import { productTheme, type ProductKey } from '@/shared/lib/product-theme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel'

type TariffBundle = NonNullable<TariffsPageContent['bundles']>[number]

/**
 * Тон пакета — из закрытого списка пресетов (значения как в проде),
 * контент-менеджер выбирает пресет, а не произвольный цвет.
 */
const bundleToneStyle: Record<string, string> = {
  green: 'linear-gradient(to top left, #21B175, #32B9B8)',
  blue: '#00BCFF',
  indigo: '#615FED',
}

export function TariffBundles({ bundles, locale }: { bundles: TariffBundle[]; locale: AppLocale }) {
  if (bundles.length === 0) {
    return null
  }

  return (
    <section className="mx-auto w-full px-0 lg:container lg:max-w-[1536px] lg:px-8">
      <Carousel className="w-full" opts={{ align: 'start' }}>
        <CarouselContent className="-ml-0">
          {bundles.map((bundle) => (
            <CarouselItem key={bundle.id ?? bundle.title} className="basis-full pl-0">
              <div
                className="relative overflow-hidden rounded-2xl px-6 pt-6 pb-6 lg:pr-12 lg:pl-12 lg:pt-12 lg:pb-12"
                style={{ background: bundleToneStyle[bundle.tone] }}
                data-test-id="product-bundle-card"
              >
                <div className="relative z-1 flex flex-col gap-4">
                  <h2 className="text-fluid-h2 font-semibold text-background">{bundle.title}</h2>
                  {bundle.subtitle ? (
                    <p className="text-lg leading-snug font-medium text-background">
                      {bundle.subtitle}
                    </p>
                  ) : null}

                  <div className="flex flex-wrap gap-2">
                    {(bundle.chips ?? []).map((chip, index) => {
                      const iconSrc = resolveMediaUrl(chip.icon, getCmsPublicUrl())
                      const theme = productTheme[chip.product as ProductKey]

                      return (
                        <span
                          key={chip.id ?? chip.label ?? index}
                          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/90 px-2.5 text-sm font-medium text-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              'inline-block size-4 shrink-0',
                              iconSrc ? theme.text : theme.soft,
                            )}
                            style={
                              iconSrc
                                ? {
                                    backgroundColor: 'currentColor',
                                    WebkitMaskImage: `url(${iconSrc})`,
                                    maskImage: `url(${iconSrc})`,
                                    WebkitMaskRepeat: 'no-repeat',
                                    maskRepeat: 'no-repeat',
                                    WebkitMaskPosition: 'center',
                                    maskPosition: 'center',
                                    WebkitMaskSize: 'contain',
                                    maskSize: 'contain',
                                  }
                                : undefined
                            }
                          />
                          {chip.label}
                        </span>
                      )
                    })}
                  </div>

                  <div className="mt-3">
                    <Button
                      variant="white"
                      size="lg"
                      className="border-transparent"
                      render={<a href={localizeAppHref(bundle.cta.href, locale)} />}
                    >
                      {bundle.cta.label}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* стрелки карусели */}
        <div className="mt-4 flex justify-center gap-2">
          <CarouselPrevious className="static translate-y-0" aria-label="Предыдущий пакет" />
          <CarouselNext className="static translate-y-0" aria-label="Следующий пакет" />
        </div>
      </Carousel>
    </section>
  )
}
