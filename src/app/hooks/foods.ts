import { QUERY_CACHE_KEYS } from '@godiet-config';
import { TFood } from '@godiet-entities';
import { useQueries, useQueryClient } from '@godiet-query';
import { foodServices } from '@godiet-services/foods';

interface TPrefetchFoodParams {
  categoryId?: string;
  portion?: number;
}

export function usePrefetchFoods() {
  const queryClient = useQueryClient();

  return ({ categoryId, portion }: TPrefetchFoodParams) => {
    const portionCacheKey = `portion-${portion ? portion : 0}`;

    queryClient.prefetchQuery({
      queryKey: [
        QUERY_CACHE_KEYS.FOODS,
        categoryId && categoryId,
        portionCacheKey,
      ],
      queryFn: async () => foodServices.getAll({ categoryId, portion }),
    });
  };
}

export type getCacheInputParams = {
  categories: { id: string; qty: number }[];
};

interface TCacheFood {
  categoryId: string;
  categoryName: string;
  data: TFood[];
  portion: number;
}
interface TCacheFoodByCategoryOutput {
  cacheData: TCacheFood[];
}

export function useGetCacheCategories(
  getCacheInput: getCacheInputParams
): TCacheFoodByCategoryOutput {
  const queryClient = useQueryClient();

  const cacheData = getCacheInput.categories.map((category) => {
    const cache = queryClient.getQueriesData<TFood[]>({
      queryKey: [
        QUERY_CACHE_KEYS.FOODS,
        category.id,
        `portion-${category.qty}`,
      ],
    });

    return cache;
  });

  const result: TCacheFood[] = cacheData.map((cache) => {
    const flatCache = cache.flat();

    const removeUndefinedValues = flatCache.filter(
      (item) => item !== undefined
    ) as unknown as [string[], TFood[]];

    if (removeUndefinedValues.length < 1) {
      return {
        categoryId: 'category-cache',
        data: [],
        categoryName: 'category-name',
        portion: 1,
      };
    }

    const categoryId = removeUndefinedValues[0] && removeUndefinedValues[0][1];

    const cacheData = removeUndefinedValues[1] ? removeUndefinedValues[1] : [];

    const categoryName: string | undefined =
      removeUndefinedValues[1] &&
      removeUndefinedValues[1][0]?.categoryName?.name;

    const portion = Number(
      removeUndefinedValues[0][removeUndefinedValues[0].length - 1].replace(
        'portion-',
        ''
      )
    );

    return {
      categoryId: categoryId as string,
      data: cacheData as TFood[],
      categoryName: categoryName || 'category-name',
      portion,
    };
  });

  return { cacheData: result.filter((item) => item.data.length > 0) };
}

interface getAllFoodByCategoryInputParams {
  data: {
    categoryId: string;
    portion: number;
  }[];
}

export function useGetAllFoodByCategories(
  getAllFoodByCategoryInput: getAllFoodByCategoryInputParams
): {
  isFetchingFoodsByCategories: boolean;
  isErrorFoodsByCategories: boolean;
  foodsByCategories: TCacheFood[];
} {
  const { data } = getAllFoodByCategoryInput;

  const queryResult = useQueries({
    queries: data.map((category) => ({
      queryKey: [
        QUERY_CACHE_KEYS.FOODS,
        category.categoryId,
        `portion-${category.portion}`,
      ],
      queryFn: async () =>
        foodServices.getAll({
          categoryId: category.categoryId,
          portion: category.portion,
        }),
    })),
  });

  return {
    isFetchingFoodsByCategories:
      queryResult.some((query) => query.isLoading) ||
      queryResult.some((query) => query.isPending),
    isErrorFoodsByCategories: queryResult.some((query) => query.isError),
    foodsByCategories:
      queryResult.map((query, index) => {
        return {
          categoryId: data[index].categoryId,
          categoryName: query.data?.[0].categoryName?.name || 'category-name',
          data: query.data || [],
          portion: data[index].portion,
        };
      }) || [],
  };
}
