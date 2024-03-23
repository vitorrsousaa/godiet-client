import { useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';
import {
  calculateMealFoods,
  FoodsByMeal,
} from '@godiet-pages/CreatePlanning/utils/calculateMealFoods';

import { useFormContext, useWatch } from 'react-hook-form';

import { TableFoodsByMealProps } from './TableFoodsByMeal';

export function useTableFoodsByMealHook(props: TableFoodsByMealProps) {
  const { mealIndex } = props;

  const { foods } = useGetAllFoods();

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

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
  };
}
