import { useReducer } from 'react';

import { useFormContext } from 'react-hook-form';

import { CreateMealProps } from './CreateMeal';

export function useCreateMealHook(props: CreateMealProps) {
  const [modalAddFoodIsOpen, toggleModalAddFoodOpen] = useReducer(
    (state) => !state,
    false
  );

  const { register, control } = useFormContext();

  return { modalAddFoodIsOpen, toggleModalAddFoodOpen, register };
}
