import React from 'react';

import {
  TCreatePlanningMealDTO,
  UsePlanningMealFormController,
  usePlanningMealFormController,
} from '@godiet-components/PlanningMealForm';
import { usePersistPlanningMeal } from '@godiet-components/PlanningMealForm/hooks';
import { useAuth } from '@godiet-hooks/auth';
import { usePatient } from '@godiet-hooks/patient';
import {
  useGetByPlanningId,
  useUpdatePlanningMeal,
} from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';
import { ReturnHookPage } from '@godiet-utils/types';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { mapperPlanningMealToEdit } from './edit-planning-meal.utils';

/**
 * Define o formato de saída do hook `useEditPlanningMealHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `useEditPlanningMealHook`.
 *
 * @interface EditPlanningMealHookOutput
 */
interface EditPlanningMealHookOutput {
  planningMealToEdit: TCreatePlanningMealDTO;
  controller: UsePlanningMealFormController;
  handleSubmit: (data: TCreatePlanningMealDTO) => Promise<void>;

  isUpdatingPlanningMeal: boolean;
}

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function useEditPlanningMealHook(): ReturnHookPage<EditPlanningMealHookOutput> {
  const { planningId } = useParams<{ id: string; planningId: string }>();

  const { email } = useAuth();

  const { navigate } = useNavigate();

  const { isErrorPatient, isFetchingPatient, patient } = usePatient();

  const { isErrorPlanningMeal, isFetchingPlanningMeal, planningMeal } =
    useGetByPlanningId({
      patientId: patient?.id,
      planningId,
    });

  const { isUpdatingPlanningMeal, updatePlanningMeal } = useUpdatePlanningMeal({
    patientId: patient?.id || '',
    planningMealId: planningId || '',
  });

  const controller = usePlanningMealFormController();

  const planningMealKey = React.useMemo(() => {
    const userEmail = email || '';
    const patientId = patient?.id || '';

    const object = {
      email: userEmail,
      patientId: patientId,
      planningMealId: planningId,
    };

    return JSON.stringify(object);
  }, [email, patient?.id, planningId]);

  const { storage } = usePersistPlanningMeal({
    planningMealKey,
    getValues: controller.getValues,
    hasError: isErrorPlanningMeal || isErrorPatient,
  });

  const handleSubmit = React.useCallback(
    async (data: TCreatePlanningMealDTO) => {
      try {
        await updatePlanningMeal({
          patientId: patient?.id || '',
          planningMeal: data,
        });

        toast.success('Plano editado com sucesso!');
      } catch {
        toast.error('Erro ao editar plano alimentar');
      } finally {
        navigate('PLANNING_MEAL_BY_PATIENT', {
          replace: {
            id: patient?.id || '',
          },
        });
      }
    },
    [navigate, patient?.id, updatePlanningMeal]
  );

  const planningMealToEdit = React.useMemo(() => {
    const storagedPlanningMeal = storage.get();

    if (storagedPlanningMeal?.name?.length > 0) {
      return storagedPlanningMeal;
    }

    if (!planningMeal) return {} as TCreatePlanningMealDTO;

    return mapperPlanningMealToEdit(planningMeal);
  }, [planningMeal, storage]);

  return {
    planningMealToEdit,
    controller,
    handleSubmit,
    isUpdatingPlanningMeal,
    pageStatus: {
      isLoading: isFetchingPlanningMeal || isFetchingPatient,
      isError: isErrorPatient || isErrorPlanningMeal,
      noData: false,
    },
  };
}
