import { useCallback, useMemo, useReducer, useState } from 'react';

import {
  useDeleteFavoriteMeal,
  useGetAllFavoriteMeal,
} from '@godiet-hooks/favoriteMeal';

interface TFavoriteMealRender {
  id: string;
  name: string;
  energy: number;
}

export function useFavoritesMealsHook() {
  const [modalCreateFavoriteMealIsOpen, toggleModalCreateFavoriteMeal] =
    useReducer((state) => !state, false);

  const [modalDeleteFavoriteMealIsOpen, toggleModalDeleteFavoriteMeal] =
    useReducer((state) => !state, false);

  const [selectedFavoriteMealToDelete, setSelectedFavoriteMealToDelete] =
    useState<null | string>(null);

  const {
    favoriteMeals: favorites,
    isErrorFavoriteMeal,
    isFetchingFavoriteMeal,
    isLoadingFavoriteMeal,
  } = useGetAllFavoriteMeal();

  const { deleteFavoriteMeal, isDeletingFavoriteMeal } =
    useDeleteFavoriteMeal();

  const handleDeleteFavoriteMeal = useCallback(() => {
    if (!selectedFavoriteMealToDelete) return;

    deleteFavoriteMeal({
      favoriteMealId: selectedFavoriteMealToDelete,
    });

    setSelectedFavoriteMealToDelete(null);
    toggleModalDeleteFavoriteMeal();
  }, [deleteFavoriteMeal, selectedFavoriteMealToDelete]);

  const handleOpenModalToDeleteFavoriteMeal = useCallback(
    (favoriteMealId: string) => {
      setSelectedFavoriteMealToDelete(favoriteMealId);
      toggleModalDeleteFavoriteMeal();
    },
    []
  );

  const handleCloseModalToDeleteFavoriteMeal = useCallback(() => {
    setSelectedFavoriteMealToDelete(null);
    toggleModalDeleteFavoriteMeal();
  }, []);

  const favoritesMeals = useMemo<TFavoriteMealRender[]>(
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

        return {
          name: favorite.name,
          id: favorite.id,
          energy: Math.floor(totalEnergy),
        };
      }),
    [favorites]
  );

  const isCreatingFavoritesMeals = false;
  const isUpdatingFavoritesMeals = false;

  const isFetchingFavoritesMeals = useMemo(
    () =>
      Boolean(
        isDeletingFavoriteMeal ||
          isCreatingFavoritesMeals ||
          isUpdatingFavoritesMeals ||
          isFetchingFavoriteMeal
      ),
    [
      isCreatingFavoritesMeals,
      isDeletingFavoriteMeal,
      isFetchingFavoriteMeal,
      isUpdatingFavoritesMeals,
    ]
  );

  return {
    favoritesMeals,
    isLoadingFavoriteMeal,
    isFetchingFavoritesMeals,
    isErrorFavoriteMeal,
    modalCreateFavoriteMealIsOpen,
    modalDeleteFavoriteMealIsOpen,
    isDeletingFavoriteMeal,
    toggleModalCreateFavoriteMeal,
    handleOpenModalToDeleteFavoriteMeal,
    handleCloseModalToDeleteFavoriteMeal,
    handleDeleteFavoriteMeal,
  };
}
