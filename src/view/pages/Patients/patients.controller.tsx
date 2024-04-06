import { PatientsEmpty } from './patients.empty';
import { PatientsError } from './patients.error';
import { PatientsHookOutput } from './patients.hook';
import { PatientsLoading } from './patients.loading';
import { PatientsView } from './patients.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele recebe como propriedade tudo que é retornado do usePatientsHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function PatientsController(props: PatientsHookOutput) {
  const {
    pageStatus,
    patients,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    isDeletingPatient,
    handleNavigateToPatientPage,
    toggleModalDeletePatient,
    handleDeletePatient,
    toggleModalCreatePatient,
  } = props;

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <PatientsLoading />;
  }

  if (isError) {
    return <PatientsError />;
  }

  if (noData) {
    return <PatientsEmpty />;
  }

  return (
    <PatientsView
      patients={patients}
      isCreatePatientModalOpen={isCreatePatientModalOpen}
      isDeletePatientModalOpen={isDeletePatientModalOpen}
      isDeletingPatient={isDeletingPatient}
      onNavigateToPatientPage={handleNavigateToPatientPage}
      toggleModalDeletePatient={toggleModalDeletePatient}
      handleDeletePatient={handleDeletePatient}
      toggleModalCreatePatient={toggleModalCreatePatient}
    />
  );
}
