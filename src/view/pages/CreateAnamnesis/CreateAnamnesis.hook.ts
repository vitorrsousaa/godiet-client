import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { TAnamnesisTemplate } from '@godiet-entities';
import { useCreateAnamnesis } from '@godiet-hooks/anamnesis';
// import { TAnamnesisCreateDTO } from '@godiet-entities/anamnesis/TAnamnesisCreateDTO';
// import { useCreateAnamnesis } from '@godiet-hooks/anamnesis';
import { usePatient } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';

import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export function useCreateAnamnesisHook() {
  const location = useLocation();
  const { navigate } = useNavigate();

  const { patient } = usePatient();

  const { createAnamnesis, isCreatingAnamnesis } = useCreateAnamnesis();

  const [title, setTitle] = useState('');

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const handleCreateAnamnesis = useCallback(
    async (text: string) => {
      const newAnamnesis = {
        text,
        title,
      };

      await createAnamnesis({
        anamnesis: newAnamnesis,
        patientId: patient?.id || '',
      });

      try {
        toast.success('Anamnese criada com sucesso');
      } catch {
        toast.error('Erro ao criar anamnese');
      } finally {
        navigate('ANAMNESIS', {
          replace: {
            id: patient?.id || '',
          },
        });
      }
    },
    [createAnamnesis, navigate, patient?.id, title]
  );

  const anamnesisTemplate = useMemo<TAnamnesisTemplate | null>(() => {
    if (location.state?.template) {
      return location.state.template;
    }

    return null;
  }, [location.state?.template]);

  const formIsValid = useMemo(() => Boolean(title.length > 0), [title]);

  return {
    anamnesisTemplate,
    title,
    formIsValid,
    isCreatingAnamnesis,
    handleChangeTitle,
    handleCreateAnamnesis,
  };
}
