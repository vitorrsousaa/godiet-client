import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { PlanningMealFormProps } from './planning-meal-form';
import { castToInternalUse } from './planning-meal-form.controller';
import {
  CreatePlanningMealSchema,
  defaultInitialValues,
  TCreatePlanningMealDTO,
} from './planning-meal-form.schema';

export function usePlanningMealFormHook(props: PlanningMealFormProps) {
  const { initialValues, formID, controller, onSubmit } = props;

  const methods = useForm<TCreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
    defaultValues: initialValues || defaultInitialValues,
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    getValues,
    formState: { errors },
    control,
  } = methods;

  const {
    append: appendMeals,
    remove: removeMeal,
    fields,
  } = useFieldArray({
    control,
    name: 'meals',
  });

  const watchMeals = useWatch({ control, name: 'meals' });

  const handleAddNewMeal = React.useCallback(() => {
    appendMeals({
      name: '',
      time: '',
      mealFoods: [],
    });
  }, [appendMeals]);

  const handleRemoveMeal = React.useCallback(
    (index: number) => {
      if (watchMeals.length > 1) {
        removeMeal(index);
      }
    },
    [removeMeal, watchMeals]
  );

  const handleSubmit = hookFormSubmit(async (data) => {
    await onSubmit(data);
  });

  const formId = formID || 'planning-meal-form';

  React.useEffect(() => {
    if (controller) {
      castToInternalUse(controller)._refs.getValuesRef.current = getValues;
    }
  }, [controller, getValues]);

  return {
    errors,
    methods,
    formId,
    meals: fields,
    register,
    handleAddNewMeal,
    handleRemoveMeal,
    handleSubmit,
    appendMeals,
  };
}
