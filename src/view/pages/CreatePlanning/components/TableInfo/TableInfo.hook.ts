import { useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { useFormContext, useWatch } from 'react-hook-form';

import { TableInfoProps } from './TableInfo';

interface FoodsByMeal {
  id: string;
  measure: { name: string; qty: number };
  qty: number;
  prot: string;
  fat: string;
  carb: string;
  energy: string;
  name: string;
}

export function useTableInfoHook(props: TableInfoProps) {
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
        (foodDatabase) => foodDatabase.id === food.id
      );

      if (!selectedFood) return;

      const { attributes, baseQty } = selectedFood;

      const proteinAttributeOriginal = attributes.find(
        (attribute) => attribute.name === 'protein'
      );
      const carbAttributeOriginal = attributes.find(
        (attribute) => attribute.name === 'carbohydrate'
      );
      const fatAttributeOriginal = attributes.find(
        (attribute) => attribute.name === 'lipid'
      );
      const energyAttributeOriginal = attributes.find(
        (attribute) => attribute.name === 'energy'
      );

      const proteinAttribute = proteinAttributeOriginal
        ? ((proteinAttributeOriginal.qty * food.measure.qty) / baseQty) *
          food.qty
        : 0;

      const carbAttribute = carbAttributeOriginal
        ? ((carbAttributeOriginal.qty * food.measure.qty) / baseQty) * food.qty
        : 0;

      const fatAttribute = fatAttributeOriginal
        ? ((fatAttributeOriginal.qty * food.measure.qty) / baseQty) * food.qty
        : 0;

      const energyAttribute = energyAttributeOriginal
        ? ((energyAttributeOriginal.qty * food.measure.qty) / baseQty) *
          food.qty
        : 0;

      initialFoodsByMeal.push({
        id: food.id,
        measure: food.measure,
        qty: food.qty,
        prot: proteinAttribute.toFixed(2),
        fat: fatAttribute.toFixed(2),
        carb: carbAttribute.toFixed(2),
        energy: energyAttribute.toFixed(2),
        name: food.name,
      });
    });

    return initialFoodsByMeal;
  }, [foods, watchMeal.mealFoods]);

  return {
    foodsByMeal,
  };
}
