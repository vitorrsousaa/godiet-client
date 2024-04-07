import React from 'react';

import { useUpdateFavoritesObservation } from '@godiet-hooks/favoritesObservation';

import toast from 'react-hot-toast';

import {
  TCreateFavoriteObservationDTO,
  useFavoriteObservationFormController,
} from '../../FavoriteObservationForm';

import { EditFavoriteObservationModalProps } from './edit-favorite-observation-modal';

export function useEditFavoriteObservationModalHook(
  props: EditFavoriteObservationModalProps
) {
  const { initialValues, onClose } = props;

  const controller = useFavoriteObservationFormController();

  const { isUpdatingFavoritesObservation, updateFavoritesObservation } =
    useUpdateFavoritesObservation();

  const handleCloseModal = React.useCallback(() => {
    controller.reset();
    onClose();
  }, [controller, onClose]);

  const handleSubmit = React.useCallback(
    async (data: TCreateFavoriteObservationDTO) => {
      if (!initialValues) return;

      try {
        await updateFavoritesObservation({
          id: initialValues.id,
          text: data.text,
          title: data.title,
        });

        toast.success('Observação editada com sucesso');
      } catch {
        toast.error('Erro ao editar observação favorita');
      } finally {
        handleCloseModal();
      }
    },
    [handleCloseModal, initialValues, updateFavoritesObservation]
  );

  return {
    controller,
    isUpdatingFavoritesObservation,
    handleCloseModal,
    handleSubmit,
  };
}
