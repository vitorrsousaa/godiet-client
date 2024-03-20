import { useCallback } from 'react';

import { useCreateAnamnesisTemplate } from '@godiet-hooks/anamnesisTemplate';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { ModalCreateAnamnesisTemplateProps } from './ModalCreateAnamnesisTemplate';

const schema = z.object({
  title: z.string().nonempty('O título é obrigatório'),
  text: z.string().nonempty('O texto é obrigatório'),
});

type FormValues = z.infer<typeof schema>;

export function useModalCreateAnamnesisTemplateHook(
  props: ModalCreateAnamnesisTemplateProps
) {
  const { isOpen, initialAnamnesis, onClose } = props;

  const { createAnamnesisTemplate, isCreatingAnamnesisTemplate } =
    useCreateAnamnesisTemplate();

  const {
    formState: { errors },
    register,
    setError,
    getValues,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialAnamnesis?.title || '',
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
        await createAnamnesisTemplate({
          text: text,
          title: data.title,
        });

        onClose();

        toast.success('Anamnese criada com sucesso');
      } catch (error) {
        toast.error('Erro ao criar anamnese');
      }
    },
    [createAnamnesisTemplate, getValues, onClose, setError]
  );

  const handleCloseModal = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return {
    isOpen,
    errors,
    isCreatingAnamnesisTemplate,
    register,
    handleCloseModal,
    handleSubmit,
  };
}
