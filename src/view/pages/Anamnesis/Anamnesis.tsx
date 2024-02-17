import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { formatDate } from '@godiet-utils/formatDate';

import {
  DownloadIcon,
  ExternalLinkIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { ModalEditAnamnesis } from './components/modals/ModalEditAnamnesis';
import { ModalSelecteCreateAnamnesis } from './components/modals/ModalSelectCreateAnamnesis';
import { useAnamnesisHook } from './Anamnesis.hook';

export function Anamnesis() {
  const {
    isFetching,
    isErrorAnamnesis,
    patient,
    anamnesis,
    modalSelectAnamnesisIsOpen,
    modalDeleteAnamnesisIsOpen,
    isDeletingAnamnesis,
    modalEditAnamnesisIsOpen,
    anamnesisToEdit,
    handleOpenModalEditAnamnesis,
    toggleModalSelectAnamnesis,
    handleOpenModalDeleteAnamnesis,
    handleDeleteAnamnesis,
  } = useAnamnesisHook();

  return (
    <div className="mb-10 flex flex-col gap-6">
      <section className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold ">Anamnesis</h1>
        <Button onClick={toggleModalSelectAnamnesis}>Criar novo</Button>
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
                          {anamnese.title}{' '}
                          <div className="flex gap-2 [&>button]:h-8 [&>button]:px-2">
                            <Button>
                              <DownloadIcon />
                            </Button>
                            <Button
                              onClick={() =>
                                handleOpenModalEditAnamnesis(anamnese.id)
                              }
                            >
                              <ExternalLinkIcon />
                            </Button>
                            <Button
                              variant={'destructive'}
                              type="button"
                              onClick={() =>
                                handleOpenModalDeleteAnamnesis(anamnese.id)
                              }
                            >
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
                  <p>
                    Você pode criar a sua anamnese ou usar os modelos propostos
                    pelo goDiet. A anamnese é importante para ter um registro da
                    condição inicial do paciente e ser um importante fator na
                    hora de elaborar a conduta nutricional.
                  </p>
                  <Button onClick={toggleModalSelectAnamnesis}>
                    Criar nova anamnese
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      )}

      <ModalEditAnamnesis
        isOpen={modalEditAnamnesisIsOpen}
        onClose={() => handleOpenModalEditAnamnesis(null)}
        anamnesisId={anamnesisToEdit}
      />

      <ModalSelecteCreateAnamnesis
        patientId={patient?.id || ''}
        isOpen={modalSelectAnamnesisIsOpen}
        onClose={toggleModalSelectAnamnesis}
      />

      <DangerModal
        isOpen={modalDeleteAnamnesisIsOpen}
        onClose={() => handleOpenModalDeleteAnamnesis(null)}
        description="Você tem certeza que deseja deletar essa anamnese?"
        title="Deletar Anamnese"
        isLoading={isDeletingAnamnesis}
        onConfirm={handleDeleteAnamnesis}
      />
    </div>
  );
}
