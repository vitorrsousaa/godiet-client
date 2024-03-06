import { useFormContext } from 'react-hook-form';

import { CreateMealProps } from './CreateMeal';

export function useCreateMealHook(props: CreateMealProps) {
  const { register, control } = useFormContext();

  return {
    register,
  };
}
