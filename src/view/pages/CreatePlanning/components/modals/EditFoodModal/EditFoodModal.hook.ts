import { useCallback, useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import * as z from 'zod';

import { EditFoodModalProps } from './EditFoodModal';

const CreateMealFoodSchema = z.object({
  id: z.string().uuid(),
  measure: z.string().min(1),
  qty: z.number().nonnegative().min(1),
});

type TCreateMealDTO = z.infer<typeof CreateMealFoodSchema>;

export function useEditFoodModalHook(props: EditFoodModalProps) {
  const { mealIndex, initialValues, onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  // Internal Form
  const {
    handleSubmit: hookFormSubmit,
    register,
    reset,
    formState: { errors, isValid: internalFormIsValid },
    control: internalControl,
  } = useForm<TCreateMealDTO>({
    resolver: zodResolver(CreateMealFoodSchema),
    defaultValues: {
      id: initialValues?.id || '',
      measure: initialValues?.measure || '',
      qty: initialValues?.qty || 1,
    },
  });

  // Internal Form

  //External form
  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { update } = useFieldArray({
    name: `meals.${mealIndex}.mealFoods`,
    control,
  });
  //External form

  const handleOnCloseModal = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const handleInternalFormSubmit = hookFormSubmit((data) => {
    const selectedFood = foods.find((food) => food.id === data.id);

    if (!selectedFood) return;

    update(initialValues.mealFoodIndex, {
      name: selectedFood.name,
      measure: data.measure,
      qty: data.qty,
      id: data.id,
    });

    handleOnCloseModal();
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
    handleOnCloseModal,
  };
}
