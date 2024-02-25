import React from 'react';

import { TFood } from '@godiet-entities';
import { cn } from '@godiet-utils/cn';

interface OptionsProps {
  foods: TFoodDetails;
  className?: string;
}

interface TFoodDetails {
  id: string;
  categoryNameId: string;
  portion: number;
  options: TFood[];
}

export function Options(props: OptionsProps) {
  const { foods, className } = props;

  const initialOption = React.useMemo(() => foods.options[0], [foods]);

  const restOptions = React.useMemo(() => foods.options.slice(1), [foods]);
  return (
    <>
      <div className="flex flex-row justify-between gap-3">
        <div className="w-full">
          <small
            className={cn(
              'block rounded-md border-[1px] border-teal-600 bg-teal-300/5 p-2 text-center text-sm',
              className
            )}
          >
            {initialOption.name} - {initialOption.baseQty}{' '}
            {initialOption.baseUnit}
          </small>
        </div>
        <div className="flex w-full flex-col gap-2">
          {restOptions.map((option) => (
            <small
              key={option.id}
              className={cn(
                'block rounded-md border-[1px] border-teal-600 bg-teal-300/5 p-2 text-center text-sm',
                className
              )}
            >
              {option.name} - {option.baseQty} {option.baseUnit}
            </small>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
}
