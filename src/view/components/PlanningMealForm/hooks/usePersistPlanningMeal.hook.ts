import React from 'react';

import { PlanningMealStorage } from '@storage/planningMeal';
import toast from 'react-hot-toast';

import {
  defaultInitialValues,
  TCreatePlanningMealDTO,
} from '../planning-meal-form.schema';

interface UsePersistPlanningMealProps {
  planningMealKey: string;
  getValues: () => TCreatePlanningMealDTO;
  hasError?: boolean;
}

export function usePersistPlanningMeal(props: UsePersistPlanningMealProps) {
  const { planningMealKey, hasError, getValues } = props;

  const storage = React.useMemo(
    () =>
      new PlanningMealStorage<TCreatePlanningMealDTO>(
        planningMealKey,
        defaultInitialValues
      ),
    [planningMealKey]
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (hasError) {
        return null;
      }

      toast.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
        error: '',
        loading: 'Salvando...',
        success: 'Salvo com sucesso! Próximo em 60s',
      });
      storage.set(getValues());
    }, 60000);

    return () => clearInterval(timer);
  }, [getValues, hasError, storage]);

  return {
    storage,
  };
}
