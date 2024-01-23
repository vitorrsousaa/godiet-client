import { useCallback, useState } from 'react';

interface TPatient {
  name: string;
  id: string;
  birthDate: string;
}

export function usePatientsHook() {
  const patients: TPatient[] = [
    {
      id: '1',
      name: 'Paciente 1',
      birthDate: '01/01/2000',
    },
  ];

  // const patients: TPatient[] = [];

  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] =
    useState(false);

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState(false);

  const [selectedPatientToDelete, setSelectedPatientToDelete] = useState<
    string | null
  >(null);

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

  return {
    patients,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    toggleModalCreatePatient,
    toggleModalDeletePatient,
    handleDeletePatient,
  };
}
