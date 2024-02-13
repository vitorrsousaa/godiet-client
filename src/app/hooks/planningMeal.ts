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

interface queryGetAllByPatientParams {
  planningId?: string;
  patientId?: string;
}

export function useGetAllByPatient(params: queryGetAllByPatientParams) {
  const { patientId } = params;

  const { data, isFetching, isPending } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId],
    queryFn: () =>
      planningMealServices.getAllByPatient<false>({
        patientId: patientId || '',
      }),
    enabled: !!patientId,
  });

  return {
    planningMeals: data || [],
    isFetchingPlanningMeals: isFetching || isPending,
  };
}

export function useGetByPlanningId(params: queryGetAllByPatientParams) {
  const { patientId, planningId } = params;

  const { data, isFetching, isPending, isError } = useQuery({
    queryKey: [
      QUERY_CACHE_KEYS.PLANNING_MEAL,
      patientId,
      planningId && planningId,
    ],
    queryFn: () =>
      planningMealServices.getAllByPatient<true>({
        patientId: patientId || '',
        planningId,
      }),
    enabled: !!patientId && !!planningId,
  });

  return {
    planningMeal: data,
    isFetchingPlanningMeal: isFetching || isPending,
    isErrorPlanningMeal: isError,
  };
}
