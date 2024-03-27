import { useCallback, useMemo, useState } from 'react';

import { useCreateFavoriteMeal } from '@godiet-hooks/favoriteMeal';
import { useGetAllFoods } from '@godiet-hooks/foods';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';
import {
  calculateMealFoods,
  FoodsByMeal,
} from '@godiet-pages/CreatePlanning/utils/calculateMealFoods';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { StarMealModalProps } from './StarMealModal';

const FavoriteMealSchema = z.object({
  name: z.string().min(1),
});

type TFavoriteMealDTO = z.infer<typeof FavoriteMealSchema>;

export function useStartMealModalHook(props: StarMealModalProps) {
  const { mealIndex, onClose } = props;

  // Custom hooks
  const { createFavoriteMeal, isCreatingFavoriteMeal } =
    useCreateFavoriteMeal();

  const { foods } = useGetAllFoods();

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMealFoods = useWatch({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    reset,
    formState: { isValid: internalFormIsValid },
  } = useForm<TFavoriteMealDTO>({
    resolver: zodResolver(FavoriteMealSchema),
  });

  const [tableFoods, setTableFoods] = useState(watchMealFoods);

  // usememo
  const mealFoods = useMemo<FoodsByMeal[]>(() => {
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

  const isValid = useMemo(
    () => Boolean(watchMealFoods.length > 0 && internalFormIsValid),
    [watchMealFoods, internalFormIsValid]
  );
  // usememo

  // callbacks

  const handleSubmit = hookFormSubmit(async (data) => {
    const newMealFoods = tableFoods.map((mealFood) => ({
      foodId: mealFood.foodId,
      measure: mealFood.measure,
      options: [],
      qty: mealFood.qty,
      name: mealFood.name,
    }));

    const newData = {
      name: data.name,
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
  });

  const handleCloseModal = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);
  // callbacks
  return {
    isCreatingFavoriteMeal,
    mealFoods,
    isValid,
    watchMealFoods,
    register,
    setTableFoods,
    handleSubmit,
    handleCloseModal,
  };
}
