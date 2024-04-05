import { useCallback, useState } from 'react';

import { usePrefetchAllAnamnesis } from '@godiet-hooks/anamnesis';
import { usePatient } from '@godiet-hooks/patient';
import { usePrefetchAllPlanningMeal } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

export function usePatientLayoutHook() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isErrorPatient, isFetchingPatient, patient } = usePatient();

  const { navigate } = useNavigate();

  const prefetchAllAnamnesis = usePrefetchAllAnamnesis();

  const prefetchAllPlanningMeals = usePrefetchAllPlanningMeal();

  const handleNavigateToCreatePlanning = useCallback(() => {
    navigate('PLANNING_MEAL_BY_PATIENT', {
      replace: { id: patient?.id || '' },
    });
  }, [navigate, patient]);

  const handleNavigateToAnamnesis = useCallback(() => {
    navigate('ANAMNESIS', { replace: { id: patient?.id || '' } });
  }, [navigate, patient]);

  const handleNavigateToHome = useCallback(() => {
    navigate('DASHBOARD');
  }, [navigate]);

  const toggleEditModal = useCallback(() => {
    setIsEditModalOpen((prevState) => !prevState);
  }, []);

  return {
    patient,
    isEditModalOpen,
    isFetchingPatient,
    isErrorPatient,
    toggleEditModal,
    handleNavigateToCreatePlanning,
    handleNavigateToAnamnesis,
    handleNavigateToHome,
    prefetchAllAnamnesis,
    prefetchAllPlanningMeals,
  };
}
