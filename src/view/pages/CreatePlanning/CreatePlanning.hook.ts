import { useCallback, useMemo } from 'react';

import {
  TCreatePlanningMealDTO,
  usePlanningMealFormController,
} from '@godiet-components/PlanningMealForm';
import { usePersistPlanningMeal } from '@godiet-components/PlanningMealForm/hooks/usePersistPlanningMeal.hook';
import { useAuth } from '@godiet-hooks/auth';
import { usePatient } from '@godiet-hooks/patient';
import { useCreatePlanningMeal } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

import toast from 'react-hot-toast';

export function useCreatePlanningHook() {
  const { patient } = usePatient();

  const { createPlanningMeal, isCreatingPlanningMeal } = useCreatePlanningMeal(
    patient?.id || ''
  );

  const controller = usePlanningMealFormController();

  const { navigate } = useNavigate();

  const { email } = useAuth();

  const planningMealKey = useMemo(() => {
    const userEmail = email || '';
    const patientId = patient?.id || '';

    const object = {
      email: userEmail,
      patientId: patientId,
    };

    return JSON.stringify(object);
  }, [email, patient?.id]);

  const { storage } = usePersistPlanningMeal({
    planningMealKey,
    getValues: controller.getValues,
  });

  const removeStoragePlanningMeal = useCallback(() => {
    storage.remove();
  }, [storage]);

  const getStoragePlanningMeal = useCallback(() => {
    const data = storage.get();

    return data;
  }, [storage]);

  const handleSubmit = useCallback(
    async (data: TCreatePlanningMealDTO) => {
      try {
        await createPlanningMeal({
          patientId: patient?.id || '',
          planningMeal: data,
        });

        removeStoragePlanningMeal();

        toast.success('Plano alimentar criado!');
      } catch (error) {
        toast.error('Erro ao criar o plano alimentar');
      } finally {
        navigate('PLANNING_MEAL_BY_PATIENT', {
          replace: {
            id: patient?.id || '',
          },
        });
      }
    },
    [createPlanningMeal, navigate, patient?.id, removeStoragePlanningMeal]
  );

  return {
    isCreatingPlanningMeal,
    controller,
    handleSubmit,
    getStoragePlanningMeal,
  };
}
