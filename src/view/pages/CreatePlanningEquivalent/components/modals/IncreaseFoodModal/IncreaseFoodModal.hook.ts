/* eslint-disable indent */
import { useCallback, useEffect, useMemo, useState } from 'react';

import { TFood } from '@godiet-entities';
import { useGetAllFoodByCategories } from '@godiet-hooks/foods';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanningEquivalent/CreatePlanningEquivalent.hook';

import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { IncreaseFoodModalProps } from './IncreaseFoodModal';

export function useIncreaseFoodModalHook(props: IncreaseFoodModalProps) {
  const {
    selectedCategories: propCategories,
    isOpen,
    mealIndex,
    onClose,
  } = props;

  const [foodsSelected, setFoodsSelected] = useState<Record<string, TFood[]>>(
    {}
  );

  const {
    isErrorFoodsByCategories,
    isFetchingFoodsByCategories,
    foodsByCategories,
  } = useGetAllFoodByCategories({
    data: propCategories
      ? propCategories.categories.map((category) => ({
          categoryId: category.id,
          portion: category.qty,
        }))
      : [],
  });

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { fields, remove, update } = useFieldArray({
    control,
    name: `meals.${mealIndex}.foods`,
  });

  const handleAddFoods = useCallback(
    (mealIndex: number) => {
      Object.keys(foodsSelected).forEach((categoryId) => {
        if (foodsSelected[categoryId].length === 0) {
          // Se não tiver alimentos selecionados, remover do array
          remove(fields.findIndex((field) => field.categoryId === categoryId));
          return;
        }

        const newFoods: { baseQty: number; foodId: string }[] = [];

        foodsSelected[categoryId].forEach((food) => {
          newFoods.push({
            foodId: food.id,
            baseQty: food.baseQty,
          });
        });

        update(mealIndex, {
          categoryId: categoryId,
          portion:
            propCategories.categories.find(
              (category) => category.id === categoryId
            )?.qty || 0,
          options: newFoods,
          id: categoryId,
        });
      });

      onClose();
    },
    [fields, foodsSelected, onClose, propCategories, remove, update]
  );

  const handleFoodsSelected = useCallback(
    (foods: TFood[], categoryId: string) => {
      setFoodsSelected((prev) => ({
        ...prev,
        [categoryId]: foods,
      }));
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    onClose();
  }, [onClose]);

  const optionsFoods = useMemo(() => {
    const defaultOption = {
      name: 'Selecione um alimento',
      baseQty: 0,
      baseUnit: 'g',
    };

    const newFoodSelected: Record<
      string,
      { name: string; baseQty: number; baseUnit: string }[]
    > = {};

    Object.entries(foodsSelected).forEach(([categoryId, foods]) => {
      const initialItems = foods.map((food) => ({
        name: food.name,
        baseQty: Math.round(food.baseQty),
        baseUnit: food.baseUnit,
      }));

      const newItems = initialItems.slice(0, 3);

      while (newItems.length < 3) {
        newItems.push(defaultOption);
      }

      newFoodSelected[categoryId] = newItems;
    });

    return newFoodSelected;
  }, [foodsSelected]);

  const hasOptionsFood = useMemo<Record<string, boolean>>(() => {
    return Object.keys(optionsFoods).reduce((acc, categoryId) => {
      return {
        ...acc,
        [categoryId]: optionsFoods[categoryId].length > 0,
      };
    }, {});
  }, [optionsFoods]);

  const hasMoreFoodsSelected = useMemo<Record<string, boolean>>(() => {
    return Object.keys(foodsSelected).reduce((acc, categoryId) => {
      return {
        ...acc,
        [categoryId]: foodsSelected[categoryId].length > 3,
      };
    }, {});
  }, [foodsSelected]);

  const selectedFoodIsValid = useMemo(() => {
    return Object.values(foodsSelected).some(
      (foods) => foods.length > 0 && foods.length <= 3
    );
  }, [foodsSelected]);

  useEffect(() => {
    if (isErrorFoodsByCategories && isOpen) {
      toast.error('Tivemos um erro para encontrar os alimentos');
    }
  }, [isErrorFoodsByCategories, isOpen]);

  return {
    isFetchingFoodsByCategories: isFetchingFoodsByCategories,
    foodsByCategories,
    optionsFoods,
    hasOptionsFood,
    selectedFoodIsValid,
    hasMoreFoodsSelected,
    handleAddFoods,
    handleFoodsSelected,
    handleCloseModal,
  };
}
