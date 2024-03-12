import { useCallback, useState } from 'react';

import { useDeletePatient, useGetAllPatients } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';

import toast from 'react-hot-toast';

export function usePatientsHook() {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] =
    useState(false);

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState(false);

  const [selectedPatientToDelete, setSelectedPatientToDelete] = useState<
    string | null
  >(null);

  const { deletePatient, isDeletingPatient } = useDeletePatient();
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

  const handleDeletePatient = useCallback(async () => {
    if (!selectedPatientToDelete) {
      return;
    }

    try {
      await deletePatient({ patientId: selectedPatientToDelete || '' });

      toast.success('Paciente deletado com sucesso');
    } catch {
      toast.error('Erro ao deletar o paciente');
    } finally {
      toggleModalDeletePatient(null);
    }
  }, [deletePatient, selectedPatientToDelete, toggleModalDeletePatient]);

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
    isDeletingPatient,
    toggleModalCreatePatient,
    toggleModalDeletePatient,
    handleDeletePatient,
    handleNavigateToPatientPage,
  };
}
