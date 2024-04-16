import { useCallback, useMemo } from 'react';

import {
  defaultInitialValues,
  TCreateAnamnesisFormDTO,
} from '@godiet-components/AnamnesisForm';
import {
  useGetAllAnamnesis,
  useUpdateAnamnesis,
} from '@godiet-hooks/anamnesis';
import { usePatient } from '@godiet-hooks/patient';

import toast from 'react-hot-toast';

import { ModalEditAnamnesisProps } from './ModalEditAnamnesis';

export function useModalEditAnamnesisHook(props: ModalEditAnamnesisProps) {
  const { isOpen, onClose, anamnesisId } = props;

  const { isUpdatingAnamnesis, updateAnamnesis } = useUpdateAnamnesis();

  const { patient } = usePatient();

  const { anamnesis } = useGetAllAnamnesis(patient?.id);

  const initialValues = useMemo(() => {
    const originalAnamnesis = anamnesis.find((a) => a.id === anamnesisId);

    if (!originalAnamnesis) return defaultInitialValues;

    return {
      title: originalAnamnesis.title,
      text: originalAnamnesis.text,
    };
  }, [anamnesis, anamnesisId]);

  const handleSubmit = useCallback(
    async (data: TCreateAnamnesisFormDTO) => {
      try {
        await updateAnamnesis({
          text: data.text,
          title: data.title,
          patientId: patient?.id || '',
          id: anamnesisId || '',
        });

        onClose();

        toast.success('Anamnese editada com sucesso');
      } catch (error) {
        toast.error('Erro ao editar anamnese');
      }
    },
    [anamnesisId, onClose, patient?.id, updateAnamnesis]
  );

  return {
    initialValues,
    isOpen,
    isUpdatingAnamnesis,
    onClose,
    handleSubmit,
  };
}
