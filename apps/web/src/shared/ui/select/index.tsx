'use client'

import * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui/react/select'

import { cn } from '@/shared/lib/utils'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, Tick02Icon } from '@hugeicons/core-free-icons'

type SelectItemLabel = { label: React.ReactNode; value: unknown }

function collectSelectItemLabels(node: React.ReactNode): SelectItemLabel[] {
  const items: SelectItemLabel[] = []

  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return

    if (child.type === SelectItem) {
      const itemProps = child.props as SelectPrimitive.Item.Props
      items.push({ value: itemProps.value, label: itemProps.children })
      return
    }

    const nested = (child.props as { children?: React.ReactNode }).children
    if (nested != null) {
      items.push(...collectSelectItemLabels(nested))
    }
  })

  return items
}

function Select<Value, Multiple extends boolean | undefined = false>({
  children,
  items,
  ...props
}: SelectPrimitive.Root.Props<Value, Multiple>) {
  const collected = collectSelectItemLabels(children)
  const resolvedItems =
    items ??
    (collected.length > 0
      ? (collected as SelectPrimitive.Root.Props<Value, Multiple>['items'])
      : undefined)

  return (
    <SelectPrimitive.Root data-slot="select" {...props} items={resolvedItems}>
      {children}
    </SelectPrimitive.Root>
  )
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn('scroll-my-1 p-1', className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn('line-clamp-1 flex min-w-0 flex-1 text-left', className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        'flex w-fit max-w-full appearance-none cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-transparent bg-accent px-3 py-2 text-base font-medium whitespace-nowrap text-foreground outline-none transition-colors select-none hover:bg-accent/80 focus-visible:ring-2 focus-visible:ring-ring/40 md:text-sm data-disabled:pointer-events-none data-disabled:opacity-60 data-[size=default]:h-10 data-[size=sm]:h-8 data-placeholder:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={16}
            strokeWidth={2}
            className="size-4 shrink-0 text-muted-foreground opacity-60 transition-transform duration-150 data-popup-open:rotate-180"
          />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 6,
  align = 'start',
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    'side' | 'sideOffset' | 'align' | 'alignItemWithTrigger'
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="isolate z-[200] outline-none"
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            'z-[200] max-h-(--available-height) w-max min-w-(--anchor-width) origin-(--transform-origin) overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  label,
  ...props
}: SelectPrimitive.Item.Props) {
  const resolvedLabel = label ?? (typeof children === 'string' ? children : undefined)

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'flex cursor-pointer items-center justify-between gap-3 rounded-md py-2 pr-3 pl-3 text-sm outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      label={resolvedLabel}
      {...props}
    >
      <SelectPrimitive.ItemText className="min-w-0 flex-1">{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="flex shrink-0 items-center text-primary">
        <HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={2} className="size-4 shrink-0" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
}
