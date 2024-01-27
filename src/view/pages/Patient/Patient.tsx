import { Avatar } from '@godiet-components/Avatar';
import { Button } from '@godiet-components/Button';
import { Separator } from '@godiet-components/Separator';

import {
  CalendarIcon,
  InfoCircledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { EditPatientModal } from './components/modals/EditPatientModal';
import { usePatientHook } from './Patient.hook';

export function Patient() {
  const {
    patient,
    isEditModalOpen,
    toggleEditModal,
    handleNavigateToCreatePlanning,
  } = usePatientHook();

  return (
    <div className="flex flex-col gap-4">
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
            {format(patient.birthDate, 'PPP', { locale: ptBR })}
          </span>
        </div>
      </div>
      <Separator />

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <Button variant={'outline'} className="cursor-not-allowed">
          Anamnese
        </Button>
        <Button variant={'outline'} className="cursor-not-allowed">
          Antropometria
        </Button>
        <Button variant={'outline'} onClick={handleNavigateToCreatePlanning}>
          Planejamento alimentar
        </Button>
        <Button variant={'outline'} className="cursor-not-allowed">
          Orientações nutricionais
        </Button>
        <Button variant={'outline'} className="cursor-not-allowed">
          Cálculo energético
        </Button>
      </div>

      <EditPatientModal isOpen={isEditModalOpen} onClose={toggleEditModal} />
    </div>
  );
}
