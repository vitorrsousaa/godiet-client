import { useCallback, useState } from 'react';

import { useGetAllPatients } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';

export function usePatientsHook() {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] =
    useState(false);

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState(false);

  const [selectedPatientToDelete, setSelectedPatientToDelete] = useState<
    string | null
  >(null);

  const { isFetchingPatients, isLoadingPatients, patients } =
    useGetAllPatients();

  const { navigate } = useNavigate();

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
      navigate('PATIENTS_BY_ID', {
        replace: { id: patientId },
      });
    },
    [navigate]
  );

  return {
    patients,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    isFetchingPatients,
    isLoadingPatients,
    toggleModalCreatePatient,
    toggleModalDeletePatient,
    handleDeletePatient,
    handleNavigateToPatientPage,
  };
}
