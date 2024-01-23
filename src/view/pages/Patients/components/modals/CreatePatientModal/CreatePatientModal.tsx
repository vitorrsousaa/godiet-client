import { Button } from '@godiet-components/Button';
import { Input } from '@godiet-components/Input';
import { Modal } from '@godiet-components/Modal';
import { ToggleGroup } from '@godiet-components/ToggleGroup';

interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePatientModal(props: CreatePatientModalProps) {
  const { isOpen, onClose } = props;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Criar novo paciente</Modal.Title>
        <Modal.Description>
          Preencha as informações abaixo. Os demais dados podem ser completados
          na ficha do paciente.
        </Modal.Description>
      </Modal.Header>
      <form className="flex flex-col gap-4">
        <Input name="name" type="text" placeholder="Nome do paciente" />
        <Input name="email" type="email" placeholder="E-mail do paciente" />
        <Input name="phone" type="text" placeholder="Telefone do paciente" />
        <Input name="birthDate" type="date" placeholder="Data de nascimento" />
        <div>
          <small className="text-xs sm:text-sm">Selecione o gênero:</small>
          <ToggleGroup.Root type="single">
            <ToggleGroup.Item value="masc" variant={'outline'}>
              MASC
            </ToggleGroup.Item>
            <ToggleGroup.Item value="FEM" variant={'outline'}>
              FEM
            </ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      </form>

      <Modal.Footer>
        <Button
          variant={'destructive'}
          className="mt-2 sm:mt-0"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button>Salvar</Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
