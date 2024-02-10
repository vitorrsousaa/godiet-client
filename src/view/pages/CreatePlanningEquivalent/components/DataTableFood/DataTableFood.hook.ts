import React, { useCallback, useEffect, useMemo } from 'react';

import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanningEquivalent/CreatePlanningEquivalent.hook';

import { OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { FoodColumn } from './columns';
import { DataTableFoodProps } from './DataTableFood';

export function useDataTableFoodHook(props: DataTableFoodProps) {
  const { data, portion, mealIndex, categoryId, onSelectedFood } = props;

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { fields } = useFieldArray({
    control,
    name: `meals.${mealIndex}.foods`,
  });

  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >(() => {
    const selectedField = fields.find(
      (field) => field.categoryId === categoryId
    );

    if (selectedField) {
      const newRow = selectedField.options.reduce((acc, option) => {
        const indexData = data.findIndex((food) => food.id === option.foodId);

        return { ...acc, [indexData]: true };
      }, {});
      return newRow;
    }

    return {};
  });

  const formatedData = useMemo<FoodColumn[]>(
    () =>
      data.map((food) => {
        const baseEnergy = food.attributes
          ? food?.attributes.find((attr) => attr.name === 'energy')?.qty
          : 0;

        return {
          energy: Math.floor(baseEnergy),
          id: food.id,
          name: food.name,
          qty: parseFloat(food.baseQty.toFixed(2)),
        };
      }),

    [data]
  );

  const handleSelectedRow = useCallback<OnChangeFn<RowSelectionState>>(
    (updater) => {
      setRowSelection(updater);
    },
    []
  );

  const handleAddNewFood = useCallback(
    (rowSelection: Record<string, boolean>) => {
      const newFoodsPosition = Object.entries(rowSelection)
        .flat()
        .filter((value) => typeof value === 'string') as string[];

      const newFoods = newFoodsPosition.map(
        (position) => data[parseInt(position)]
      );

      onSelectedFood(newFoods);

      // addRowSelectionStorage({
      //   mealIndex,
      //   categoryId: data[0].categoryNameId,
      //   portion,
      //   rowSelection,
      // });
    },
    [data, mealIndex, onSelectedFood, portion]
  );

  useEffect(() => {
    const entries = Object.entries(rowSelection);

    if (entries.length > 0) {
      handleAddNewFood(rowSelection);
    }
  }, [rowSelection]);

  return {
    formatedData,
    handleSelectedRow,
    rowSelection,
  };
}
