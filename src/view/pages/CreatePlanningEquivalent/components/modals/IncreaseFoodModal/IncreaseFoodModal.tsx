import { Button } from '@godiet-components/Button';
import { Modal } from '@godiet-components/Modal';

import { useIncreaseFoodModalHook } from './IncreaseFoodModal.hook';

export interface IncreaseFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
}

export function IncreaseFoodModal(props: IncreaseFoodModalProps) {
  const { isOpen, onClose } = props;

  useIncreaseFoodModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Adicionando um novo alimento</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={onClose} variant={'destructive'}>
          Cancelar
        </Button>
        <Button>Adicionar</Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
