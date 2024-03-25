import React from 'react';

import { FoodsByMeal } from '@godiet-pages/CreatePlanning/utils/calculateMealFoods';
import { TableCell } from '@godiet-ui/Table';

export interface RowProps {
  children: React.ReactNode;
  editable?: boolean;
  onChangeEditable?: React.ChangeEventHandler<HTMLInputElement>;
  mealFood: FoodsByMeal;
}

export function Row(props: RowProps) {
  const { children, mealFood, editable, onChangeEditable } = props;
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
          />
        ) : (
          name
        )}
      </TableCell>
      <TableCell className="hidden text-[12px] min-[430px]:table-cell">
        {qty} {measure.name}
      </TableCell>
      <TableCell className="hidden text-[12px] sm:table-cell">
        {prot} (g)
      </TableCell>
      <TableCell className="hidden text-[12px] sm:table-cell">
        {carb} (g)
      </TableCell>
      <TableCell className="hidden text-[12px] sm:table-cell">
        {fat} (g)
      </TableCell>
      <TableCell className="text-[12px]">{energy} Kcal</TableCell>
      {children}
    </>
  );
}
