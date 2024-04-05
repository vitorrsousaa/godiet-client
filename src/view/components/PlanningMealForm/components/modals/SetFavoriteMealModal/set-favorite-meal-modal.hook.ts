import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { useGetAllFavoriteMeal } from '@godiet-hooks/favoriteMeal';

import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SetFavoriteMealModalProps } from './set-favorite-meal-modal';

export function useSetFavoriteMealModalHook(props: SetFavoriteMealModalProps) {
  const { mealIndex, onClose } = props;

  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = React.useState<
    undefined | string
  >(undefined);

  const {
    favoriteMeals: favorites,
    isErrorFavoriteMeal,
    isFetchingFavoriteMeal,
  } = useGetAllFavoriteMeal();

  const { control } = useFormContext<TCreatePlanningMealDTO>();
  const { append } = useFieldArray({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const favoritesMeals = React.useMemo(
    () =>
      favorites.map((favorite) => {
        const { mealFoods } = favorite;

        const totalEnergy = mealFoods.reduce((acc, mealFood) => {
          const energyAttribute = mealFood.food.attributes.find(
            (attribute) => attribute.name === 'energy'
          );

          if (!energyAttribute) {
            return acc;
          }

          return acc + energyAttribute.qty;
        }, 0);

        const totalProt = mealFoods.reduce((acc, mealFood) => {
          const protAttribute = mealFood.food.attributes.find(
            (attribute) => attribute.name === 'protein'
          );

          if (!protAttribute) {
            return acc;
          }

          return acc + protAttribute.qty;
        }, 0);

        const totalCarb = mealFoods.reduce((acc, mealFood) => {
          const carbAttribute = mealFood.food.attributes.find(
            (attribute) => attribute.name === 'carbohydrate'
          );

          if (!carbAttribute) {
            return acc;
          }

          return acc + carbAttribute.qty;
        }, 0);

        return {
          name: favorite.name,
          id: favorite.id,
          energy: Math.floor(totalEnergy),
          prot: Math.floor(totalProt),
          carb: Math.floor(totalCarb),
        };
      }),
    [favorites]
  );

  const isValid = React.useMemo(
    () => Boolean(selectedFavoriteMeal && selectedFavoriteMeal.length > 0),
    [selectedFavoriteMeal]
  );

  const selectedFavoriteMealToDisplay = React.useMemo(() => {
    const toDisplay = favoritesMeals.find(
      (meal) => meal.id === selectedFavoriteMeal
    );

    if (toDisplay) {
      return `${toDisplay.name} - ${toDisplay.energy} kcal`;
    }

    return null;
  }, [favoritesMeals, selectedFavoriteMeal]);

  const handleCloseModal = React.useCallback(() => {
    onClose();
    setSelectedFavoriteMeal(undefined);
  }, [onClose]);

  const handleSubmit = React.useCallback(() => {
    const selectedFavorite = favorites.find(
      (favorite) => favorite.id === selectedFavoriteMeal
    );

    if (!selectedFavorite) return;

    const mealFoodsReadyToAdd = selectedFavorite.mealFoods.map((mealFood) => ({
      foodId: mealFood.food.id,
      measure: mealFood.measure,
      name: mealFood.name,
      qty: mealFood.qty,
    }));

    append(mealFoodsReadyToAdd);
    toast.success('Alimentos adicionados!');
    handleCloseModal();
  }, [append, favorites, handleCloseModal, selectedFavoriteMeal]);

  return {
    selectedFavoriteMeal,
    isErrorFavoriteMeal,
    isFetchingFavoriteMeal,
    favoritesMeals,
    isValid,
    selectedFavoriteMealToDisplay,
    handleCloseModal,
    handleSubmit,
    setSelectedFavoriteMeal,
  };
}
