'use client'

import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

import { cn } from '@/shared/lib/utils'

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

function PopoverContent({
  className,
  align = 'center',
  side = 'bottom',
  sideOffset = 6,
  collisionPadding,
  collisionAvoidance,
  anchor,
  positionerClassName,
  children,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'side' | 'sideOffset' | 'collisionPadding' | 'collisionAvoidance' | 'anchor'
  > & {
    positionerClassName?: string
  }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        className={cn('isolate outline-none', positionerClassName ?? 'z-[200]')}
        align={align}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        collisionAvoidance={collisionAvoidance}
        anchor={anchor}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            'w-72 origin-(--transform-origin) rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-none duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            className,
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverClose, PopoverContent }
