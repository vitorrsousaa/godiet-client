import React from 'react';

import { cn } from '@godiet-utils/cn';

interface SectionProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  classContainer?: string;
  danger?: boolean;
}

export function Section(props: SectionProps) {
  const { description, title, children, className, classContainer, danger } =
    props;
  return (
    <div
      className={cn(
        'flex w-full flex-col justify-between sm:flex-row',
        classContainer
      )}
    >
      <div className={cn('mb-6 sm:mb-0 sm:w-72', className)}>
        <h2 className={cn('text-sm font-medium', danger && 'text-red-600')}>
          {title}
        </h2>
        <small className="font-medium text-gray-500">{description}</small>
      </div>
      {children && children}
    </div>
  );
}
