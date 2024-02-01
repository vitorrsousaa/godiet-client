import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useQueryClient } from '@godiet-query';
import { foodServices } from '@godiet-services/foods';

export function usePrefetchFoods() {
  const queryClient = useQueryClient();

  return (categoryId?: string) => {
    queryClient.prefetchQuery({
      queryKey: [QUERY_CACHE_KEYS.FOODS, categoryId && categoryId],
      queryFn: async () => foodServices.getAll(categoryId),
    });
  };
}

export type getCacheInputParams = {
  categories: { id: string; qty: number }[];
};

type TCategoryName = {
  name: string;
  id: string;
  baseProtein: number;
  baseFat: number;
  baseCarbo: number;
  baseEnergy: number;
};

interface TCacheFoodByCategoryOutput {
  categoryId: string;
  data: TCategoryName[];
}

export function useGetCacheCategories(
  getCacheInput: getCacheInputParams
): TCacheFoodByCategoryOutput[] {
  const queryClient = useQueryClient();

  const cacheData = getCacheInput.categories.map((category) => {
    const cache = queryClient.getQueriesData<TCategoryName[]>({
      queryKey: [QUERY_CACHE_KEYS.FOODS, category.id],
    });

    return cache;
  });

  const result: TCacheFoodByCategoryOutput[] = cacheData.map((cache) => {
    const flatCache = cache.flat();

    const removeUndefinedValues = flatCache.filter(
      (item) => item !== undefined
    );

    if (removeUndefinedValues.length === 0) {
      return {
        categoryId: 'category-cache',
        data: [],
      };
    }

    const categoryId = removeUndefinedValues[0] && removeUndefinedValues[0][1];

    const cacheData = removeUndefinedValues[1] ? removeUndefinedValues[1] : [];

    return {
      categoryId: categoryId as string,
      data: cacheData as TCategoryName[],
    };
  });

  return result.filter((item) => item.data.length > 0);
}
