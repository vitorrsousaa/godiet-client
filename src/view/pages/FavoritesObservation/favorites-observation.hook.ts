import React from 'react';

import { TFavoritesObservation } from '@godiet-entities';
import {
  useDeleteFavoritesObservation,
  useGetAllFavoritesObservation,
} from '@godiet-hooks/favoritesObservation';
import { ReturnHookPage } from '@godiet-utils/types';

import toast from 'react-hot-toast';

/**
 * Define o formato de saída do hook `useFavoritesObservationHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useFavoritesObservationHook`.
 *
 * @interface FavoritesObservationHookProps
 */
interface FavoritesObservationHookProps {
  isFetchingFavoritesObservation: boolean;
  modalDeleteFavoriteIsOpen: boolean;
  modalCreateFavoriteIsOpen: boolean;
  favoritesObservations: TFavoritesObservation[];
  isDeletingFavoritesObservation: boolean;
  toggleModalCreateFavorite: () => void;
  toggleModalToDeleteFavoriteObservation: (id: string | null) => void;
  handleDeleteFavoriteObservation: () => Promise<void>;
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
  const [modalDeleteFavoriteIsOpen, toggleModalDeleteFavorite] =
    React.useReducer((state) => !state, false);

  const [favoriteObservationToDelete, setFavoriteObservationToDelete] =
    React.useState<null | string>(null);

  const {
    favoritesObservations,
    isErrorFavoritesObservation,
    isLoadingFavoritesObservation,
    isFetchingFavoritesObservation,
  } = useGetAllFavoritesObservation();

  const { isDeletingFavoritesObservation, deleteFavoritesObservation } =
    useDeleteFavoritesObservation();

  const toggleModalToDeleteFavoriteObservation = React.useCallback(
    (id: string | null) => {
      setFavoriteObservationToDelete(id);
      toggleModalDeleteFavorite();
    },
    []
  );

  const handleDeleteFavoriteObservation = React.useCallback(async () => {
    if (!favoriteObservationToDelete) return;

    try {
      await deleteFavoritesObservation({
        favoriteObservationId: favoriteObservationToDelete,
      });

      toast.success('Observação favorita deletada com sucesso');
    } catch {
      toast.error('Erro ao deletar observação favorita');
    } finally {
      toggleModalToDeleteFavoriteObservation(null);
    }
  }, [
    deleteFavoritesObservation,
    favoriteObservationToDelete,
    toggleModalToDeleteFavoriteObservation,
  ]);

  return {
    isFetchingFavoritesObservation,
    modalCreateFavoriteIsOpen,
    modalDeleteFavoriteIsOpen,
    favoritesObservations,
    isDeletingFavoritesObservation,
    toggleModalCreateFavorite,
    toggleModalToDeleteFavoriteObservation,
    handleDeleteFavoriteObservation,
    pageStatus: {
      isLoading: isLoadingFavoritesObservation,
      isError: isErrorFavoritesObservation,
      noData: favoritesObservations.length === 0,
    },
  };
}
