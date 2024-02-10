import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanningEquivalent/CreatePlanningEquivalent.hook';

import { useFormContext } from 'react-hook-form';

export function useHeaderContentHook() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TCreatePlanningMealDTO>();

  return { register, errors };
}
