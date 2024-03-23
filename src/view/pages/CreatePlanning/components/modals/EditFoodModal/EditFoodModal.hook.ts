import { useCallback, useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';
import {
  CreateMealFoodSchema,
  TCreatePlanningMealDTO,
} from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import * as z from 'zod';

import { EditFoodModalProps } from './EditFoodModal';

export type TCreateMealDTO = z.infer<typeof CreateMealFoodSchema>;

interface HandleChangeSelectAutoCompleteParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  newValue: string;
}

export function useEditFoodModalHook(props: EditFoodModalProps) {
  const { mealIndex, initialValues, onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  // Internal Form
  const {
    handleSubmit: hookFormSubmit,
    register,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid: internalFormIsValid },
    control: internalControl,
  } = useForm<TCreateMealDTO>({
    resolver: zodResolver(CreateMealFoodSchema),
    defaultValues: {
      foodId: initialValues?.foodId || '',
      measure: initialValues?.measure || { name: '' },
      qty: initialValues?.qty || 1,
      name: initialValues?.name || '',
    },
  });

  const watchFood = useWatch({
    control: internalControl,
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
    const selectedFood = foods.find((food) => food.id === data.foodId);

    if (!selectedFood) return;

    update(initialValues.mealFoodIndex, {
      name: selectedFood.name,
      measure: data.measure,
      qty: data.qty,
      foodId: data.foodId,
    });

    handleOnCloseModal();
  });

  const handleChangeSelectAutoComplete = useCallback(
    (param: HandleChangeSelectAutoCompleteParams) => {
      const { newValue, onChange } = param;

      const selectedFood = foods.find((food) => food.id === newValue)!;

      const formState = getValues();

      const hasSameMeasure = selectedFood.measures.find(
        (measure) => measure.name === formState.measure?.name
      );

      if (!hasSameMeasure) {
        setValue('measure', selectedFood.measures[0]);
      } else {
        setValue('measure', hasSameMeasure);
      }

      setValue('name', selectedFood.name);
      onChange(newValue);
    },
    [foods, setValue, getValues]
  );

  const foodOptions = useMemo(
    () => foods.map((food) => ({ label: food.name, value: food.id })),
    [foods]
  );

  const measureOptions = useMemo(() => {
    if (!watchFood) return [];

    if (!watchFood.foodId) return [];

    const selectedFood = foods.find((food) => food.id === watchFood.foodId);

    if (!selectedFood) return [];

    return selectedFood.measures;
  }, [foods, watchFood]);

  const formIsValid = useMemo(() => {
    return Boolean(internalFormIsValid && watchFood?.measure?.name);
    // return true;
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
    handleChangeSelectAutoComplete,
  };
}
