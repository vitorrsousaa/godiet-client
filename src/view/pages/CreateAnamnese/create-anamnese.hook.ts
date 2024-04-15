import { useState } from 'react';

import { ReturnHookPage } from '@godiet-utils/types';

/**
 * Define o formato de saída do hook `useCreateAnamneseHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useCreateAnamneseHook`.
 *
 * @interface CreateAnamneseHookProps
 */
interface CreateAnamneseHookProps {
  state: number;
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
  const [state] = useState(0);

  return {
    state,
    pageStatus: {
      isLoading: false,
      isError: false,
      noData: true,
    },
  };
}
