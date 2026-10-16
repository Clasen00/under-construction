'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import { Menu01Icon } from '@hugeicons/core-free-icons'

import { localizeAppHref, type AppLocale } from '@iva360/shared'

import { Button } from '@/shared/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet'

import type { HeaderAction, NavItem, Topbar } from '../lib/header-view'
import { itemKey, resolveContactHref, selectActions } from '../lib/header-view'

/**
 * Мобильное меню: бургер открывает side-панель (Sheet из UI Kit),
 * подпункты — Accordion, кнопки входа и контакты — внизу.
 */
export function MobileMenu({
  nav,
  actions,
  topbar,
  locale,
}: {
  nav: NavItem[]
  actions: HeaderAction[]
  topbar: Topbar | null
  locale: AppLocale
}) {
  const contacts = topbar?.contacts ?? []

  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="outline" size="icon" className="lg:hidden" aria-label="Открыть контакты и меню" />}
      >
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={1.5} className="size-5 shrink-0" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[min(20rem,85vw)] gap-0 p-0">
        <SheetHeader className="border-b p-4 text-left">
          <SheetTitle>Меню</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <nav aria-label="Меню" className="flex flex-col">
            {nav.map((item) => {
              const children = item.children ?? []

              if (item.type === 'dropdown' && children.length > 0) {
                return (
                  <Accordion key={itemKey(item, item.label)} className="rounded-none border-0">
                    <AccordionItem value={itemKey(item, item.label)}>
                      <AccordionTrigger className="px-2 py-3 text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1 pl-2">
                          {children.map((child) => (
                            <SheetClose
                              key={itemKey(child, child.label)}
                              render={
                                <a
                                  className="block py-2 text-sm text-muted-foreground"
                                  href={localizeAppHref(child.href, locale)}
                                />
                              }
                            >
                              {child.label}
                            </SheetClose>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )
              }

              return (
                <SheetClose
                  key={itemKey(item, item.label)}
                  render={
                    <a
                      className="block px-2 py-3 text-base"
                      href={localizeAppHref(item.href ?? '#', locale)}
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              )
            })}
          </nav>

          <div className="mt-6 flex flex-col gap-2">
            {selectActions(actions, 'mobile').map((action) => (
              <Button
                key={itemKey(action, action.label)}
                variant={action.variant}
                size="lg"
                className="w-full"
                render={
                  <a
                    href={localizeAppHref(action.href, locale)}
                    {...(action.openInNewTab
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  />
                }
              >
                {action.label}
              </Button>
            ))}
          </div>

          {contacts.length > 0 ? (
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              {contacts.map((contact) => {
                const href = resolveContactHref(contact)

                return href ? (
                  <SheetClose key={itemKey(contact, contact.label)} render={<a href={href} />}>
                    {contact.label}
                  </SheetClose>
                ) : null
              })}
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}