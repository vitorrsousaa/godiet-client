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

  const { data, isFetching, isPending, isLoading, isError } = useQuery({
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
    isLoadingPlanningMeals: isLoading,
    isErrorPlanningMeals: isError,
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

interface HandlerEditPlanningMealParams {
  planningMealId: string;
  patientId: string;
}

export function useDeletePlanningMeal(
  deletePlanningInput: HandlerEditPlanningMealParams
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

export function useUpdatePlanningMeal(params: HandlerEditPlanningMealParams) {
  const { patientId, planningMealId } = params;
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updatePlanningMeal } = useMutation({
    mutationFn: planningMealServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.PLANNING_MEAL, patientId, planningMealId],
      });
    },
  });

  return {
    isUpdatingPlanningMeal: isPending,
    updatePlanningMeal,
  };
}
