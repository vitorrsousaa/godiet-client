import { QUERY_CACHE_KEYS } from '@godiet-config';
import { planningMealServices } from '@godiet-services/planningMeal';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useCreatePlanningMeal(patientId: string) {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createPlanningMeal } = useMutation({
    mutationFn: planningMealServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId],
      });
    },
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
      planningMealServices.getAllByPatient({
        patientId: patientId || '',
        planningId: undefined,
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
      planningMealServices.getAllByPatient({
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
