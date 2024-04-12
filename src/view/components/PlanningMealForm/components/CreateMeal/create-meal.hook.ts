import React from 'react';

import {
  TCreateMealFoodDTO,
  TCreatePlanningMealDTO,
} from '@godiet-components/PlanningMealForm';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { CreateMealProps } from './create-meal';

type TSelectedFoodToEdit = TCreateMealFoodDTO & {
  mealFoodIndex: number;
};

export function useCreateMealHook(props: CreateMealProps) {
  const { mealIndex, onAddMeal } = props;

  const [modalAddFoodIsOpen, toggleModalAddFoodOpen] = React.useReducer(
    (state) => !state,
    false
  );

  const [modalEditFoodIsOpen, toggleModalEditFoodOpen] = React.useReducer(
    (state) => !state,
    false
  );

  const [selectedMealIndex, toggleSelectedMealIndex] = React.useReducer(
    (state: number, index: number) => {
      if (index > 0) {
        return index;
      }

      return state;
    },
    0
  );

  const [modalUseFavoriteMealIsOpen, toggleModalUseFavoriteMealOpen] =
    React.useReducer((state) => !state, false);

  const [modalAddFavoriteMealIsOpen, toggleModalAddFavoriteMealOpen] =
    React.useReducer((state) => !state, false);

  const [modalAddObservationIsOpen, toggleModalAddObservationOpen] =
    React.useReducer((state) => !state, false);

  const [modalRemoveFoodIsOpen, setModalRemoveFoodIsOpen] =
    React.useState(false);

  const [selectedFoodIndex, setSelectedFoodIndex] = React.useState<
    number | null
  >(null);

  const [selectedFoodToEdit, setSelectedFoodToEdit] =
    React.useState<TSelectedFoodToEdit | null>(null);

  const { register, control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  const { remove } = useFieldArray({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const watchMealFoods = useWatch({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const handleDuplicateMeal = React.useCallback(() => {
    onAddMeal(watchMeal);
  }, [onAddMeal, watchMeal]);

  const defaultMealTitles = React.useMemo(() => {
    return [
      { value: 'Café da manhã', label: 'Café da manhã' },
      { value: 'Desjejum', label: 'Desjejum' },
      { value: 'Colação', label: 'Colação' },
      { value: 'Pré-treino', label: 'Pré-treino' },
      { value: 'Pós-treino', label: 'Pós-treino' },
      { value: 'Almoço', label: 'Almoço' },
      { value: 'Lanche', label: 'Lanche' },
      { value: 'Jantar', label: 'Jantar' },
      { value: 'Ceia', label: 'Ceia' },
    ];
  }, []);

  const hashKeyOfStarMealFood = React.useMemo(() => {
    const array = watchMealFoods.map((food) => {
      return `${food.foodId}-${food.measure.name}-${food.qty}-${food.name}`;
    });
    return array.join('-');
  }, [watchMealFoods]);

  const hashKeyOfEditFoodModal = React.useMemo(() => {
    if (!selectedFoodToEdit) return 'food-to-edit';

    const hashId = selectedFoodToEdit.foodId;
    const hashMeasureName = selectedFoodToEdit.measure.name
      .trim()
      .replace(' ', '-');
    const hashQty = selectedFoodToEdit.qty;
    const hashMealFoodIndex = selectedFoodToEdit.mealFoodIndex;

    return `food-to-edit-${hashId}-${hashMeasureName}-${hashQty}-${hashMealFoodIndex}`;
  }, [selectedFoodToEdit]);

  const handleCloseModalEditFood = React.useCallback(() => {
    setSelectedFoodToEdit(null);
    toggleModalEditFoodOpen();
  }, []);

  const handleCloseModalRemoveFood = React.useCallback(() => {
    setSelectedFoodIndex(null);
    setModalRemoveFoodIsOpen(false);
  }, []);

  const handleRemoveMealFood = React.useCallback(() => {
    if (selectedFoodIndex === null) {
      return;
    }
    remove(selectedFoodIndex);

    handleCloseModalRemoveFood();
  }, [handleCloseModalRemoveFood, remove, selectedFoodIndex]);

  const handleOpenModalRemoveFood = React.useCallback((foodIndex: number) => {
    setSelectedFoodIndex(foodIndex);
    setModalRemoveFoodIsOpen(true);
  }, []);

  const handleOpenModalEditFood = React.useCallback(
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

  return {
    defaultMealTitles,
    control,
    modalAddFoodIsOpen,
    modalUseFavoriteMealIsOpen,
    hashKeyOfStarMealFood,
    modalAddFavoriteMealIsOpen,
    hashKeyOfEditFoodModal,
    modalEditFoodIsOpen,
    selectedMealIndex,
    selectedFoodToEdit,
    modalRemoveFoodIsOpen,
    modalAddObservationIsOpen,
    toggleModalAddObservationOpen,
    handleOpenModalRemoveFood,
    handleOpenModalEditFood,
    toggleModalAddFavoriteMealOpen,
    handleCloseModalRemoveFood,
    handleRemoveMealFood,
    handleCloseModalEditFood,
    toggleModalUseFavoriteMealOpen,
    register,
    toggleModalAddFoodOpen,
    handleDuplicateMeal,
  };
}
