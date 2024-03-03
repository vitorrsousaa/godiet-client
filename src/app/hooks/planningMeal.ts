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

  const { data, isFetching, isPending, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId],
    queryFn: () =>
      planningMealServices.getAllByPatient({
        patientId: patientId || '',
        planningId: undefined,
      }),
    enabled: !!patientId,
  });

  console.log({ isFetching, isPending, isLoading });

  return {
    planningMeals: data || [],
    isFetchingPlanningMeals: isFetching || isPending,
    isLoadingPlanningMeals: isLoading,
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

interface prefetchGetAllByPatientParams {
  patientId: string;
}

export function usePrefetchAllPlanningMeal() {
  const queryClient = useQueryClient();
  return ({ patientId }: prefetchGetAllByPatientParams) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId],
      queryFn: async () =>
        planningMealServices.getAllByPatient({
          patientId,
          planningId: undefined,
        }),
    });
  };
}

interface IDeletePlanningInput {
  planningMealId: string;
  patientId: string;
}

export function useDeletePlanningMeal(
  deletePlanningInput: IDeletePlanningInput
) {
  const queryClient = useQueryClient();

  const { patientId } = deletePlanningInput;

  const { mutateAsync: deletePlanningMeal, isPending } = useMutation({
    mutationFn: planningMealServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId],
      });
    },
  });

  return {
    isDeletingPlanningMeal: isPending,
    deletePlanningMeal,
  };
}
