import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';

export interface ModalCreateAnamnesisTemplateProps {
  isOpen: boolean;

  onClose: () => void;
}

export function ModalCreateAnamnesisTemplate(
  props: ModalCreateAnamnesisTemplateProps
) {
  const { isOpen, onClose } = props;

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Criar nova anamnese</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para criar um template de anamnese.
        </Modal.Description>
      </Modal.Header>

      <Modal.Footer>
        <Button variant={'destructive'} onClick={onClose}>
          Cancelar
        </Button>

        <Button>Criar</Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
