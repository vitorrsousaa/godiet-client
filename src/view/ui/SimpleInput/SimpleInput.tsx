import * as React from 'react';

import { cn } from '@godiet-utils/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SimpleInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 sm:h-[3.25rem]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
SimpleInput.displayName = 'SimpleInput';

export { SimpleInput };
