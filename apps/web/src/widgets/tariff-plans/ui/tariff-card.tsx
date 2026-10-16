'use client'

import { useState } from 'react'

import { HugeiconsIcon } from '@hugeicons/react'
import { Tick02Icon } from '@hugeicons/core-free-icons'

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import { ChevronDown } from '@/shared/lib/icons'
import {
  productButtonPrimaryVariant,
  productTheme,
  type ProductKey,
} from '@/shared/lib/product-theme'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

import type { TariffPlan } from '../lib/model'

export function TariffCard({
  plan,
  months,
  activeProduct,
  locale,
}: {
  plan: TariffPlan
  months: number
  activeProduct: ProductKey
  locale: AppLocale
}) {
  const [variantIndex, setVariantIndex] = useState(0)

  const variants = plan.variants ?? []
  const product = (plan.product ?? activeProduct) as ProductKey
  const theme = productTheme[product]
  const variant = variants[variantIndex] ?? variants[0]
  const showTier = variants.some((item) => Boolean(item.label))
  const price = variant?.prices?.find((item) => item.months === months) ?? variant?.prices?.[0] ?? null
  const includes = plan.includesProducts ?? []
  const groups = plan.featureGroups ?? []
  const { primaryCta, secondaryCta } = plan

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-[0px_4px_24px_0px_rgba(105,116,135,0.12)] md:p-6',
        // Акцентный тариф: рамка в цвете продукта и карточка выше соседних.
        // Строка тянет карточки (stretch) → повышаем и высоту, иначе одни -my-* только сдвинут карточку.
        plan.highlighted
          ? cn('border lg:-my-4 lg:h-[calc(100%_+_2rem)]', theme.border)
          : 'border border-transparent',
      )}
    >
      <h3 className="text-xl font-semibold text-foreground md:text-2xl">{plan.title}</h3>

      <div className="flex flex-col gap-6">
        {showTier ? (
          <div className="h-9 min-h-9 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger className="group box-border flex h-full min-h-9 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background py-0 pr-2.5 pl-3 text-base font-medium text-foreground tabular-nums outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring/40">
                <span className="min-w-0 truncate text-left text-base leading-9 font-medium tabular-nums">
                  {variant?.label}
                </span>
                <ChevronDown className="size-4 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {variants.map((item, index) => (
                  <DropdownMenuItem
                    key={item.id ?? item.label ?? index}
                    onClick={() => setVariantIndex(index)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}

        {price ? (
          <div>
            <p className="text-2xl font-semibold text-foreground md:text-3xl">{price.price}</p>
            {price.note ? <p className="text-sm text-secondary">{price.note}</p> : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <Button
            variant={productButtonPrimaryVariant[product]}
            size="lg"
            className="w-full"
            render={<a href={localizeAppHref(primaryCta.href, locale)} />}
          >
            {primaryCta.label}
          </Button>

          {secondaryCta?.label && secondaryCta.href ? (
            <Button
              variant="outline"
              size="lg"
              className={cn('w-full', theme.outline)}
              render={<a href={localizeAppHref(secondaryCta.href, locale)} />}
            >
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>

        <div className="flex flex-col gap-3">
          {includes.length > 0 ? (
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="grid grid-cols-10 gap-2">
                {includes.map((item, index) => (
                  <span
                    key={item.id ?? item.product ?? index}
                    aria-hidden="true"
                    className={cn(
                      'inline-block size-5 shrink-0 rounded-md',
                      productTheme[item.product as ProductKey].soft,
                    )}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {groups.map((group, groupIndex) => (
            <div
              key={group.id ?? groupIndex}
              className="flex flex-col gap-2 rounded-xl bg-slate-50 p-3 text-base"
            >
              {group.title ? (
                <div className="text-sm font-semibold text-foreground">{group.title}</div>
              ) : null}
              <div className="flex flex-col gap-2">
                {(group.items ?? []).map((item, itemIndex) => (
                  <div key={item.id ?? itemIndex} className="flex items-start gap-2">
                    <HugeiconsIcon
                      icon={Tick02Icon}
                      strokeWidth={2}
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                    <div className="text-sm leading-6 text-foreground">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
