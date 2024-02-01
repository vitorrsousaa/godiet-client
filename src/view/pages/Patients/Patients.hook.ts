import { useCallback, useState } from 'react';

import { ROUTES } from '@godiet-config';
import { useGetAllPatients } from '@godiet-hooks/patient';
import { replaceRouteParams } from '@godiet-utils/replaceRouteParams';

import { useNavigate } from 'react-router-dom';

export function usePatientsHook() {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] =
    useState(false);

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState(false);

  const [selectedPatientToDelete, setSelectedPatientToDelete] = useState<
    string | null
  >(null);

  const { isFetchingPatients, patients } = useGetAllPatients();

  const navigate = useNavigate();

  const toggleModalCreatePatient = useCallback(
    () => setIsCreatePatientModalOpen((prevState) => !prevState),
    []
  );

  const toggleModalDeletePatient = useCallback((patientId: string | null) => {
    setIsDeletePatientModalOpen((prevState) => !prevState);
    setSelectedPatientToDelete(patientId);
  }, []);

  const handleDeletePatient = useCallback(() => {
    console.log(selectedPatientToDelete);

    toggleModalDeletePatient(null);
  }, [selectedPatientToDelete, toggleModalDeletePatient]);

  const handleNavigateToPatientPage = useCallback(
    (patientId: string) => {
      navigate(replaceRouteParams(ROUTES.PATIENTS_BY_ID, { id: patientId }));
    },
    [navigate]
  );

  return {
    patients,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    isFetchingPatients,
    toggleModalCreatePatient,
    toggleModalDeletePatient,
    handleDeletePatient,
    handleNavigateToPatientPage,
  };
}
