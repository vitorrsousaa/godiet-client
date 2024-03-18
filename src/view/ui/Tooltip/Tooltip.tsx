import * as React from 'react';

import { cn } from '@godiet-utils/cn';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipBase = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border border-muted-foreground bg-white/70 px-3 py-1.5 text-xs text-card-foreground transition-all animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-teal-800/70',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

function Tooltip(props: TooltipProps) {
  const { children, content } = props;
  return (
    <TooltipProvider>
      <TooltipBase>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  );
}

export {
  TooltipBase,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Tooltip,
};
