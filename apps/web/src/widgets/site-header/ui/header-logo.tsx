import Image from 'next/image'

import type { HeaderContent } from '@/shared/api'
import type { AppLocale } from '@iva360/shared'
import { resolveMediaUrl } from '@/entities/cms-media'
import { getCmsPublicUrl } from '@/shared/lib/cms-url'
import { getHomePath } from '@/shared/lib/i18n/get-home-path'

export function HeaderLogo({
  logo,
  title,
  locale,
}: {
  logo: HeaderContent['logo']
  title?: string | null
  locale: AppLocale
}) {
  const src = resolveMediaUrl(logo, getCmsPublicUrl())

  if (!src) {
    return null
  }

  return (
    <a
      className="inline-flex max-w-[min(100%,8.5rem)] items-center sm:max-w-none"
      href={getHomePath(locale)}
      aria-label={title ?? 'IVA360'}
    >
      {/* Логотип — SVG из CMS/MinIO: next/image не оптимизирует SVG, поэтому unoptimized. */}
      <Image
        src={src}
        alt={title ?? ''}
        width={99}
        height={36}
        unoptimized
        priority
        className="h-9 w-fit"
      />
    </a>
  )
}
