import React from 'react';

import { TPatient } from '@godiet-entities';
import { useDeletePatient, useGetAllPatients } from '@godiet-hooks/patient';
import { useNavigate } from '@godiet-hooks/routes';
import { ReturnHookPage } from '@godiet-utils/types';

import toast from 'react-hot-toast';

/**
 * Define o formato de saída do hook `usePatientsHook`.
 *
 * Este tipo descreve a estrutura dos dados de saída retornados pelo hook `usePatientsHook`.
 *
 * @interface PatientsHookProps
 */
interface PatientsHookProps {
  patients: TPatient[];
  isFetchingPatients: boolean;
  isErrorPatients: boolean;
  isDeletingPatient: boolean;
  isCreatePatientModalOpen: boolean;
  isDeletePatientModalOpen: boolean;
  handleNavigateToPatientPage: (patientId: string) => void;
  toggleModalDeletePatient: (patientId: string | null) => void;
  handleDeletePatient: () => Promise<void>;
  toggleModalCreatePatient: () => void;
}
/**
 * Adiciona na tipagem do retorno do hook algumas tipagens obrigatórias.
 */
export type PatientsHookOutput = ReturnHookPage<PatientsHookProps>;

/**
 * Hook customizado que gerencia a lógica da página de exemplo.
 *
 * Este hook é responsável por gerenciar o estado da página de exemplo, incluindo o estado interno e o status da página.
 *
 * @returns Retorna um objeto contendo o estado interno e o status da página.
 */
export function usePatientsHook(): PatientsHookOutput {
  const [isCreatePatientModalOpen, setIsCreatePatientModalOpen] =
    React.useState(false);

  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    React.useState(false);

  const [selectedPatientToDelete, setSelectedPatientToDelete] = React.useState<
    string | null
  >(null);

  const { navigate } = useNavigate();

  const { isFetchingPatients, isLoadingPatients, patients, isErrorPatients } =
    useGetAllPatients();

  const { deletePatient, isDeletingPatient } = useDeletePatient();

  const handleNavigateToPatientPage = React.useCallback(
    (patientId: string) => {
      navigate('PATIENTS_BY_ID', {
        replace: { id: patientId },
      });
    },
    [navigate]
  );

  const toggleModalDeletePatient = React.useCallback(
    (patientId: string | null) => {
      setIsDeletePatientModalOpen((prevState) => !prevState);
      setSelectedPatientToDelete(patientId);
    },
    []
  );

  const toggleModalCreatePatient = React.useCallback(
    () => setIsCreatePatientModalOpen((prevState) => !prevState),
    []
  );

  const handleDeletePatient = React.useCallback(async () => {
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

  return {
    patients,
    isFetchingPatients,
    isErrorPatients,
    isDeletingPatient,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    toggleModalCreatePatient,
    handleNavigateToPatientPage,
    toggleModalDeletePatient,
    handleDeletePatient,
    pageStatus: {
      isLoading: isLoadingPatients,
      isError: isErrorPatients,
      noData: patients.length === 0,
    },
  };
}
