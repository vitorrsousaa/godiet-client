import React from 'react';

import { useGetAllFavoritesObservation } from '@godiet-hooks/favoritesObservation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { SetObservationMealProps } from './set-observation-meal';

const ObservationSchema = z.object({
  id: z.string().uuid(),
  text: z.string().min(1),
});

type TObservationTemplateDTO = z.infer<typeof ObservationSchema>;

export function useSetObservationMealHook(props: SetObservationMealProps) {
  const { onClose } = props;

  const {
    favoritesObservations,
    isErrorFavoritesObservation,
    isFetchingFavoritesObservation,
  } = useGetAllFavoritesObservation();

  const {
    handleSubmit: hookFormSubmit,
    getValues,
    setValue,
    control: internalControl,
  } = useForm<TObservationTemplateDTO>({
    resolver: zodResolver(ObservationSchema),
    defaultValues: {
      text: '',
      id: '',
    },
  });

  const handleAppendText = React.useCallback(
    (observationId: string) => {
      const observation = favoritesObservations.find(
        (observation) => observation.id === observationId
      );

      if (!observation) return;

      const originialTextObservation = getValues('text');

      setValue('text', `${originialTextObservation} ${observation.text}`);
    },
    [favoritesObservations, getValues, setValue]
  );

  const favoritesObservationsOptions = React.useMemo(() => {
    return favoritesObservations.map((observation) => ({
      label: observation.title,
      value: observation.id,
    }));
  }, [favoritesObservations]);

  const handleSubmit = hookFormSubmit(async (data: TObservationTemplateDTO) => {
    console.log(data);
  });

  return {
    favoritesObservationsOptions,
    internalControl,
    isErrorFavoritesObservation,
    isFetchingFavoritesObservation,
    handleSubmit,
    handleAppendText,
    onClose,
  };
}
