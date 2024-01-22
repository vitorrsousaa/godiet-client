import * as React from 'react';

import { cn } from '@godiet-utils/cn';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));

AvatarRoot.displayName = AvatarPrimitive.Root.displayName;

export { AvatarRoot };
