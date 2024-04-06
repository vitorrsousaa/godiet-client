import { TPatient } from '@godiet-entities';
import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { formatDate } from '@godiet-utils/formatDate';

import { CalendarIcon, TrashIcon } from '@radix-ui/react-icons';

import { CreatePatientModal } from './components/modals/CreatePatientModal';
/**
 * Interface que define as propriedades aceitas pelo componente `PatientsView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `PatientsView`.
 *
 * @interface PatientsViewProps
 */
export interface PatientsViewProps {
  patients: TPatient[];
  isCreatePatientModalOpen: boolean;
  isDeletePatientModalOpen: boolean;
  isDeletingPatient: boolean;
  handleDeletePatient: () => Promise<void>;
  toggleModalCreatePatient: () => void;
  onNavigateToPatientPage: (patientId: string) => void;
  toggleModalDeletePatient: (patientId: string | null) => void;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do PatientsViewProps. E são encaminhadas para o componente dentro do PatientsController.
 * @returns Retorna o componente da view.
 */
export function PatientsView(props: PatientsViewProps) {
  const {
    patients,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    isDeletingPatient,
    toggleModalCreatePatient,
    handleDeletePatient,
    onNavigateToPatientPage,
    toggleModalDeletePatient,
  } = props;

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {patients.map((patient) => (
          <Card.Root key={patient.id}>
            <Card.Header>
              <Card.Title>{patient.name}</Card.Title>
              <Card.Description>
                <span className="flex items-center gap-1">
                  <CalendarIcon />
                  {formatDate(patient.birthDate, 'P')}
                </span>
              </Card.Description>
            </Card.Header>
            <Card.Footer>
              <Button onClick={() => onNavigateToPatientPage(patient.id)}>
                Ver mais
              </Button>
              <Button
                variant={'destructive'}
                onClick={() => toggleModalDeletePatient(patient.id)}
              >
                <TrashIcon />
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>

      <CreatePatientModal
        isOpen={isCreatePatientModalOpen}
        onClose={toggleModalCreatePatient}
      />

      <DangerModal
        isOpen={isDeletePatientModalOpen}
        description="Atenção, esta ação não pode ser desfeita."
        onClose={() => toggleModalDeletePatient(null)}
        title="Deletar um paciente"
        onConfirm={handleDeletePatient}
        isLoading={isDeletingPatient}
      />
    </div>
  );
}
