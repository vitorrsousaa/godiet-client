import React from 'react';

import { Button as ButtonUI } from '@godiet-ui/Button';
import { Tooltip } from '@godiet-ui/Tooltip';

interface RootProps {
  children: React.ReactNode;
}

export function Root(props: RootProps) {
  const { children } = props;
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {children}
    </div>
  );
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipContent?: string;
}

export function Button({ tooltipContent, ...props }: ButtonProps) {
  return (
    <>
      {tooltipContent ? (
        <Tooltip content={tooltipContent}>
          <ButtonUI {...props} variant={'outline'} />
        </Tooltip>
      ) : (
        <ButtonUI {...props} variant={'outline'} />
      )}
    </>
  );
}

const MenuOptions = {
  Root,
  Button,
};

export { MenuOptions };
