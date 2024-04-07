import React from 'react';

import { useGetAllFavoritesObservation } from '@godiet-hooks/favoritesObservation';
import { ReturnHookPage } from '@godiet-utils/types';

/**
 * Define o formato de saída do hook `useFavoritesObservationHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useFavoritesObservationHook`.
 *
 * @interface FavoritesObservationHookProps
 */
interface FavoritesObservationHookProps {
  isFetchingFavoritesObservation: boolean;
  modalCreateFavoriteIsOpen: boolean;
  toggleModalCreateFavorite: () => void;
}
/**
 * Adiciona na tipagem do retorno do hook algumas tipagens obrigatórias.
 */
export type FavoritesObservationHookOutput =
  ReturnHookPage<FavoritesObservationHookProps>;

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function useFavoritesObservationHook(): FavoritesObservationHookOutput {
  const [modalCreateFavoriteIsOpen, toggleModalCreateFavorite] =
    React.useReducer((state) => !state, false);

  const {
    favoritesObservations,
    isErrorFavoritesObservation,
    isLoadingFavoritesObservation,
    isFetchingFavoritesObservation,
  } = useGetAllFavoritesObservation();

  console.log(favoritesObservations);

  return {
    isFetchingFavoritesObservation,
    modalCreateFavoriteIsOpen,
    toggleModalCreateFavorite,
    pageStatus: {
      isLoading: isLoadingFavoritesObservation,
      isError: isErrorFavoritesObservation,
      noData: favoritesObservations.length === 0,
    },
  };
}
