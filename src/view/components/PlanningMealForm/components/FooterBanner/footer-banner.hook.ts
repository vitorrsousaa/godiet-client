import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { useGetAllFoods } from '@godiet-hooks/foods';
import { calculateMealFoods } from '@godiet-utils/foods';

import { useFormContext, useWatch } from 'react-hook-form';

export function useFooterBannerHook() {
  const { foods } = useGetAllFoods();

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMeals = useWatch({
    control,
    name: 'meals',
  });

  const total = React.useMemo(() => {
    const allMealFoods = watchMeals.map((meal) => meal.mealFoods).flat();

    const totalMealFoods = allMealFoods.map((mealFood) => {
      const selectedFood = foods.find((food) => food.id === mealFood.foodId);

      if (!selectedFood) return;

      const response = calculateMealFoods({
        food: selectedFood,
        measure: mealFood.measure,
        qty: mealFood.qty,
      });

      return response;
    });

    const totalReduced = totalMealFoods.reduce(
      (acc, curr) => {
        if (!curr) return acc;

        return {
          prot: acc.prot + parseFloat(curr.prot),
          carb: acc.carb + parseFloat(curr.carb),
          fat: acc.fat + parseFloat(curr.fat),
          energy: acc.energy + parseFloat(curr.energy),
        };
      },
      { prot: 0, carb: 0, fat: 0, energy: 0 }
    );

    return {
      prot: totalReduced.prot.toFixed(2),
      carb: totalReduced.carb.toFixed(2),
      fat: totalReduced.fat.toFixed(2),
      energy: totalReduced.energy.toFixed(2),
    };
  }, [foods, watchMeals]);

  return {
    total,
  };
}
