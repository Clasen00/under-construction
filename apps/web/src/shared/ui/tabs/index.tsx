'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/lib/utils'

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'group/tabs flex gap-2 data-[orientation=horizontal]:flex-col',
        className,
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  'group/tabs-list inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none data-[variant=chip]:rounded-none',
  {
    variants: {
      variant: {
        default: 'bg-accent',
        line: 'gap-1 bg-transparent',
        /** Компания/Сайт как trial-activation на сайте: чип + primary-чёрточка. */
        chip: 'h-9 gap-2 bg-transparent p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function TabsList({
  className,
  variant = 'default',
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex h-full min-h-0 items-center justify-center gap-1.5 rounded-md border border-transparent px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all outline-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:flex-1 group-data-[variant=line]/tabs-list:flex-none group-data-[variant=chip]/tabs-list:h-9 group-data-[variant=chip]/tabs-list:flex-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        'group-data-[variant=default]/tabs-list:data-active:bg-background group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm',
        'group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:text-foreground',
        'group-data-[variant=chip]/tabs-list:bg-transparent group-data-[variant=chip]/tabs-list:hover:text-foreground group-data-[variant=chip]/tabs-list:data-active:bg-border group-data-[variant=chip]/tabs-list:data-active:text-foreground group-data-[variant=chip]/tabs-list:data-active:shadow-none',
        "after:absolute after:content-[''] after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:after:bottom-[-5px] group-data-[variant=line]/tabs-list:after:bg-primary group-data-[variant=line]/tabs-list:data-active:after:opacity-100 group-data-[variant=chip]/tabs-list:after:-bottom-2 group-data-[variant=chip]/tabs-list:after:rounded-full group-data-[variant=chip]/tabs-list:after:bg-primary group-data-[variant=chip]/tabs-list:data-active:after:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn('flex-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/40', className)}
      {...props}
    />
  )
}

/** @deprecated Use TabsTrigger */
const TabsTab = TabsTrigger

/** @deprecated Use TabsContent */
const TabsPanel = TabsContent

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsTab,
  TabsPanel,
  tabsListVariants,
}
