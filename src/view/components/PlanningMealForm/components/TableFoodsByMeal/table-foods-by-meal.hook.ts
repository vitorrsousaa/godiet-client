import React from 'react';

import {
  TCreateMealFoodDTO,
  TCreatePlanningMealDTO,
} from '@godiet-components/PlanningMealForm';
import { useGetAllFoods } from '@godiet-hooks/foods';
import { calculateMealFoods, FoodsByMeal } from '@godiet-utils/foods';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { TableFoodsByMealProps } from './table-foods-by-meal';

type GetNewMealFoodsFn = (
  oldMealFoods: TCreateMealFoodDTO[]
) => TCreateMealFoodDTO[];

export function useTableFoodsByMealHook(props: TableFoodsByMealProps) {
  const { mealIndex } = props;

  const { foods } = useGetAllFoods();

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  const { update } = useFieldArray({
    control,
    name: 'meals',
  });

  const handleUpdateMealFoods = React.useCallback(
    (getNewMealFoods: GetNewMealFoodsFn) => {
      const newMealFoods = getNewMealFoods(watchMeal.mealFoods);

      update(mealIndex, { ...watchMeal, mealFoods: newMealFoods });
    },
    [mealIndex, update, watchMeal]
  );

  const foodsByMeal = React.useMemo<FoodsByMeal[]>(() => {
    const initialFoodsByMeal: FoodsByMeal[] = [];
    watchMeal.mealFoods.forEach((food) => {
      const selectedFood = foods.find(
        (foodDatabase) => foodDatabase.id === food.foodId
      );

      if (!selectedFood) return;

      const mealFoodCalculated = calculateMealFoods({
        food: {
          ...selectedFood,
          name: food.name,
        },
        measure: food.measure,
        qty: food.qty,
      });

      initialFoodsByMeal.push(mealFoodCalculated);
    });

    return initialFoodsByMeal;
  }, [foods, watchMeal.mealFoods]);

  return {
    foodsByMeal,
    handleUpdateMealFoods,
  };
}
