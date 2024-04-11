import { useState } from 'react';
import React from 'react';

import { usePatient } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';
import { ReturnHookPage } from '@godiet-utils/types';

/**
 * Define o formato de saída do hook `useEnergyCalculationHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useEnergyCalculationHook`.
 *
 * @interface EnergyCalculationHookProps
 */
interface EnergyCalculationHookProps {
  state: number;
  handleNavigateToCreatePage: () => void;
}
/**
 * Adiciona na tipagem do retorno do hook algumas tipagens obrigatórias.
 */
export type EnergyCalculationHookOutput =
  ReturnHookPage<EnergyCalculationHookProps>;

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function useEnergyCalculationHook(): EnergyCalculationHookOutput {
  const { navigate } = useNavigate();

  const { patient } = usePatient();
  const [state] = useState(0);

  const handleNavigateToCreatePage = React.useCallback(() => {
    if (!patient) return;

    navigate('CREATE_ENERGY_CALCULATION', {
      replace: {
        id: patient.id,
      },
    });
  }, [navigate, patient]);

  return {
    state,
    handleNavigateToCreatePage,
    pageStatus: {
      isLoading: false,
      isError: false,
      noData: true,
    },
  };
}
