import noData from '@godiet-assets/no_data.svg';
import { Button } from '@godiet-components/Button';
import { Card } from '@godiet-components/Card';
import { DangerModal } from '@godiet-components/DangerModal';
import { formatDate } from '@godiet-utils/formatDate';

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

import { CreatePatientModal } from './components/modals/CreatePatientModal';
import { usePatientsHook } from './Patients.hook';

export function Patients() {
  const {
    patients,
    isCreatePatientModalOpen,
    isDeletePatientModalOpen,
    isFetchingPatients,
    toggleModalCreatePatient,
    toggleModalDeletePatient,
    handleDeletePatient,
    handleNavigateToPatientPage,
  } = usePatientsHook();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">Pacientes</h1>
          <small className="tracking-wide text-gray-500">
            Acompanhe todas os seus pacientes por aqui.
          </small>
        </div>
        <div>
          <Button onClick={toggleModalCreatePatient}>
            <PlusIcon className="" />
            <span className="hidden sm:block">Adicionar paciente</span>
          </Button>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        {isFetchingPatients ? (
          <div>Carregando...</div>
        ) : patients.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {patients.map((patient) => (
              <Card.Root key={patient.id}>
                <Card.Header>
                  <Card.Title>{patient.name}</Card.Title>
                  <Card.Description>
                    {formatDate(patient.birthDate, 'P')}
                  </Card.Description>
                </Card.Header>
                <Card.Footer>
                  <Button
                    onClick={() => handleNavigateToPatientPage(patient.id)}
                  >
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
        ) : (
          <>
            <img src={noData} alt="no-data" className="w-20" />
            <div className="text-center">
              <h1 className="text-center text-xl font-medium sm:text-2xl">
                Nenhum paciente cadastrado
              </h1>
              <small className="tracking-wide text-gray-500">
                Cadastre um paciente para acompanhar por aqui.
              </small>
            </div>
          </>
        )}
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
      />
    </div>
  );
}
