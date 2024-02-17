import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@godiet-ui/Select';

import { SelectValue } from '@radix-ui/react-select';

import { useModalCreateAnamnesisHook } from './ModalSelectCreateAnamnesis.hook';

export interface ModalSelecteCreateAnamnesisProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

export function ModalSelecteCreateAnamnesis(
  props: ModalSelecteCreateAnamnesisProps
) {
  const { isOpen, onClose } = props;

  const {
    isFetchingAnamnesisTemplate,
    anamnesisOptions,
    formIsValid,
    handleChangeAnamnesis,
    handleCreateAnamnese,
  } = useModalCreateAnamnesisHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Criar nova anamnese</Modal.Title>
        <Modal.Description>
          Você pode selecionar um template criado anteriormente ou iniciar uma
          nova em branco, ou criar novos templates acessando Configurações.
        </Modal.Description>
      </Modal.Header>

      <Select onValueChange={handleChangeAnamnesis}>
        <SelectTrigger isLoading={isFetchingAnamnesisTemplate}>
          <SelectValue placeholder="Selecione um modelo de anamnese" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {anamnesisOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Modal.Footer>
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button disabled={!formIsValid} onClick={handleCreateAnamnese}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
