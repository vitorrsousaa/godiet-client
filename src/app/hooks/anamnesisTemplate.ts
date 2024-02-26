import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import { anamnesisTemplateServices } from '@godiet-services/anamnesisTemplate';

export function useGetAllAnamnesisTemplate() {
  const { data, isLoading, isPending, isError } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.ANAMNESIS_TEMPLATE],
    queryFn: anamnesisTemplateServices.getAll,
  });

  return {
    anamnesisTemplate: data ?? [],
    isErrorAnamnesisTemplate: isError,
    isFetchingAnamnesisTemplate: isLoading || isPending,
  };
}

export function useCreateAnamnesisTemplate() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createAnamnesisTemplate } = useMutation({
    mutationFn: anamnesisTemplateServices.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.ANAMNESIS_TEMPLATE],
      });
    },
  });

  return {
    isCreatingAnamnesisTemplate: isPending,
    createAnamnesisTemplate,
  };
}

export function useDeleteAnamnesisTemplate() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deleteAnamnesisTemplate } = useMutation({
    mutationFn: anamnesisTemplateServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.ANAMNESIS_TEMPLATE],
      });
    },
  });

  return {
    isDeletingAnamnesisTemplate: isPending,
    deleteAnamnesisTemplate,
  };
}
