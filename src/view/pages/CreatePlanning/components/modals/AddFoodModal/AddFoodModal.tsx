import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';
import { SelectAutoComplete } from '@godiet-ui/SelectAutoComplete';

import { useAddFoodModalHook } from './AddFoodModal.hook';

export interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFoodModal(props: AddFoodModalProps) {
  const { isOpen, onClose } = props;

  const { handleSubmit } = useAddFoodModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Adicionando um novo alimento</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>

      <SelectAutoComplete
        placeholder="Selecione um alimento"
        options={[
          {
            label: 'Arroz',
            value: 'Arroz',
          },
          {
            label: 'Feijão',
            value: 'Feijão',
          },
        ]}
      />
      <Input name="quantity" placeholder="Quantidade do alimento" />

      <Modal.Footer>
        <Button onClick={onClose} variant={'destructive'}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Adicionar</Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
