import React from 'react';

import { Button } from '@godiet-ui/Button';

import { PlusIcon } from '@radix-ui/react-icons';

interface PatientsLayoutProps {
  children: React.ReactNode;
  isFetchingPatients?: boolean;
  isErrorPatients?: boolean;
}

/**
 * Componente de layout para a página inteira.
 *
 * Este componente é responsável por fornecer um layout consistente para toda a página.
 * Qualquer conteúdo definido dentro deste componente será carregado para a página inteira,
 * independente do estado de carregamento, erro ou dados vazios da página.
 *
 * As propriedades que o layout recebe são encaminhadas no Patients.tsx
 *
 * @returns Retorna o componente de layout para a página inteira.
 */
export function PatientsLayout(props: PatientsLayoutProps) {
  const { children, isFetchingPatients, isErrorPatients } = props;

  return (
    <>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium">Pacientes</h1>
          <small className="tracking-wide text-gray-500">
            Acompanhe todas os seus pacientes por aqui.
          </small>
        </div>
        <div>
          <Button
            // onClick={toggleModalCreatePatient}
            isLoading={isFetchingPatients}
            disabled={isErrorPatients}
          >
            <PlusIcon />
            <span className="hidden sm:block">Adicionar paciente</span>
          </Button>
        </div>
      </div>
      {children}
    </>
  );
}
