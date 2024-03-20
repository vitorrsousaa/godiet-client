import { useCallback, useReducer, useState } from 'react';

import { TAnamnesisTemplate } from '@godiet-entities';
import {
  useDeleteAnamnesisTemplate,
  useGetAllAnamnesisTemplate,
} from '@godiet-hooks/anamnesisTemplate';

import toast from 'react-hot-toast';

export function useFavoritesAnamnesisHook() {
  const [anamnesisToDelete, setAnamnesisToDelete] = useState('');
  const [anamnesisToEdit, setAnamnesisToEdit] =
    useState<TAnamnesisTemplate | null>(null);

  const {
    anamnesisTemplate,
    isErrorAnamnesisTemplate,
    isLoadingAnamnesisTemplate,
    isFetchingAnamnesisTemplate,
  } = useGetAllAnamnesisTemplate();

  const { deleteAnamnesisTemplate, isDeletingAnamnesisTemplate } =
    useDeleteAnamnesisTemplate();

  const [
    modalCreateAnamnesisTemplateIsOpen,
    toggleModalCreateAnamnesisTemplate,
  ] = useReducer((state) => !state, false);

  const [
    modalDeleteAnamnesisTemplateIsOpen,
    toggleModalDeleteAnamnesisTemplate,
  ] = useReducer((state) => !state, false);

  const handleOpenModalDeleteAnamnesisTemplate = useCallback((id: string) => {
    setAnamnesisToDelete(id);

    toggleModalDeleteAnamnesisTemplate();
  }, []);

  const handleDeleteAnamnesisTemplate = useCallback(async () => {
    if (anamnesisToDelete.length === 0)
      return toast.error('Erro ao deletar anamnese');

    try {
      await deleteAnamnesisTemplate(anamnesisToDelete);

      toggleModalDeleteAnamnesisTemplate();

      toast.success('Anamnese deletada com sucesso');
    } catch {
      toast.error('Erro ao deletar anamnese');
    }
  }, [anamnesisToDelete, deleteAnamnesisTemplate]);

  const handleOpenModalToEditAnamnesis = useCallback(
    (anamnesisId: string) => {
      setAnamnesisToEdit(
        anamnesisTemplate.find((anamnesis) => anamnesis.id === anamnesisId) ||
          null
      );

      toggleModalCreateAnamnesisTemplate();
    },
    [anamnesisTemplate]
  );

  const handleCloseModalToEditAnamnesis = useCallback(() => {
    setAnamnesisToEdit(null);

    toggleModalCreateAnamnesisTemplate();
  }, []);

  return {
    modalCreateAnamnesisTemplateIsOpen,

    anamnesisTemplate,
    anamnesisToEdit,
    isErrorAnamnesisTemplate,
    isLoadingAnamnesisTemplate,
    isFetchingAnamnesisTemplate,
    handleOpenModalToEditAnamnesis,
    modalDeleteAnamnesisTemplateIsOpen,

    isDeletingAnamnesisTemplate,
    handleCloseModalToEditAnamnesis,
    toggleModalDeleteAnamnesisTemplate,

    toggleModalCreateAnamnesisTemplate,

    handleOpenModalDeleteAnamnesisTemplate,

    handleDeleteAnamnesisTemplate,
  };
}
