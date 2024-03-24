import { useCallback, useMemo, useReducer, useState } from 'react';

import {
  CreateMealFoodSchema,
  TCreatePlanningMealDTO,
} from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import * as z from 'zod';

import { CreateMealProps } from './CreateMeal';

type TSelectedFoodToEdit = z.infer<typeof CreateMealFoodSchema> & {
  mealFoodIndex: number;
};

export function useCreateMealHook(props: CreateMealProps) {
  const { mealIndex, onAddMeal } = props;

  const [modalAddFoodIsOpen, toggleModalAddFoodOpen] = useReducer(
    (state) => !state,
    false
  );
  const [modalEditFoodIsOpen, toggleModalEditFoodOpen] = useReducer(
    (state) => !state,
    false
  );
  const [modalAddFavoriteMealIsOpen, toggleModalAddFavoriteMealOpen] =
    useReducer((state) => !state, false);
  const [modalUseFavoriteMealIsOpen, toggleModalUseFavoriteMealOpen] =
    useReducer((state) => !state, false);

  const [selectedMealIndex, toggleSelectedMealIndex] = useReducer(
    (state: number, index: number) => {
      if (index > 0) {
        return index;
      }

      return state;
    },
    0
  );

  const [modalRemoveFoodIsOpen, setModalRemoveFoodIsOpen] = useState(false);

  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number | null>(
    null
  );

  const [selectedFoodToEdit, setSelectedFoodToEdit] =
    useState<TSelectedFoodToEdit | null>(null);

  const { register, control } = useFormContext<TCreatePlanningMealDTO>();

  const { remove } = useFieldArray({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  const watchMealFoods = useWatch({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const generateHashKey = useMemo(() => {
    if (!selectedFoodToEdit) return 'food-to-edit';

    const hashId = selectedFoodToEdit.foodId;
    const hashMeasureName = selectedFoodToEdit.measure.name
      .trim()
      .replace(' ', '-');
    const hashQty = selectedFoodToEdit.qty;
    const hashMealFoodIndex = selectedFoodToEdit.mealFoodIndex;

    return `food-to-edit-${hashId}-${hashMeasureName}-${hashQty}-${hashMealFoodIndex}`;
  }, [selectedFoodToEdit]);

  const handleOpenModalEditFood = useCallback(
    ({
      mealFoodIndex,
      mealIndex,
    }: {
      mealFoodIndex: number;
      mealIndex: number;
    }) => {
      const selectedFood = watchMealFoods[mealFoodIndex];

      if (!selectedFood) return;

      toggleSelectedMealIndex(mealIndex);

      setSelectedFoodToEdit({
        foodId: selectedFood.foodId,
        measure: selectedFood.measure,
        qty: selectedFood.qty,
        mealFoodIndex: mealFoodIndex,
        name: selectedFood.name,
      });
      toggleModalEditFoodOpen();
    },
    [watchMealFoods]
  );

  const handleCloseModalEditFood = useCallback(() => {
    setSelectedFoodToEdit(null);
    toggleModalEditFoodOpen();
  }, []);

  const handleOpenModalRemoveFood = useCallback((foodIndex: number) => {
    setSelectedFoodIndex(foodIndex);
    setModalRemoveFoodIsOpen(true);
  }, []);

  const handleCloseModalRemoveFood = useCallback(() => {
    setSelectedFoodIndex(null);
    setModalRemoveFoodIsOpen(false);
  }, []);

  const handleRemoveMealFood = useCallback(() => {
    if (selectedFoodIndex === null) {
      return;
    }
    remove(selectedFoodIndex);

    handleCloseModalRemoveFood();
  }, [handleCloseModalRemoveFood, remove, selectedFoodIndex]);

  const handleDuplicateMeal = useCallback(() => {
    onAddMeal(watchMeal);
  }, [onAddMeal, watchMeal]);

  return {
    modalAddFoodIsOpen,
    modalRemoveFoodIsOpen,
    modalEditFoodIsOpen,
    selectedFoodToEdit,
    generateHashKey,
    selectedMealIndex,
    modalAddFavoriteMealIsOpen,
    modalUseFavoriteMealIsOpen,
    toggleModalUseFavoriteMealOpen,
    toggleModalAddFavoriteMealOpen,
    toggleSelectedMealIndex,
    handleCloseModalEditFood,
    handleOpenModalEditFood,
    toggleModalAddFoodOpen,
    handleOpenModalRemoveFood,
    handleCloseModalRemoveFood,
    handleRemoveMealFood,
    handleDuplicateMeal,
    register,
  };
}
