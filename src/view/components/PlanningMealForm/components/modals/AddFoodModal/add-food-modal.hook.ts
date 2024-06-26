import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { useGetAllFoods } from '@godiet-hooks/foods';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import * as z from 'zod';

import { AddFoodModalProps } from './add-food-modal';

const CreateMealFoodSchema = z.object({
  id: z.string().uuid(),
  measure: z.object({ name: z.string(), qty: z.number() }),
  qty: z.number().nonnegative().min(1),
});

type TCreateMealFoodCustomDTO = z.infer<typeof CreateMealFoodSchema>;

export function useAddFoodModalHook(props: AddFoodModalProps) {
  const { mealIndex, onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  const {
    handleSubmit: hookFormSubmit,
    register,
    reset,
    formState: { errors, isValid: internalFormIsValid },
    control: internalControl,
  } = useForm<TCreateMealFoodCustomDTO>({
    resolver: zodResolver(CreateMealFoodSchema),
    defaultValues: {
      id: '',
      measure: { name: '', qty: 0 },
      qty: 1,
    },
  });

  const watchFood = useWatch({
    control: internalControl,
  });

  const measureOptions = React.useMemo(() => {
    if (!watchFood) return [];

    if (!watchFood.id) return [];

    const selectedFood = foods.find((food) => food.id === watchFood.id);

    if (!selectedFood) return [];

    return selectedFood.measures;
  }, [foods, watchFood]);

  // Internal Form

  //External form
  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { append } = useFieldArray({
    name: `meals.${mealIndex}.mealFoods`,
    control,
  });
  //External form

  const handleOnCloseModal = React.useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handleInternalFormSubmit = hookFormSubmit((data) => {
    const selectedFood = foods.find((food) => food.id === data.id);

    if (!selectedFood) return;

    append({
      name: selectedFood.name,
      measure: data.measure,
      qty: data.qty,
      foodId: data.id,
    });

    handleOnCloseModal();
  });

  const foodOptions = React.useMemo(
    () => foods.map((food) => ({ label: food.name, value: food.id })),
    [foods]
  );

  const formIsValid = React.useMemo(() => {
    return Boolean(internalFormIsValid && watchFood?.measure?.name);
  }, [internalFormIsValid, watchFood?.measure?.name]);

  return {
    foodOptions,
    isFetchingFoods,
    errors,
    internalControl,
    formIsValid,
    measureOptions,
    register,
    handleInternalFormSubmit,
    handleOnCloseModal,
  };
}
