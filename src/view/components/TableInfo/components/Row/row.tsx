import React from 'react';

import { TableCell } from '@godiet-ui/Table';
import { FoodsByMeal } from '@godiet-utils/foods';

export type TParamsDisableColumns = 'prot' | 'carb' | 'fat' | 'energy';
export interface RowProps {
  children: React.ReactNode;
  editable?: boolean;
  onChangeEditable?: React.ChangeEventHandler<HTMLInputElement>;
  mealFood: FoodsByMeal;
  /**
   *
   * @param disableColumns The columns to disable.
   */
  disableColumns?: TParamsDisableColumns[];
  isLoading?: boolean;
}

export function Row(props: RowProps) {
  const {
    children,
    mealFood,
    editable,
    disableColumns,
    isLoading,
    onChangeEditable,
  } = props;
  const { name, qty, measure, prot, carb, fat, energy } = mealFood;

  return (
    <>
      <TableCell className="text-[12px]">
        {editable ? (
          <input
            value={name}
            name={name}
            className="w-full bg-muted/40 outline-none"
            onChange={onChangeEditable}
            disabled={isLoading}
          />
        ) : (
          name
        )}
      </TableCell>
      <TableCell className="hidden text-[12px] min-[430px]:table-cell">
        {qty} {measure.name}
      </TableCell>
      {!disableColumns?.includes('prot') && (
        <TableCell className="hidden text-[12px] sm:table-cell">
          {prot} (g)
        </TableCell>
      )}
      {!disableColumns?.includes('carb') && (
        <TableCell className="hidden text-[12px] sm:table-cell">
          {carb} (g)
        </TableCell>
      )}
      {!disableColumns?.includes('fat') && (
        <TableCell className="hidden text-[12px] sm:table-cell">
          {fat} (g)
        </TableCell>
      )}
      {!disableColumns?.includes('energy') && (
        <TableCell className="text-[12px]">{energy} Kcal</TableCell>
      )}
      {children}
    </>
  );
}
