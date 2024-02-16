import { HeaderSettings } from '@godiet-components/HeaderSettings';
import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { Spinner } from '@godiet-ui/Spinner';
import { formatDate } from '@godiet-utils/formatDate';

import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

import { ModalCreateAnamnesisTemplate } from './components/modals/ModalCreateAnamnesisTemplate';
import { useSettingsAnamnesisHook } from './SettingsAnamnesis.hook';

export function SettingsAnamnesis() {
  const {
    modalCreateAnamnesisTemplateIsOpen,
    anamnesisTemplate,
    isErrorAnamnesisTemplate,
    isFetchingAnamnesisTemplate,
    modalDeleteAnamnesisTemplateIsOpen,
    toggleModaDeleteAnamnesisTemplate,
    toggleModalCreateAnamnesisTemplate,
  } = useSettingsAnamnesisHook();

  return (
    <>
      <HeaderSettings
        title="Anamnese"
        extra={
          <Button onClick={toggleModalCreateAnamnesisTemplate}>Criar</Button>
        }
      >
        Aqui você pode criar/editar os templates de anamnese que vai utilizar
        durante o acompanhamento do paciente. Nós realizamos o cadastro de
        alguns templates que são mais utilizados para você, mas você pode criar
        novos templates ou editar os existentes.
      </HeaderSettings>
      <div className="h-full w-full">
        {isFetchingAnamnesisTemplate ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        ) : isErrorAnamnesisTemplate ? (
          <div className="flex h-full w-full flex-col items-center justify-center text-center [&>strong]:text-red-600">
            <strong>Ops! Algo deu errado para carregar as anamneses!</strong>
            <p>Por favor, reinicie a página e tente novamente.</p>
          </div>
        ) : (
          <div className="2xl:grid-cols-6s grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
            {anamnesisTemplate.map((anamnesis) => (
              <Card.Root key={`anamnesis-${anamnesis.id}`}>
                <Card.Header>
                  <Card.Title>{anamnesis.title}</Card.Title>
                  <Card.Description>
                    Criado em:{' '}
                    {formatDate(anamnesis.createdAt.toString(), 'PP')}
                  </Card.Description>
                </Card.Header>
                <Card.Footer>
                  <Button variant={'outline'}>
                    <Pencil2Icon />
                  </Button>
                  <Button variant={'destructive'}>
                    <TrashIcon />
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))}
          </div>
        )}
      </div>

      <DangerModal
        isOpen={modalDeleteAnamnesisTemplateIsOpen}
        onClose={toggleModaDeleteAnamnesisTemplate}
        onConfirm={() => {}}
        description="Atenção, esta ação não pode ser desfeita."
        title="Deletar anamnese"
      />

      <ModalCreateAnamnesisTemplate
        isOpen={modalCreateAnamnesisTemplateIsOpen}
        onClose={toggleModalCreateAnamnesisTemplate}
      />
    </>
  );
}
