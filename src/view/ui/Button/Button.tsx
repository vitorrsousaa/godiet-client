import * as React from 'react';

import { Spinner } from '@godiet-components/Spinner';
import { cn } from '@godiet-utils/cn';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { buttonVariants } from './variants';

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        {...props}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
      >
        {!isLoading && children}
        {isLoading && <Spinner className="h-6 w-6 fill-gray-800" />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
