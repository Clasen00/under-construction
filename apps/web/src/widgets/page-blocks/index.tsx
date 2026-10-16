import type { AppLocale } from '@iva360/shared'

import type { HomeContent } from '@/shared/api'
import { Hero } from '@/widgets/hero'

/**
 * Рендер блоков страницы. Сейчас заведён только `hero`; новые блоки главной
 * добавляются здесь одним `case` — страница остаётся композицией виджетов.
 */
export function PageBlocks({
  blocks,
  locale,
}: {
  blocks: NonNullable<HomeContent['layout']>
  locale: AppLocale
}) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.blockType) {
          case 'hero':
            return <Hero key={block.id ?? 'hero'} block={block} locale={locale} />
          default:
            return null
        }
      })}
    </>
  )
}
