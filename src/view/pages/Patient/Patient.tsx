import { Avatar } from '@godiet-components/Avatar';

import {
  CalendarIcon,
  InfoCircledIcon,
  PersonIcon,
} from '@radix-ui/react-icons';

export function Patient() {
  const patient = {
    name: 'João da Silva',
    email: 'email@paciente.com',
    birthDate: '01/01/1990',
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between ">
        <h1 className="text-xl font-semibold">Perfil do paciente</h1>
        <span>Editar dados</span>
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
            <CalendarIcon /> {patient.birthDate}
          </span>
        </div>
      </div>
    </div>
  );
}
