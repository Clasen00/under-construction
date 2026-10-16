"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

import { cn } from "@/shared/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border",
        className
      )}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("not-last:border-b data-open:bg-accent/50", className)}
      {...props}
    />
  )
}

type AccordionTriggerProps = AccordionPrimitive.Trigger.Props & {
  iconVariant?: "chevron" | "plus"
}

function AccordionTrigger({
  className,
  children,
  iconVariant = "chevron",
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent p-4 text-left text-sm font-medium transition-all outline-none hover:underline aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4",
          className
        )}
        {...props}
      >
        {children}
        {iconVariant === "plus" ? (
          <HugeiconsIcon
            icon={PlusSignIcon}
            strokeWidth={2}
            data-slot="accordion-trigger-icon"
            className="pointer-events-none size-4 shrink-0 rotate-0 text-muted-foreground transition-[transform,color] duration-300 ease-in-out group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:text-primary group-data-panel-open/accordion-trigger:rotate-45 group-data-panel-open/accordion-trigger:text-primary"
          />
        ) : (
          <>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              strokeWidth={2}
              data-slot="accordion-trigger-icon"
              className="pointer-events-none size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:hidden"
            />
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              strokeWidth={2}
              data-slot="accordion-trigger-icon"
              className="pointer-events-none hidden size-4 shrink-0 text-muted-foreground group-aria-expanded/accordion-trigger:inline"
            />
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) px-4 pt-0 pb-4 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
