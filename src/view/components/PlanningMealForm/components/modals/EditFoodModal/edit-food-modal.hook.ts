import React from 'react';

import {
  CreateMealFoodSchema,
  TCreateMealFoodDTO,
  TCreatePlanningMealDTO,
} from '@godiet-components/PlanningMealForm';
import { useGetAllFoods } from '@godiet-hooks/foods';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';

import { EditFoodModalProps } from './edit-food-modal';

interface HandleChangeSelectAutoCompleteParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (...event: any[]) => void;
  newValue: string;
}

export function useEditFoodModalHook(props: EditFoodModalProps) {
  const { mealIndex, initialValues, onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  const [qty, setQty] = React.useState(initialValues?.qty || 0);

  const handleQtyChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQty(Number(event.target.value));
    },
    []
  );

  const {
    handleSubmit: hookFormSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isValid: internalFormIsValid },
    control: internalControl,
  } = useForm<TCreateMealFoodDTO>({
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

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { update } = useFieldArray({
    name: `meals.${mealIndex}.mealFoods`,
    control,
  });

  const handleOnCloseModal = React.useCallback(() => {
    onClose();
  }, [onClose]);

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

  const handleChangeSelectAutoComplete = React.useCallback(
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

  const foodOptions = React.useMemo(
    () => foods.map((food) => ({ label: food.name, value: food.id })),
    [foods]
  );

  const measureOptions = React.useMemo(() => {
    if (!watchFood) return [];

    if (!watchFood.foodId) return [];

    const selectedFood = foods.find((food) => food.id === watchFood.foodId);

    if (!selectedFood) return [];

    return selectedFood.measures;
  }, [foods, watchFood]);

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
    qty,
    register,
    handleQtyChange,
    handleInternalFormSubmit,
    handleOnCloseModal,
    handleChangeSelectAutoComplete,
  };
}
