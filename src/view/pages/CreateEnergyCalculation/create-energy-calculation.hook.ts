import React from 'react';

import { ReturnHookPage } from '@godiet-utils/types';

import { TCreateEnergyCalculationDTO } from './components/EnergyCalculationForm';

/**
 * Define o formato de saída do hook `useCreateEnergyCalculationHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useCreateEnergyCalculationHook`.
 *
 * @interface CreateEnergyCalculationHookProps
 */
interface CreateEnergyCalculationHookProps {
  handleSubmit: (data: TCreateEnergyCalculationDTO) => Promise<void>;
}
/**
 * Adiciona na tipagem do retorno do hook algumas tipagens obrigatórias.
 */
export type CreateEnergyCalculationHookOutput =
  ReturnHookPage<CreateEnergyCalculationHookProps>;

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function useCreateEnergyCalculationHook(): CreateEnergyCalculationHookOutput {
  const handleSubmit = React.useCallback(
    async (data: TCreateEnergyCalculationDTO) => {
      console.log(data);
    },
    []
  );

  return {
    handleSubmit,
    pageStatus: {
      isLoading: false,
      isError: false,
      noData: false,
    },
  };
}
