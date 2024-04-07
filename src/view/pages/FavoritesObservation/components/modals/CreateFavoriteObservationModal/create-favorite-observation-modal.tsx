import { Button } from '@godiet-ui/Button';
import { Editor } from '@godiet-ui/Editor';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';

import { useCreateFavoriteObservationModalHook } from './create-favorite-observation-modal.hook';

export interface CreateFavoriteObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFavoriteObservationModal(
  props: CreateFavoriteObservationModalProps
) {
  const { isOpen, onClose } = props;

  const { state } = useCreateFavoriteObservationModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Criar uma nova observação favorita</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para criar uma nova observação favorita.
        </Modal.Description>
      </Modal.Header>
      <form id="create-favorite-observation">
        <Input name="nam" placeholder="Nome da observação" />

        <Editor />
      </form>

      <Modal.Footer>
        <Button
          // onClick={handleCloseModal}
          variant={'destructive'}
          // disabled={isCreatingFavoriteMeal}
        >
          Cancelar
        </Button>
        <Button
          // disabled={!formIsValid}
          type="submit"
          form="create-favorite-observation"
          // isLoading={isCreatingFavoriteMeal}
        >
          Criar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
