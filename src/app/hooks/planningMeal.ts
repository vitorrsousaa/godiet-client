import { QUERY_CACHE_KEYS } from '@godiet-config';
import { planningMealServices } from '@godiet-services/planningMeal';

import { useMutation, useQuery } from '@tanstack/react-query';

export function useCreatePlanningMeal() {
  const { isPending, mutateAsync: createPlanningMeal } = useMutation({
    mutationFn: planningMealServices.create,
  });

  return {
    isCreatingPlanningMeal: isPending,
    createPlanningMeal,
  };
}

export function useGetAllByPatient(patientId?: string) {
  const { data, isFetching, isPending } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId],
    queryFn: () => planningMealServices.getAllByPatient(patientId || ''),
    enabled: !!patientId,
  });

  return {
    planningMeals: data || [],
    isFetchingPlanningMeals: isFetching || isPending,
  };
}
