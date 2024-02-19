import { useCallback, useEffect, useMemo } from 'react';

import {
  useGetAllAnamnesis,
  useUpdateAnamnesis,
} from '@godiet-hooks/anamnesis';
import { usePatient } from '@godiet-hooks/patient';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { ModalEditAnamnesisProps } from './ModalEditAnamnesis';

const schema = z.object({
  title: z.string().nonempty('O título é obrigatório'),
  text: z.string().nonempty('O texto é obrigatório'),
});

type FormValues = z.infer<typeof schema>;

export function useModalEditAnamnesisHook(props: ModalEditAnamnesisProps) {
  const { isOpen, onClose, anamnesisId } = props;

  const { isUpdatingAnamnesis, updateAnamnesis } = useUpdateAnamnesis();

  const { patient } = usePatient();

  const { anamnesis } = useGetAllAnamnesis(patient?.id);

  const {
    formState: { errors },
    register,
    setError,
    getValues,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: anamnesisId
        ? anamnesis.find((a) => a.id === anamnesisId)?.title
        : '',
      text: '',
    },
  });

  const handleSubmit = useCallback(
    async (text: string) => {
      const data = getValues();

      if (data.title === '') {
        setError('title', {
          type: 'manual',
          message: 'O título é obrigatório',
        });

        return;
      }

      try {
        await updateAnamnesis({
          text,
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
    [anamnesisId, getValues, onClose, patient?.id, setError, updateAnamnesis]
  );

  const initialText = useMemo(() => {
    return anamnesisId ? anamnesis.find((a) => a.id === anamnesisId)?.text : '';
  }, [anamnesis, anamnesisId]);

  useEffect(() => {
    if (anamnesisId) {
      const correctTitle = anamnesis.find((a) => a.id === anamnesisId)?.title;

      setValue('title', correctTitle || '');
    }
  }, [anamnesis, anamnesisId, setValue]);

  return {
    isOpen,
    errors,
    isUpdatingAnamnesis,
    initialText,
    register,
    onClose,
    handleSubmit,
  };
}
