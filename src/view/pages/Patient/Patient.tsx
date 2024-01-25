import { useCallback, useState } from 'react';

import { Avatar } from '@godiet-components/Avatar';
import { Button } from '@godiet-components/Button';

import {
  CalendarIcon,
  InfoCircledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { EditPatientModal } from './components/modals/EditPatientModal';

export function Patient() {
  const patient = {
    name: 'João da Silva',
    email: 'email@paciente.com',
    birthDate: '01/01/1990',
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleEditModal = useCallback(() => {
    setIsEditModalOpen((prevState) => !prevState);
  }, []);

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

      <EditPatientModal isOpen={isEditModalOpen} onClose={toggleEditModal} />
    </div>
  );
}
