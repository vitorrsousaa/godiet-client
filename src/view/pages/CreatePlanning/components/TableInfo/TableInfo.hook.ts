import { useMemo } from 'react';

import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { useFormContext, useWatch } from 'react-hook-form';

import { TableInfoProps } from './TableInfo';

interface FoodsByMeal {
  id: string;
  measure: { name: string; qty: number };
  qty: number;
  prot: number;
  fat: number;
  carb: number;
  energy: number;
  name: string;
}

export function useTableInfoHook(props: TableInfoProps) {
  const { mealIndex } = props;

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  console.log(watchMeal);

  const foodsByMeal = useMemo<FoodsByMeal[]>(() => {
    const initialFoodsByMeal: FoodsByMeal[] = [];
    watchMeal.mealFoods.forEach((food) => {
      initialFoodsByMeal.push({
        id: food.id,
        measure: food.measure,
        qty: food.qty,
        prot: 0.6 * 20,
        fat: 0.1 * 20,
        carb: 7 * 10,
        energy: 120,
        name: food.name,
      });
    });

    return initialFoodsByMeal;
  }, [watchMeal.mealFoods]);

  return {
    foodsByMeal,
  };
}
