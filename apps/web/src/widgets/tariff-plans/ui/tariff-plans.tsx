'use client'

import { useState } from 'react'

import type { AppLocale } from '@iva360/shared'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui/carousel'

import { productTheme, type ProductKey } from '@/shared/lib/product-theme'
import { cn } from '@/shared/lib/utils'
import type { TariffPeriod, TariffPlan, TariffProductTab } from '../lib/model'
import { TariffCard } from './tariff-card'

export type TariffPlansProps = {
  title: string
  lead?: string | null
  periods: TariffPeriod[]
  products: TariffProductTab[]
  plans: TariffPlan[]
  locale: AppLocale
}

/**
 * Секция «Подписки на продукты»: вкладки продуктов, переключатель периодов
 * и карусель карточек. Состояние (активный продукт/период) — на клиенте;
 * цвета берутся из пресетов продукта.
 */
export function TariffPlans({ title, lead, periods, products, plans, locale }: TariffPlansProps) {
  const firstEnabled = products.find((item) => !item.disabled) ?? products[0]
  const [activeProduct, setActiveProduct] = useState<ProductKey>(
    (firstEnabled?.product ?? 'meetings') as ProductKey,
  )
  const [activeMonths, setActiveMonths] = useState<number>(periods[0]?.months ?? 3)

  const visiblePlans = plans.filter((plan) => !plan.product || plan.product === activeProduct)

  return (
    <section className="container px-0 sm:px-6 lg:px-8" data-test-id="tariff-plans">
      <div className="relative overflow-hidden rounded-3xl">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(111deg,#292834_2%,#525382_40%,#23232A_97%)] sm:h-80"
        />

        <div className="relative flex flex-col items-center gap-7 px-0 pt-12 pb-8 sm:px-8">
          <h2 className="font-heading text-4xl font-medium text-white sm:text-5xl">{title}</h2>
          {lead ? <p className="max-w-2xl text-center text-base text-white/70">{lead}</p> : null}

          <div className="w-full overflow-visible pt-1">
            <div className="flex max-w-full gap-3 overflow-x-auto px-4 pt-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-2 [&::-webkit-scrollbar]:hidden">
              {products.map((tab) => {
                const product = tab.product as ProductKey
                const isActive = !tab.disabled && product === activeProduct

                return (
                  <div
                    key={tab.id ?? tab.label}
                    className={cn(
                      'relative shrink-0 rounded-full bg-white p-0.5',
                      tab.disabled && 'bg-white/60 opacity-70 saturate-75',
                    )}
                  >
                    <button
                      type="button"
                      aria-pressed={isActive}
                      disabled={tab.disabled ?? false}
                      onClick={() => setActiveProduct(product)}
                      className={cn(
                        'inline-flex items-center rounded-full border-transparent p-1 pr-4 text-base font-medium transition-colors disabled:cursor-not-allowed',
                        isActive
                          ? cn(productTheme[product].solid, 'text-white')
                          : cn('bg-white', productTheme[product].idle),
                      )}
                    >
                      <span className="mr-2 flex gap-1 rounded-full bg-slate-100 p-1">
                        <span
                          aria-hidden="true"
                          className={cn(
                            'inline-block size-4.5 shrink-0 rounded-full',
                            productTheme[product].soft,
                          )}
                        />
                      </span>
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>

                    {tab.badge === 'ai' ? (
                      <span className="pointer-events-none absolute -top-1.5 right-0.5 inline-flex items-center gap-0.5 rounded-full border border-slate-200 bg-white px-1 py-0.5 text-[10px] leading-none font-semibold text-slate-900 shadow-sm">
                        AI
                      </span>
                    ) : null}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="relative px-0 pb-2 sm:px-4">
          <div className="flex w-full flex-col items-center gap-7">
            {periods.length > 0 ? (
              <div className="inline-flex items-center gap-1 rounded-md bg-white p-1 shadow-sm">
                {periods.map((period) => {
                  const isActive = period.months === activeMonths

                  return (
                    <button
                      key={period.id ?? period.months}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveMonths(period.months)}
                      className={cn(
                        'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                        isActive ? 'bg-slate-800 text-white' : 'text-foreground hover:bg-slate-50',
                      )}
                    >
                      <span>{period.months} мес</span>
                      {period.discount ? (
                        <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-xs leading-none font-semibold text-primary">
                          {period.discount}
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            ) : null}

            { /* Карточки в адаптивной сетке */}
            <Carousel className="w-full" opts={{ align: 'start' }}>
              <CarouselContent className="-ml-5">
                {visiblePlans.map((plan) => (
                  <CarouselItem
                    key={plan.id ?? plan.title}
                    className="basis-full py-5 pl-5 md:basis-1/2 lg:basis-1/3"
                  >
                    <TariffCard
                      plan={plan}
                      months={activeMonths}
                      activeProduct={activeProduct}
                      locale={locale}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* стрелки карусели */}
              <div className="mt-4 flex justify-center gap-2">
                <CarouselPrevious className="static translate-y-0" aria-label="Предыдущий тариф" />
                <CarouselNext className="static translate-y-0" aria-label="Следующий тариф" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
