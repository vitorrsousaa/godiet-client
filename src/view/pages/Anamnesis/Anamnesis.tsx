import { useMemo } from 'react';

import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { formatDate } from '@godiet-utils/formatDate';

import {
  DownloadIcon,
  ExternalLinkIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

export function Anamnesis() {
  const isFetchingPatient = false;
  const isFetchingAnamnesis = false;

  const isErrorAnamnesis = false;

  const isFetching = useMemo(
    () => isFetchingPatient || isFetchingAnamnesis,
    [isFetchingAnamnesis, isFetchingPatient]
  );

  const anamnesis = [
    {
      id: '1',
      name: 'Anamnese 1',
      createdAt: '2021-10-10T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Anamnese 2',
      createdAt: '2021-10-10T00:00:00.000Z',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold ">Anamnesis</h1>
        <Button>Criar novo</Button>
      </section>
      {isFetching ? (
        <div>Carregando...</div>
      ) : (
        <>
          {isErrorAnamnesis ? (
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
              <p>
                Tivemos um erro para encontrar as anamnesis para esse paciente
              </p>
              <p>Por favor, tente novamente!</p>
            </div>
          ) : (
            <>
              {anamnesis.length > 0 ? (
                <>
                  {anamnesis.map((anamnese) => (
                    <Card.Root key={`anamnese-${anamnese.id}`}>
                      <Card.Header>
                        <Card.Title className="flex w-full items-center justify-between">
                          {anamnese.name}{' '}
                          <div className="flex gap-2 [&>button]:h-8 [&>button]:px-2">
                            <Button>
                              <DownloadIcon />
                            </Button>
                            <Button>
                              <ExternalLinkIcon />
                            </Button>
                            <Button variant={'destructive'} type="button">
                              <TrashIcon />
                            </Button>
                          </div>
                        </Card.Title>
                        <Card.Description>
                          Criado em: {formatDate(anamnese.createdAt, 'PP')}
                        </Card.Description>
                      </Card.Header>
                    </Card.Root>
                  ))}
                </>
              ) : (
                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
                  <p>Ainda não temos nenhuma anamnese para esse paciente</p>
                  <p>Clique no botão para criar uma nova anamnese</p>
                  <Button>Criar nova anamnese</Button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
