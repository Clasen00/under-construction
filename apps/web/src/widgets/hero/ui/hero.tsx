/* eslint-disable @next/next/no-img-element -- иконки продуктов приходят из CMS (SVG), next/image их не оптимизирует */

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import { CmsMedia, resolveMediaUrl } from '@/entities/cms-media'
import type { HomeContent } from '@/shared/api'
import { getCmsPublicUrl } from '@/shared/lib/cms-url'
import { productTheme, type ProductKey } from '@/shared/lib/product-theme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'

export type HeroBlock = Extract<NonNullable<HomeContent['layout']>[number], { blockType: 'hero' }>

function resolveMediaAlt(media: unknown, fallback?: string | null): string {
  if (typeof media === 'object' && media && 'alt' in media) {
    const alt = (media as { alt?: string | null }).alt
    if (alt) {
      return alt
    }
  }

  return fallback ?? ''
}

/**
 * Установленный UI Kit содержит размеры Button до `lg` (h-10), а прод-CTA Hero —
 * `2xl` (h-14, text-lg). Добираем размер классами здесь: самостоятельно цвет/стиль
 * не трогаем, только габариты под эталон.
 */
const heroCtaClassName = 'h-14 px-6 text-lg has-[>svg]:px-6 w-full sm:w-auto'

/**
 * Hero главной. Сетка, кегль заголовка и размеры кнопок заданы здесь;
 * из CMS приходят только тексты, картинка, ссылки и продукт для цвета плашек.
 */
export function Hero({ block, locale }: { block: HeroBlock; locale: AppLocale }) {
  const textFirst = (block.mediaSide ?? 'right') === 'right'
  const pills = block.productPills ?? []
  const ctas = block.ctas ?? []
  const cmsBaseUrl = getCmsPublicUrl()

  return (
    <section className="bg-background">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div
            className={cn(
              '@container order-2 flex w-full flex-col items-start',
              textFirst ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            <div className="flex w-full flex-col gap-2 sm:gap-3">
              <h1 className="max-w-full min-w-0 text-fluid-h1-hero font-bold whitespace-pre-line text-foreground">
                {block.heading}
              </h1>
            </div>

            {block.description ? (
              <p className="mt-4 max-w-2xl whitespace-pre-line text-fluid-body text-muted-foreground">
                {block.description}
              </p>
            ) : null}

            {pills.length > 0 ? (
              <div className="mt-6 flex w-full flex-wrap gap-2.5 sm:mt-8">
                {pills.map((pill) => {
                  const iconSrc = resolveMediaUrl(pill.icon, cmsBaseUrl)

                  return (
                    <a
                      key={pill.id ?? pill.label}
                      className={cn(
                        'inline-flex h-9 items-center gap-2.5 rounded-full px-3 text-sm leading-none font-semibold transition-opacity hover:opacity-90',
                        productTheme[pill.product as ProductKey].soft,
                      )}
                      href={localizeAppHref(pill.href, locale)}
                    >
                      {iconSrc ? (
                        <img
                          src={iconSrc}
                          alt=""
                          width={24}
                          height={24}
                          className="size-6 shrink-0 object-contain"
                        />
                      ) : null}
                      <span>{pill.label}</span>
                    </a>
                  )
                })}
              </div>
            ) : null}

            {ctas.length > 0 ? (
              <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                {ctas.map((cta) => (
                  <Button
                    key={cta.id ?? cta.label}
                    variant={cta.variant}
                    size="lg"
                    className={heroCtaClassName}
                    render={
                      <a
                        href={localizeAppHref(cta.href, locale)}
                        {...(cta.openInNewTab
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      />
                    }
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              'relative w-full min-w-0',
              textFirst ? 'order-1 lg:order-2' : 'order-1 lg:order-1',
            )}
          >
            <CmsMedia
              media={block.image}
              cmsBaseUrl={cmsBaseUrl}
              alt={resolveMediaAlt(block.image, block.imageAlt)}
              priority
              className="h-auto w-full max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
