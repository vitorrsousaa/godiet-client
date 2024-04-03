import React from 'react';

import { UseFormGetValues } from 'react-hook-form';

import { TCreatePlanningMealDTO } from './planning-meal-form.schema';

export type UsePlanningMealFormController = {
  getValues: () => TCreatePlanningMealDTO;
};

export interface UsePlanningMealFormControllerInternal
  extends UsePlanningMealFormController {
  _refs: {
    getValuesRef: React.MutableRefObject<UseFormGetValues<TCreatePlanningMealDTO> | null>;
  };
}

export function castToInternalUse(
  controller: UsePlanningMealFormController
): UsePlanningMealFormControllerInternal {
  return controller as UsePlanningMealFormControllerInternal;
}

export const defaultInitialValues = {
  name: '',
  meals: [
    {
      name: '',
      time: '',
      mealFoods: [
        {
          name: '',
          foodId: '',
          qty: 0,
          measure: { name: '', qty: 0 },
        },
      ],
    },
  ],
};

export function usePlanningMealFormController(): UsePlanningMealFormController {
  const getValuesRef =
    React.useRef<UseFormGetValues<TCreatePlanningMealDTO> | null>(null);

  const getValues = React.useCallback(() => {
    if (getValuesRef.current) {
      return getValuesRef.current();
    }
    return defaultInitialValues;
  }, []);

  const result: UsePlanningMealFormControllerInternal = {
    getValues,
    _refs: {
      getValuesRef,
    },
  };

  return result as UsePlanningMealFormController;
}
