import * as React from 'react';

import { cn } from '@godiet-utils/cn';

import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

import { NavigationMenuViewport } from './Viewport';

const NavigationRoot = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationRoot.displayName = NavigationMenuPrimitive.Root.displayName;

export { NavigationRoot };
