import { useMemo } from 'react';

import { useGetCacheCategories } from '@godiet-hooks/foods';
import { useIsMounted } from '@godiet-hooks/useIsMounted';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanningEquivalent/CreatePlanningEquivalent.hook';

import { useFormContext } from 'react-hook-form';

import { IncreaseFoodModalProps } from './IncreaseFoodModal';

export function useIncreaseFoodModalHook(props: IncreaseFoodModalProps) {
  const { mealIndex } = props;
  const { getValues } = useFormContext<TCreatePlanningMealDTO>();

  const isMounted = useIsMounted();

  const values = getValues();

  const selectedCategories = useMemo(() => {
    if (!isMounted()) {
      return [];
    }

    return values.meals[mealIndex].categories
      .map((category) => ({
        id: category.id,
        qty: Number(category.qty),
      }))
      .filter((category) => category.qty > 0);
  }, [isMounted, mealIndex, values]);

  const cacheData = useGetCacheCategories({
    categories: selectedCategories,
  });

  console.log({ cacheData });
}
