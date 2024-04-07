import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FavoriteObservationFormProps } from './favorite-observation-form';
import { castToInternalUse } from './favorite-observation-form.controller';

const schema = z.object({
  title: z.string().nonempty('O nome é obrigatório'),
  text: z.string().nonempty('O texto é obrigatório'),
});

export type TCreateFavoriteObservationDTO = z.infer<typeof schema>;

export function useFavoriteObservationFormHook(
  props: FavoriteObservationFormProps
) {
  const { controller, onSubmit } = props;

  const {
    control,
    reset,
    handleSubmit: hookFormSubmit,
  } = useForm<TCreateFavoriteObservationDTO>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    await onSubmit(data);
  });

  React.useEffect(() => {
    if (controller) {
      castToInternalUse(controller)._refs.resetRef.current = reset;
    }
  }, [controller, reset]);

  return {
    control,
    handleSubmit,
  };
}
