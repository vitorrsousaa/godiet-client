import { Avatar } from '@godiet-ui/Avatar';
import { Button } from '@godiet-ui/Button';
import { Separator } from '@godiet-ui/Separator';
import { formatDate } from '@godiet-utils/formatDate';

import {
  CalendarIcon,
  InfoCircledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { Outlet } from 'react-router-dom';

import { EditPatientModal } from './components/modals/EditPatientModal';
import { usePatientLayoutHook } from './PatientLayout.hook';

export function PatientLayout() {
  const {
    patient,
    isEditModalOpen,
    isFetchingPatient,
    isErrorPatient,
    toggleEditModal,
    handleNavigateToCreatePlanning,
    handleNavigateToAnamnesis,
  } = usePatientLayoutHook();

  return (
    <div className="flex flex-col gap-4">
      {isFetchingPatient ? (
        <div>Carregando...</div>
      ) : !patient || isErrorPatient ? (
        <div>Paciente não encontrado</div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Perfil do paciente</h1>
            <Button variant={'outline'} onClick={toggleEditModal}>
              Editar dados
            </Button>
          </div>
          <div className="flex items-center gap-4 ">
            <Avatar name={patient.name} />
            <div className="flex flex-col">
              <span className="flex items-center gap-1">
                <PersonIcon /> {patient.name}
              </span>
              <span className="flex items-center gap-1">
                <InfoCircledIcon /> {patient.email}
              </span>
              <span className="flex items-center gap-1">
                <CalendarIcon />
                {formatDate(patient.birthDate, 'PPP')}
              </span>
            </div>
          </div>
          <Separator />
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            <Button variant={'outline'} onClick={handleNavigateToAnamnesis}>
              Anamnese
            </Button>
            <Button variant={'outline'} className="cursor-not-allowed">
              Antropometria
            </Button>
            <Button
              variant={'outline'}
              onClick={handleNavigateToCreatePlanning}
            >
              Planejamento alimentar
            </Button>
            <Button variant={'outline'} className="cursor-not-allowed">
              Orientações nutricionais
            </Button>
            <Button variant={'outline'} className="cursor-not-allowed">
              Cálculo energético
            </Button>
          </div>
          <Separator />
          <Outlet />

          <EditPatientModal
            isOpen={isEditModalOpen}
            onClose={toggleEditModal}
          />
        </>
      )}
    </div>
  );
}
