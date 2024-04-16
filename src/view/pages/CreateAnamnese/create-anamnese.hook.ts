import { useCallback, useMemo } from 'react';

import { TCreateAnamnesisFormDTO } from '@godiet-components/AnamnesisForm';
import { TAnamnesisTemplate } from '@godiet-entities';
import { useCreateAnamnesis } from '@godiet-hooks/anamnesis';
import { usePatient } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';
import { ReturnHookPage } from '@godiet-utils/types';

import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

/**
 * Define o formato de saída do hook `useCreateAnamneseHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useCreateAnamneseHook`.
 *
 * @interface CreateAnamneseHookProps
 */
interface CreateAnamneseHookProps {
  anamnesisTemplate: TAnamnesisTemplate | null;
  isCreatingAnamnesis: boolean;
  handleSubmit: (data: TCreateAnamnesisFormDTO) => Promise<void>;
  handleReturnPage: () => void;
}
/**
 * Adiciona na tipagem do retorno do hook algumas tipagens obrigatórias.
 */
export type CreateAnamneseHookOutput = ReturnHookPage<CreateAnamneseHookProps>;

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function useCreateAnamneseHook(): CreateAnamneseHookOutput {
  const location = useLocation();

  const { navigate } = useNavigate();
  const { createAnamnesis, isCreatingAnamnesis } = useCreateAnamnesis();

  const { patient } = usePatient();

  const anamnesisTemplate = useMemo<TAnamnesisTemplate | null>(() => {
    if (location.state?.template) {
      return location.state.template;
    }

    return null;
  }, [location.state?.template]);

  const handleSubmit = useCallback(
    async (data: TCreateAnamnesisFormDTO) => {
      await createAnamnesis({
        anamnesis: data,
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
    [createAnamnesis, navigate, patient?.id]
  );

  const handleReturnPage = useCallback(() => {
    navigate('ANAMNESIS', {
      replace: {
        id: patient?.id || '',
      },
    });
  }, [navigate, patient?.id]);

  return {
    anamnesisTemplate,
    isCreatingAnamnesis,
    handleSubmit,
    handleReturnPage,
    pageStatus: {
      isLoading: false,
      isError: false,
      noData: false,
    },
  };
}
