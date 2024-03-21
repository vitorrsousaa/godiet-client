import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import { anamnesisServices } from '@godiet-services/anamnesis';

export function useCreateAnamnesis() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createAnamnesis } = useMutation({
    mutationFn: anamnesisServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.ANAMNESIS],
      });
    },
  });

  return {
    isCreatingAnamnesis: isPending,
    createAnamnesis,
  };
}

export function useDeleteAnamnesis() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deleteAnamnesis } = useMutation({
    mutationFn: anamnesisServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.ANAMNESIS],
      });
    },
  });

  return {
    isDeletingAnamnesis: isPending,
    deleteAnamnesis,
  };
}

export function useUpdateAnamnesis() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateAnamnesis } = useMutation({
    mutationFn: anamnesisServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.ANAMNESIS],
      });
    },
  });

  return {
    isUpdatingAnamnesis: isPending,
    updateAnamnesis,
  };
}

export function useGetAllAnamnesis(patientId: string | undefined) {
  const { data, isLoading, isPending, isError, isFetching } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.ANAMNESIS, patientId && patientId],
    queryFn: () => anamnesisServices.getAll({ patientId: patientId || '' }),
    enabled: !!patientId,
  });

  return {
    anamnesis: data ?? [],
    isFetchingAnamnesis: isFetching || isPending,
    isErrorAnamnesis: isError,
    isLoadingAnamnesis: isLoading,
  };
}

interface TPrefetchAllAnamnesisParams {
  patientId: string;
}

export function usePrefetchAllAnamnesis() {
  const queryClient = useQueryClient();

  return ({ patientId }: TPrefetchAllAnamnesisParams) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_CACHE_KEYS.ANAMNESIS, patientId],
      queryFn: async () => anamnesisServices.getAll({ patientId }),
    });
  };
}
