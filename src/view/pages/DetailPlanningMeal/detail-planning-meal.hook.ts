import React from 'react';

import { TPlanningMeal } from '@godiet-entities';
import { usePatient } from '@godiet-hooks/patient';
import { useGetByPlanningId } from '@godiet-hooks/planningMeal';
import { ReturnHookPage } from '@godiet-utils/types';

import { useParams } from 'react-router-dom';

/**
 * Define o formato de saída do hook `useDetailPlanningMealHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useDetailPlanningMealHook`.
 *
 * @interface DetailPlanningMealHookProps
 */
interface DetailPlanningMealHookProps {
  planningMeal?: TPlanningMeal;
  handleGeneratePDF: () => void;
}
/**
 * Adiciona na tipagem do retorno do hook algumas tipagens obrigatórias.
 */
export type DetailPlanningMealHookOutput =
  ReturnHookPage<DetailPlanningMealHookProps>;

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function useDetailPlanningMealHook(): DetailPlanningMealHookOutput {
  const { planningId } = useParams<{ id: string; planningId: string }>();

  const { isErrorPatient, isFetchingPatient, patient } = usePatient();

  const { isErrorPlanningMeal, isFetchingPlanningMeal, planningMeal } =
    useGetByPlanningId({
      patientId: patient?.id,
      planningId,
    });

  const handleGeneratePDF = React.useCallback(() => {
    console.log('generate pdf');
  }, []);

  return {
    planningMeal,
    handleGeneratePDF,
    pageStatus: {
      isLoading: isFetchingPatient || isFetchingPlanningMeal,
      isError: isErrorPatient || isErrorPlanningMeal,
      noData: false,
    },
  };
}
