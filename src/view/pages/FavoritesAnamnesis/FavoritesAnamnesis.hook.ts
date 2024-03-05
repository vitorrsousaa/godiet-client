import { useCallback, useReducer, useState } from 'react';

import {
  useDeleteAnamnesisTemplate,
  useGetAllAnamnesisTemplate,
} from '@godiet-hooks/anamnesisTemplate';

import toast from 'react-hot-toast';

export function useFavoritesAnamnesisHook() {
  const [anamnesisToDelete, setAnamnesisToDelete] = useState('');

  const {
    anamnesisTemplate,

    isErrorAnamnesisTemplate,

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

  return {
    modalCreateAnamnesisTemplateIsOpen,

    anamnesisTemplate,

    isErrorAnamnesisTemplate,

    isFetchingAnamnesisTemplate,

    modalDeleteAnamnesisTemplateIsOpen,

    isDeletingAnamnesisTemplate,

    toggleModalDeleteAnamnesisTemplate,

    toggleModalCreateAnamnesisTemplate,

    handleOpenModalDeleteAnamnesisTemplate,

    handleDeleteAnamnesisTemplate,
  };
}
