import { useCallback, useState } from 'react';

import { usePatient } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';

export function usePatientLayoutHook() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { isErrorPatient, isFetchingPatient, patient } = usePatient();

  const { navigate } = useNavigate();

  const handleNavigateToCreatePlanning = useCallback(() => {
    navigate('PLANNING_MEAL_BY_PATIENT', {
      replace: { id: patient?.id || '' },
    });
  }, [navigate, patient]);

  const handleNavigateToAnamnesis = useCallback(() => {
    navigate('ANAMNESIS', { replace: { id: patient?.id || '' } });
  }, [navigate, patient]);

  const handleNavigateToHome = useCallback(() => {
    navigate('HOME');
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
  };
}
