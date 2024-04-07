import React from 'react';

import { useCreateFavoritesObservation } from '@godiet-hooks/favoritesObservation';

import toast from 'react-hot-toast';

import {
  TCreateFavoriteObservationDTO,
  useFavoriteObservationFormController,
} from '../../FavoriteObservationForm';

import { CreateFavoriteObservationModalProps } from './create-favorite-observation-modal';

export function useCreateFavoriteObservationModalHook(
  props: CreateFavoriteObservationModalProps
) {
  const { onClose } = props;

  const controller = useFavoriteObservationFormController();

  const { createFavoritesObservation, isCreatingFavoritesObservation } =
    useCreateFavoritesObservation();

  const handleCloseModal = React.useCallback(() => {
    controller.reset();
    onClose();
  }, [controller, onClose]);

  const handleSubmit = React.useCallback(
    async (data: TCreateFavoriteObservationDTO) => {
      try {
        await createFavoritesObservation({
          text: data.text,
          title: data.title,
        });
        toast.success('Observação criada com sucesso');
      } catch {
        toast.error('Erro ao criar observação favorita');
      } finally {
        handleCloseModal();
      }
    },
    [createFavoritesObservation, handleCloseModal]
  );
  return {
    controller,
    isCreatingFavoritesObservation,
    handleSubmit,
    handleCloseModal,
  };
}
