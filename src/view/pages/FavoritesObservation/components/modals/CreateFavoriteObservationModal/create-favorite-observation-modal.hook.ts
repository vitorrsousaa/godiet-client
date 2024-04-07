import React from 'react';

import { useCreateFavoritesObservation } from '@godiet-hooks/favoritesObservation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { CreateFavoriteObservationModalProps } from './create-favorite-observation-modal';

const schema = z.object({
  title: z.string().nonempty('O nome é obrigatório'),
  text: z.string().nonempty('O texto é obrigatório'),
});

type FormValues = z.infer<typeof schema>;

export function useCreateFavoriteObservationModalHook(
  props: CreateFavoriteObservationModalProps
) {
  const { onClose } = props;

  const {
    formState: { isValid },
    control,
    reset,
    handleSubmit: hookFormSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const { createFavoritesObservation, isCreatingFavoritesObservation } =
    useCreateFavoritesObservation();

  const handleCloseModal = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const handleSubmit = hookFormSubmit(async (data: FormValues) => {
    try {
      await createFavoritesObservation({ text: data.text, title: data.title });
      toast.success('Observação criada com sucesso');
    } catch {
      toast.error('Erro ao criar observação favorita');
    } finally {
      handleCloseModal();
    }
  });

  return {
    control,
    isValid,
    isCreatingFavoritesObservation,
    handleSubmit,
    handleCloseModal,
  };
}
