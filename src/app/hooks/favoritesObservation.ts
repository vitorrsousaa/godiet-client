import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import { favoritesObservationServices } from '@godiet-services/favoritesObservation';

export function useGetAllFavoritesObservation() {
  const { data, isLoading, isPending, isFetching, isError } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.FAVORITE_OBSERVATIONS],
    queryFn: favoritesObservationServices.getAll,
  });

  return {
    favoritesObservations: data ?? [],
    isErrorFavoritesObservation: isError,
    isFetchingFavoritesObservation: isFetching || isPending,
    isLoadingFavoritesObservation: isLoading,
  };
}

export function useCreateFavoritesObservation() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createFavoritesObservation } = useMutation({
    mutationFn: favoritesObservationServices.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.FAVORITE_OBSERVATIONS],
      });
    },
  });

  return {
    isCreatingFavoritesObservation: isPending,
    createFavoritesObservation,
  };
}

export function useDeleteFavoritesObservation() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deleteFavoritesObservation } = useMutation({
    mutationFn: favoritesObservationServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.FAVORITE_OBSERVATIONS],
      });
    },
  });

  return {
    isDeletingFavoritesObservation: isPending,
    deleteFavoritesObservation,
  };
}

export function useUpdateFavoritesObservation() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateFavoritesObservation } = useMutation({
    mutationFn: favoritesObservationServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.FAVORITE_OBSERVATIONS],
      });
    },
  });

  return {
    isUpdatingFavoritesObservation: isPending,
    updateFavoritesObservation,
  };
}
