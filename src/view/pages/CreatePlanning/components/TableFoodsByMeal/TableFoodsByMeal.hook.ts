import { useCallback, useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';
import {
  CreateMealFoodSchema,
  TCreatePlanningMealDTO,
} from '@godiet-pages/CreatePlanning/CreatePlanning.hook';
import {
  calculateMealFoods,
  FoodsByMeal,
} from '@godiet-pages/CreatePlanning/utils/calculateMealFoods';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import * as z from 'zod';

import { TableFoodsByMealProps } from './TableFoodsByMeal';

type TCreateMealFood = z.infer<typeof CreateMealFoodSchema>;

type GetNewMealFoodsFunction = (
  oldMealFoods: TCreateMealFood[]
) => TCreateMealFood[];

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

  const handleUpdateMealFoods = useCallback(
    (getNewMealFoods: GetNewMealFoodsFunction) => {
      const newMealFoods = getNewMealFoods(watchMeal.mealFoods);

      update(mealIndex, { ...watchMeal, mealFoods: newMealFoods });
    },
    [mealIndex, update, watchMeal]
  );

  const foodsByMeal = useMemo<FoodsByMeal[]>(() => {
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
