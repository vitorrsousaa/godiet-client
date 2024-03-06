import { useCallback, useMemo } from 'react';

import { useGetAllFoods } from '@godiet-hooks/foods';

import { AddFoodModalProps } from './AddFoodModal';

export function useAddFoodModalHook(props: AddFoodModalProps) {
  const { onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  const handleSubmit = useCallback(() => {
    console.log('data');
  }, [onClose]);

  const foodOptions = useMemo(
    () => foods.map((food) => ({ label: food.name, value: food.id })),
    [foods]
  );

  return { foodOptions, isFetchingFoods, handleSubmit };
}
