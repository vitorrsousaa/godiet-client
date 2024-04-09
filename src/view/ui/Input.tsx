import * as React from 'react';

import { cn } from '@godiet-utils/cn';

import { CrossCircledIcon } from '@radix-ui/react-icons';

export interface InputProps extends React.ComponentProps<'input'> {
  name: string;
  error?: string;
  minVersion?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    type,
    id,
    name,
    placeholder,
    error,
    minVersion,
    ...inputProps
  } = props;

  const inputId = id ?? name;

  return (
    <div className="relative">
      <input
        {...inputProps}
        name={name}
        type={type}
        id={inputId}
        className={cn(
          'peer flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 pt-4 text-xs text-icon shadow-sm outline-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder-shown:pt-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50  ',
          className,
          !minVersion && 'sm:h-[3.25rem] sm:pt-5 sm:text-sm'
        )}
        ref={ref}
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className={cn(
          'peer pointer-events-none absolute left-[13px] top-0.5 text-[10px] text-muted-foreground transition-all peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-sm  ',
          !minVersion &&
            'sm:top-2 sm:peer-placeholder-shown:top-3.5 sm:peer-placeholder-shown:text-base'
        )}
      >
        {placeholder}
      </label>
      {error && (
        <div className="mt-2 flex items-center gap-1 text-red-700 ">
          <CrossCircledIcon />
          <span className="text-sx">{error}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };
