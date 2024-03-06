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

  const { foodOptions, isFetchingFoods, handleSubmit } =
    useAddFoodModalHook(props);

  // TODO- ADICIONAR ITENS QUANDO ESTIVER PESQUISANDO PELO ALIMENTO
  // - Medida caseira usual
  // - Porção (quantas gramas tem)
  // - Referência (tabela TACO)

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Adicionando um novo alimento</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>

      <SelectAutoComplete
        isLoading={isFetchingFoods}
        placeholder="Selecione um alimento"
        options={foodOptions}
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
