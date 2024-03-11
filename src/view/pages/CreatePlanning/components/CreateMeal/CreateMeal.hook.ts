import { useCallback, useMemo, useReducer, useState } from 'react';

import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { CreateMealProps } from './CreateMeal';

interface FoodsByMeal {
  id: string;
  measure: { name: string; qty: number };
  qty: number;
  prot: number;
  fat: number;
  carb: number;
  energy: number;
  name: string;
}

export function useCreateMealHook(props: CreateMealProps) {
  const { mealIndex } = props;

  const [modalAddFoodIsOpen, toggleModalAddFoodOpen] = useReducer(
    (state) => !state,
    false
  );
  const [modalEditFoodIsOpen, toggleModalEditFoodOpen] = useReducer(
    (state) => !state,
    false
  );
  const [modalRemoveFoodIsOpen, setModalRemoveFoodIsOpen] = useState(false);

  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number | null>(
    null
  );

  const [selectedFoodToEdit, setSelectedFoodToEdit] = useState<{
    id: string;
    measure: { name: string; qty: number };
    qty: number;
    mealFoodIndex: number;
  } | null>(null);

  const { register, control } = useFormContext<TCreatePlanningMealDTO>();

  const { remove } = useFieldArray({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  const foodsByMeal = useMemo<FoodsByMeal[]>(() => {
    const initialFoodsByMeal: FoodsByMeal[] = [];
    watchMeal.mealFoods.forEach((food) => {
      initialFoodsByMeal.push({
        id: food.id,
        measure: food.measure,
        qty: food.qty,
        prot: 0.6 * 20,
        fat: 0.1 * 20,
        carb: 7 * 10,
        energy: 120,
        name: food.name,
      });
    });

    return initialFoodsByMeal;
  }, [watchMeal.mealFoods]);

  const generateHashKey = useMemo(() => {
    if (!selectedFoodToEdit) return 'food-to-edit';

    return `food-to-edit-${selectedFoodToEdit.id}-${selectedFoodToEdit.measure}-${selectedFoodToEdit.qty}-${selectedFoodToEdit.mealFoodIndex}`;
  }, [selectedFoodToEdit]);

  const handleOpenModalEditFood = useCallback(
    (foodIndex: number) => {
      const selectedFood = foodsByMeal[foodIndex];

      if (!selectedFood) return;

      setSelectedFoodToEdit({
        id: selectedFood.id,
        measure: selectedFood.measure,
        qty: selectedFood.qty,
        mealFoodIndex: foodIndex,
      });
      toggleModalEditFoodOpen();
    },
    [foodsByMeal]
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

  return {
    modalAddFoodIsOpen,
    modalRemoveFoodIsOpen,
    foodsByMeal,
    modalEditFoodIsOpen,
    selectedFoodToEdit,
    generateHashKey,
    handleCloseModalEditFood,
    handleOpenModalEditFood,
    toggleModalAddFoodOpen,
    handleOpenModalRemoveFood,
    handleCloseModalRemoveFood,
    handleRemoveMealFood,
    register,
  };
}
