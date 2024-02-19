import { useCallback, useMemo, useState } from 'react';

import { TAnamnesisTemplate } from '@godiet-entities';
import { useGetAllAnamnesisTemplate } from '@godiet-hooks/anamnesisTemplate';
import { useNavigate } from '@godiet-hooks/routes';

import { ModalSelecteCreateAnamnesisProps } from './ModalSelectCreateAnamnesis';

export function useModalCreateAnamnesisHook(
  props: ModalSelecteCreateAnamnesisProps
) {
  const { patientId } = props;
  const { navigate } = useNavigate();

  const { anamnesisTemplate, isFetchingAnamnesisTemplate } =
    useGetAllAnamnesisTemplate();

  const [selectedAnamneseTemplate, setSelectedAnamneseTemplate] =
    useState<TAnamnesisTemplate | null>(null);

  const handleChangeAnamnesis = useCallback(
    (event: string) => {
      if (event === '') {
        setSelectedAnamneseTemplate(null);
        return;
      }

      if (event === 'empty') {
        setSelectedAnamneseTemplate({
          id: '',
          title: '',
          text: '',
          userId: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        return;
      }

      const selected = anamnesisTemplate.find(
        (anamnese) => anamnese.id === event
      );
      if (selected) {
        setSelectedAnamneseTemplate(selected);
      }
    },
    [anamnesisTemplate]
  );

  const handleCreateAnamnese = useCallback(() => {
    navigate('CREATE_ANAMNESIS', {
      state: {
        template: selectedAnamneseTemplate,
        patientId,
      },
      replace: {
        id: patientId,
      },
    });
  }, [navigate, patientId, selectedAnamneseTemplate]);

  const anamnesisOptions = useMemo(() => {
    const emptyOption = [
      { value: 'empty', label: 'Nova anamnese em branco (goDiet)' },
    ];

    return [
      ...emptyOption,
      ...anamnesisTemplate.map((anamnese) => ({
        label: anamnese.title,
        value: anamnese.id,
      })),
    ];
  }, [anamnesisTemplate]);

  const formIsValid = useMemo(
    () => Boolean(selectedAnamneseTemplate),
    [selectedAnamneseTemplate]
  );

  return {
    isFetchingAnamnesisTemplate,
    anamnesisOptions,
    formIsValid,
    handleChangeAnamnesis,
    handleCreateAnamnese,
  };
}
