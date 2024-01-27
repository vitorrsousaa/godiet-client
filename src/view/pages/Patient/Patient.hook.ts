import { useCallback, useState } from 'react';

import { replaceRouteParams } from '@godiet-utils/replaceRouteParams';

import { useNavigate } from 'react-router-dom';

export function usePatientHook() {
  const patient = {
    id: '65faa3b1-cd38-4816-98ec-3b0cd8a74f35',
    name: 'João da Silva',
    email: 'email@paciente.com',
    birthDate: '01/01/1990',
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigateToCreatePlanning = useCallback(() => {
    navigate(
      replaceRouteParams('CREATE_PLANNING_CONVENTIONAL', { id: patient.id })
    );
  }, [navigate, patient.id]);

  const toggleEditModal = useCallback(() => {
    setIsEditModalOpen((prevState) => !prevState);
  }, []);

  return {
    patient,
    isEditModalOpen,
    toggleEditModal,
    handleNavigateToCreatePlanning,
  };
}
