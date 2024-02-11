import { useCallback, useState } from 'react';

import { useGetByPatientId } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';

import { useParams } from 'react-router-dom';

export function usePatientHook() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  const { isFetchingPatient, patient } = useGetByPatientId(id);

  const { navigate } = useNavigate();

  const handleNavigateToCreatePlanning = useCallback(() => {
    navigate('PLANNING_MEAL_BY_PATIENT', { id: patient?.id || '' });
  }, [navigate, patient]);

  const toggleEditModal = useCallback(() => {
    setIsEditModalOpen((prevState) => !prevState);
  }, []);

  return {
    patient,
    isEditModalOpen,
    isFetchingPatient,
    toggleEditModal,
    handleNavigateToCreatePlanning,
  };
}
