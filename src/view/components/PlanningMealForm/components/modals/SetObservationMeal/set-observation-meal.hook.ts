import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { useGetAllFavoritesObservation } from '@godiet-hooks/favoritesObservation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormContext } from 'react-hook-form';
import * as z from 'zod';

import { SetObservationMealProps } from './set-observation-meal';

const ObservationSchema = z.object({
  id: z.string().optional(),
  text: z.string().min(1, 'A observação deve ter pelo menos 1 caracter.'),
});

type TObservationTemplateDTO = z.infer<typeof ObservationSchema>;

export function useSetObservationMealHook(props: SetObservationMealProps) {
  const { mealIndex, initialObservation, onClose } = props;

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
      text: initialObservation || '',
      id: '',
    },
  });

  const { setValue: externalSetValue } =
    useFormContext<TCreatePlanningMealDTO>();

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
    externalSetValue(`meals.${mealIndex}.observation`, data.text);
    onClose();
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
