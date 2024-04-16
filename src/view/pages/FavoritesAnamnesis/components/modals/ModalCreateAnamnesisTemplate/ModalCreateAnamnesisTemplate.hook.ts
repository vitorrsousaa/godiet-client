import { useCallback, useMemo } from 'react';

import {
  defaultInitialValues,
  TCreateAnamnesisFormDTO,
} from '@godiet-components/AnamnesisForm';
import { useCreateAnamnesisTemplate } from '@godiet-hooks/anamnesisTemplate';

import toast from 'react-hot-toast';

import { ModalCreateAnamnesisTemplateProps } from './ModalCreateAnamnesisTemplate';

export function useModalCreateAnamnesisTemplateHook(
  props: ModalCreateAnamnesisTemplateProps
) {
  const { isOpen, initialAnamnesis, onClose } = props;

  const { createAnamnesisTemplate, isCreatingAnamnesisTemplate } =
    useCreateAnamnesisTemplate();

  const initialValues = useMemo<TCreateAnamnesisFormDTO>(() => {
    if (initialAnamnesis)
      return {
        title: initialAnamnesis.title,
        text: initialAnamnesis.text,
      };

    return defaultInitialValues;
  }, [initialAnamnesis]);

  const handleSubmit = useCallback(
    async (data: TCreateAnamnesisFormDTO) => {
      try {
        await createAnamnesisTemplate({
          text: data.text,
          title: data.title,
        });

        onClose();

        toast.success('Anamnese criada com sucesso');
      } catch (error) {
        toast.error('Erro ao criar anamnese');
      }
    },
    [createAnamnesisTemplate, onClose]
  );

  return {
    isOpen,
    initialValues,
    isCreatingAnamnesisTemplate,
    handleSubmit,
  };
}
