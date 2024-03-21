import { useCallback, useMemo, useState } from 'react';

import { useGetByPatientId } from '@godiet-hooks/patient';
import {
  useDeletePlanningMeal,
  useGetAllByPatient,
} from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function usePlanningMealHook() {
  const [selectedPlanningToDelete, setSelectedPlanningToDelete] = useState<
    string | null
  >(null);

  const [isDeletePlanningModalOpen, setIsDeletePlanningModalOpen] =
    useState(false);

  const { id } = useParams<{ id: string }>();

  const { navigate } = useNavigate();

  const { isFetchingPatient, patient } = useGetByPatientId(id);

  const {
    isFetchingPlanningMeals,
    isLoadingPlanningMeals,
    planningMeals,
    isErrorPlanningMeals,
  } = useGetAllByPatient({
    patientId: patient?.id,
  });

  const { deletePlanningMeal, isDeletingPlanningMeal } = useDeletePlanningMeal({
    patientId: patient?.id || '',
    planningMealId: selectedPlanningToDelete || '',
  });

  const handleNavigateToCreatePlanning = useCallback(() => {
    navigate('CREATE_PLANNING_CONVENTIONAL', {
      replace: { id: patient?.id || '' },
    });
  }, [navigate, patient]);

  const handleNavigateToShowPlanning = useCallback(
    (planningId: string) => {
      navigate('PLANNING_MEAL_BY_PATIENT_SHOW', {
        replace: {
          id: patient?.id || '',
          planningId: planningId,
        },
      });
    },
    [navigate, patient?.id]
  );

  const toggleModalDeletePlanning = useCallback((planningId: string | null) => {
    setIsDeletePlanningModalOpen((prevState) => !prevState);
    setSelectedPlanningToDelete(planningId);
  }, []);

  const handleDeletePlanningMeal = useCallback(async () => {
    if (!selectedPlanningToDelete) return;
    try {
      await deletePlanningMeal({
        patientId: patient?.id || '',
        planningMealId: selectedPlanningToDelete,
      });

      toast.success('Plano deletado com sucesso');
    } catch {
      toast.error('Tivemos um erro para deletar');
    } finally {
      toggleModalDeletePlanning(null);
    }
  }, [
    deletePlanningMeal,
    patient?.id,
    selectedPlanningToDelete,
    toggleModalDeletePlanning,
  ]);

  const isFetching = useMemo(
    () => isFetchingPatient || isLoadingPlanningMeals,
    [isFetchingPatient, isLoadingPlanningMeals]
  );

  return {
    isFetching,
    planningMeals,
    isDeletingPlanningMeal,
    isDeletePlanningModalOpen,
    isFetchingPlanningMeals,
    isErrorPlanningMeals,
    toggleModalDeletePlanning,
    handleDeletePlanningMeal,
    handleNavigateToCreatePlanning,
    handleNavigateToShowPlanning,
  };
}
