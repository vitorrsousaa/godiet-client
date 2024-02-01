import { QUERY_CACHE_KEYS } from '@godiet-config';
import { useQuery } from '@godiet-query';
import { categoryNameServices } from '@godiet-services/categoryName';

export function useGetAllCategoryName() {
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.CATEGORY_NAME_FOODS],
    queryFn: categoryNameServices.getAll,
  });

  return {
    categoriesName: data ?? [],
    isFetchingCategories: isPending || isFetching,
    isErrorCategories: isError,
  };
}
