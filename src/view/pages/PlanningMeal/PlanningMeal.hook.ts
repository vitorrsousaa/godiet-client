import { useCallback, useMemo } from 'react';

import { useGetByPatientId } from '@godiet-hooks/patient';
import { useGetAllByPatient } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

import { useParams } from 'react-router-dom';

export function usePlanningMealHook() {
  const { id } = useParams<{ id: string }>();

  const { navigate } = useNavigate();

  const { isFetchingPatient, patient } = useGetByPatientId(id);

  const handleNavigateToCreatePlanning = useCallback(() => {
    navigate('CREATE_PLANNING_GODIET', { id: patient?.id || '' });
  }, [navigate, patient]);

  const { isFetchingPlanningMeals, planningMeals } = useGetAllByPatient(
    patient?.id
  );

  const isFetching = useMemo(
    () => isFetchingPatient || isFetchingPlanningMeals,

    [isFetchingPatient, isFetchingPlanningMeals]
  );

  return {
    isFetching,
    planningMeals,
    handleNavigateToCreatePlanning,
  };
}
