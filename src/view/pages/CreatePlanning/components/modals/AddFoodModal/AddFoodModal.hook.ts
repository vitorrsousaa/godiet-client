import { useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import * as z from 'zod';

import { AddFoodModalProps } from './AddFoodModal';

const CreateMealFoodSchema = z.object({
  id: z.string().uuid(),
  measure: z.string().min(1),
  qty: z.number().nonnegative().min(1),
});

type TCreateMealDTO = z.infer<typeof CreateMealFoodSchema>;

export function useAddFoodModalHook(props: AddFoodModalProps) {
  const { mealIndex, onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  // Internal Form
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors, isValid: internalFormIsValid },
    control: internalControl,
  } = useForm<TCreateMealDTO>({
    resolver: zodResolver(CreateMealFoodSchema),
    defaultValues: {
      id: '',
      measure: '',
      qty: 1,
    },
  });

  // Internal Form

  //External form
  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { append } = useFieldArray({
    name: `meals.${mealIndex}.mealFoods`,
    control,
  });
  //External form

  const handleInternalFormSubmit = hookFormSubmit((data) => {
    append({
      name: 'comidinha',
      measure: data.measure,
      qty: data.qty,
      id: data.id,
    });

    onClose();
  });

  const foodOptions = useMemo(
    () => foods.map((food) => ({ label: food.name, value: food.id })),
    [foods]
  );

  return {
    foodOptions,
    isFetchingFoods,
    errors,
    internalControl,
    internalFormIsValid,
    register,
    handleInternalFormSubmit,
  };
}
