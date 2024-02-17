import { useCallback, useMemo, useReducer, useState } from 'react';

import {
  useDeleteAnamnesis,
  useGetAllAnamnesis,
} from '@godiet-hooks/anamnesis';
import { usePatient } from '@godiet-hooks/patient';

import toast from 'react-hot-toast';

export function useAnamnesisHook() {
  const { patient, isFetchingPatient } = usePatient();

  const { anamnesis, isFetchingAnamnesis, isErrorAnamnesis } =
    useGetAllAnamnesis(patient?.id);

  const { deleteAnamnesis, isDeletingAnamnesis } = useDeleteAnamnesis();

  const [anamnesisToDelete, setAnamnesisToDelete] = useState<string | null>(
    null
  );
  const [anamnesisToEdit, setAnamnesisToEdit] = useState<string | null>(null);

  const [modalSelectAnamnesisIsOpen, toggleModalSelectAnamnesis] = useReducer(
    (state) => !state,
    false
  );

  const [modalDeleteAnamnesisIsOpen, toggleModalDeleteAnamnesis] = useReducer(
    (state) => !state,
    false
  );
  const [modalEditAnamnesisIsOpen, toggleModalEditAnamnesis] = useReducer(
    (state) => !state,
    false
  );

  const handleOpenModalEditAnamnesis = useCallback(
    (anamnesisId: string | null) => {
      setAnamnesisToEdit(anamnesisId);
      toggleModalEditAnamnesis();
    },
    []
  );

  const handleOpenModalDeleteAnamnesis = useCallback(
    (anamnesisId: string | null) => {
      setAnamnesisToDelete(anamnesisId);
      toggleModalDeleteAnamnesis();
    },
    []
  );

  const handleDeleteAnamnesis = useCallback(async () => {
    if (!patient?.id || !anamnesisToDelete) return;

    try {
      await deleteAnamnesis({
        anamnesisId: anamnesisToDelete,
        patientId: patient?.id,
      });

      toast.success('Anamnese deletada com sucesso');
    } catch {
      toast.error('Erro ao deletar anamnese');
    } finally {
      toggleModalDeleteAnamnesis();
    }
  }, [anamnesisToDelete, deleteAnamnesis, patient?.id]);

  const isFetching = useMemo(
    () => isFetchingPatient || isFetchingAnamnesis,
    [isFetchingAnamnesis, isFetchingPatient]
  );

  return {
    isFetching,
    isErrorAnamnesis,
    patient,
    anamnesis,
    modalDeleteAnamnesisIsOpen,
    modalSelectAnamnesisIsOpen,
    isDeletingAnamnesis,
    anamnesisToEdit,
    modalEditAnamnesisIsOpen,
    handleOpenModalEditAnamnesis,
    toggleModalSelectAnamnesis,
    handleOpenModalDeleteAnamnesis,
    handleDeleteAnamnesis,
  };
}
