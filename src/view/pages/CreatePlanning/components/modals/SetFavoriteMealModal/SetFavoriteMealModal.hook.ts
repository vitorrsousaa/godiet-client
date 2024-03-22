import { useCallback, useMemo, useState } from 'react';

import { useGetAllFavoriteMeal } from '@godiet-hooks/favoriteMeal';
import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SetFavoriteMealModalProps } from './SetFavoriteMealModal';

export function useSetFavoriteMealModalHook(props: SetFavoriteMealModalProps) {
  const { mealIndex, onClose } = props;

  //states
  const [selectedFavoriteMeal, setSelectedFavoriteMeal] = useState<
    undefined | string
  >(undefined);
  //states

  //custom hooks
  const {
    favoriteMeals: favorites,
    isErrorFavoriteMeal,
    isFetchingFavoriteMeal,
  } = useGetAllFavoriteMeal();
  //custom hooks

  //external hooks
  const { control } = useFormContext<TCreatePlanningMealDTO>();
  const { append } = useFieldArray({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });
  //external hooks

  //memos
  const favoritesMeals = useMemo(
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

  const isValid = useMemo(
    () => Boolean(selectedFavoriteMeal && selectedFavoriteMeal.length > 0),
    [selectedFavoriteMeal]
  );

  const selectedFavoriteMealToDisplay = useMemo(() => {
    const toDisplay = favoritesMeals.find(
      (meal) => meal.id === selectedFavoriteMeal
    );

    if (toDisplay) {
      return `${toDisplay.name} - ${toDisplay.energy} kcal`;
    }

    return null;
  }, [favoritesMeals, selectedFavoriteMeal]);

  //memos

  //callbacks
  const handleCloseModal = useCallback(() => {
    onClose();
    setSelectedFavoriteMeal(undefined);
  }, [onClose]);

  const handleSubmit = useCallback(() => {
    const selectedFavorite = favorites.find(
      (favorite) => favorite.id === selectedFavoriteMeal
    );

    if (!selectedFavorite) return;

    const mealFoodsReadyToAdd = selectedFavorite.mealFoods.map((mealFood) => ({
      id: mealFood.food.id,
      measure: mealFood.measure,
      name: mealFood.food.name,
      qty: mealFood.qty,
    }));

    append(mealFoodsReadyToAdd);
    toast.success('Alimentos adicionados com sucesso');
    handleCloseModal();
  }, [append, favorites, handleCloseModal, selectedFavoriteMeal]);

  //callbacks

  return {
    selectedFavoriteMeal,
    isErrorFavoriteMeal,
    isFetchingFavoriteMeal,
    favoritesMeals,
    isValid,
    selectedFavoriteMealToDisplay,
    handleCloseModal,
    setSelectedFavoriteMeal,
    handleSubmit,
  };
}
