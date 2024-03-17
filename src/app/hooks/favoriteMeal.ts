import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useMutation, useQuery, useQueryClient } from '@godiet-query';
import { favoriteMealServices } from '@godiet-services/favoriteMeal';

export function useGetAllFavoriteMeal() {
  const { data, isLoading, isPending, isFetching, isError } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.FAVORITE_MEAL],
    queryFn: favoriteMealServices.getAll,
  });

  return {
    favoriteMeals: data ?? [],
    isErrorFavoriteMeal: isError,
    isFetchingFavoriteMeal: isFetching || isPending,
    isLoadingFavoriteMeal: isLoading,
  };
}

export function useCreateFavoriteMeal() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: createFavoriteMeal } = useMutation({
    mutationFn: favoriteMealServices.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.FAVORITE_MEAL],
      });
    },
  });

  return {
    isCreatingFavoriteMeal: isPending,
    createFavoriteMeal,
  };
}

export function useDeleteFavoriteMeal() {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: deleteFavoriteMeal } = useMutation({
    mutationFn: favoriteMealServices.delete,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.FAVORITE_MEAL],
      });
    },
  });

  return {
    isDeletingFavoriteMeal: isPending,
    deleteFavoriteMeal,
  };
}
