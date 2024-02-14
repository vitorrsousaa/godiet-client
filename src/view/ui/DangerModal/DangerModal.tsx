import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';

interface DangerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
}

export function DangerModal(props: DangerModalProps) {
  return (
    <Modal.Root isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Header>
        <Modal.Title>{props.title}</Modal.Title>
        <Modal.Description>{props.description}</Modal.Description>
      </Modal.Header>
      <Modal.Footer>
        <Button
          variant={'ghost'}
          onClick={props.onClose}
          className="mt-2 sm:mt-0"
        >
          Cancelar
        </Button>
        <Button variant={'destructive'} onClick={props.onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
