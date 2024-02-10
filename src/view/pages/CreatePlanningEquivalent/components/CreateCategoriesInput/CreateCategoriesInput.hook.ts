import { usePrefetchFoods } from '@godiet-hooks/foods';

import { useFormContext } from 'react-hook-form';

export function useCreateCategoriesInputHook() {
  const { register } = useFormContext();
  const prefetchFoods = usePrefetchFoods();

  return {
    register,
    prefetchFoods,
  };
}
