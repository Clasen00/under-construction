import { HugeiconsIcon } from '@hugeicons/react'

import type { AppLocale } from '@iva360/shared'
import { localizeAppHref } from '@iva360/shared'

import type { Topbar, TopbarContact, TopbarLink } from '../lib/header-view'
import { headerIconMap, itemKey, resolveContactHref } from '../lib/header-view'

function TopbarContactLink({ contact }: { contact: TopbarContact }) {
  const href = resolveContactHref(contact)

  if (!href) {
    return null
  }

  return (
    <a
      className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
      href={href}
    >
      <span>{contact.label}</span>
    </a>
  )
}

function TopbarLinkItem({ link, locale }: { link: TopbarLink; locale: AppLocale }) {
  const icon = headerIconMap[link.icon ?? 'none']

  return (
    <a
      className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
      href={localizeAppHref(link.href, locale)}
      {...(link.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon ? <HugeiconsIcon icon={icon} strokeWidth={1.5} className="size-4 shrink-0 text-current" /> : null}
      <span>{link.label}</span>
    </a>
  )
}

export function HeaderTopbar({ topbar, locale }: { topbar: Topbar; locale: AppLocale }) {
  const contacts = topbar.contacts ?? []
  const links = topbar.links ?? []

  if (!topbar.enabled || (contacts.length === 0 && links.length === 0)) {
    return null
  }

  return (
    <div className="hidden border-b border-border lg:block">
      <div className="container flex h-12 items-center justify-between text-sm text-foreground">
        <div className="flex min-w-0 items-center gap-4 xl:gap-6">
          {contacts.map((contact) => (
            <TopbarContactLink key={itemKey(contact, contact.label)} contact={contact} />
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-4 xl:gap-6">
          {links.map((link) => (
            <TopbarLinkItem key={itemKey(link, link.label)} link={link} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  )
}
