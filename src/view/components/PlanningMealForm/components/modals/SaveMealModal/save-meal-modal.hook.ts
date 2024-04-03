import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { useCreateFavoriteMeal } from '@godiet-hooks/favoriteMeal';
import { useGetAllFoods } from '@godiet-hooks/foods';
import { calculateMealFoods, FoodsByMeal } from '@godiet-utils/foods';

import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { SaveMealModalProps } from './save-meal-modal';

const FavoriteMealSchema = z.object({
  name: z.string(),
});

export function useSaveMealModalHook(props: SaveMealModalProps) {
  const { mealIndex, onClose } = props;

  const { createFavoriteMeal, isCreatingFavoriteMeal } =
    useCreateFavoriteMeal();

  const { foods } = useGetAllFoods();

  const [nameOfFavoriteMeal, setNameOfFavoriteMeal] = React.useState('');

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMealFoods = useWatch({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const [tableFoods, setTableFoods] = React.useState(watchMealFoods || []);

  const handleChangeNameOfFavoriteMeal = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const validatedName = FavoriteMealSchema.safeParse({
        name: event.target.value,
      });

      validatedName.success && setNameOfFavoriteMeal(validatedName.data.name);
    },
    []
  );

  const handleCloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmit = React.useCallback(async () => {
    const newMealFoods = tableFoods.map((mealFood) => ({
      foodId: mealFood.foodId,
      measure: mealFood.measure,
      options: [],
      qty: mealFood.qty,
      name: mealFood.name,
    }));

    const newData = {
      name: nameOfFavoriteMeal,
      mealFoods: newMealFoods,
    };

    try {
      await createFavoriteMeal({
        name: newData.name,
        mealFoods: newData.mealFoods,
      });

      toast.success('Refeição favoritada com sucesso!');
    } catch {
      toast.error('Tivemos um erro ao favoritar');
    } finally {
      handleCloseModal();
    }
  }, [createFavoriteMeal, handleCloseModal, nameOfFavoriteMeal, tableFoods]);

  const mealFoods = React.useMemo<FoodsByMeal[]>(() => {
    const initialFoodsByMeal: FoodsByMeal[] = [];

    tableFoods.forEach((food) => {
      const selectedFood = foods.find(
        (foodDatabase) => foodDatabase.id === food.foodId
      );

      if (!selectedFood) return;

      const mealFoodCalculated = calculateMealFoods({
        food: { ...selectedFood, name: food.name },
        measure: food.measure,
        qty: food.qty,
      });

      initialFoodsByMeal.push(mealFoodCalculated);
    });

    return initialFoodsByMeal;
  }, [foods, tableFoods]);

  const isValid = React.useMemo(
    () => Boolean(watchMealFoods?.length > 0 && nameOfFavoriteMeal.length > 0),
    [watchMealFoods, nameOfFavoriteMeal.length]
  );

  return {
    isCreatingFavoriteMeal,
    isValid,
    mealFoods,
    watchMealFoods,
    nameOfFavoriteMeal,
    setTableFoods,
    handleCloseModal,
    handleSubmit,
    handleChangeNameOfFavoriteMeal,
  };
}
