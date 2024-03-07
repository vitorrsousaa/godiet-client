import { useCallback, useMemo, useReducer, useState } from 'react';

import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { CreateMealProps } from './CreateMeal';

interface FoodsByMeal {
  id: string;
  measure: string;
  qty: number;
  prot: number;
  fat: number;
  carb: number;
  energy: number;
  name: string;
}

export function useCreateMealHook(props: CreateMealProps) {
  const { mealIndex } = props;

  const [modalAddFoodIsOpen, toggleModalAddFoodOpen] = useReducer(
    (state) => !state,
    false
  );
  const [modalRemoveFoodIsOpen, setModalRemoveFoodIsOpen] = useState(false);

  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number | null>(
    null
  );

  const { register, control } = useFormContext<TCreatePlanningMealDTO>();

  const { fields, remove } = useFieldArray({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  const handleOpenModalRemoveFood = useCallback((foodIndex: number) => {
    setSelectedFoodIndex(foodIndex);
    setModalRemoveFoodIsOpen(true);
  }, []);

  const handleCloseModalRemoveFood = useCallback(() => {
    setSelectedFoodIndex(null);
    setModalRemoveFoodIsOpen(false);
  }, []);

  const handleRemoveMealFood = useCallback(() => {
    if (selectedFoodIndex === null) {
      return;
    }
    remove(selectedFoodIndex);

    handleCloseModalRemoveFood();
  }, [handleCloseModalRemoveFood, remove, selectedFoodIndex]);

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
  console.log(fields);

  return {
    modalAddFoodIsOpen,
    modalRemoveFoodIsOpen,
    foodsByMeal,
    toggleModalAddFoodOpen,
    handleOpenModalRemoveFood,
    handleCloseModalRemoveFood,
    handleRemoveMealFood,
    register,
  };
}
