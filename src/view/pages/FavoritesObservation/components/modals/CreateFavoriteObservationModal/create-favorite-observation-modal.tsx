import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';
import { ScrollArea } from '@godiet-ui/ScrollArea';

import { FavoriteObservationForm } from '../../FavoriteObservationForm';

import { useCreateFavoriteObservationModalHook } from './create-favorite-observation-modal.hook';

export interface CreateFavoriteObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateFavoriteObservationModal(
  props: CreateFavoriteObservationModalProps
) {
  const { isOpen } = props;

  const {
    controller,
    isCreatingFavoritesObservation,
    handleCloseModal,
    handleSubmit,
  } = useCreateFavoriteObservationModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Criar uma nova observação favorita</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para criar uma nova observação favorita.
        </Modal.Description>
      </Modal.Header>

      <ScrollArea>
        <FavoriteObservationForm
          isSubmitting={isCreatingFavoritesObservation}
          onSubmit={handleSubmit}
          formId="create-favorite-observation"
          controller={controller}
          className="max-h-80"
        />
      </ScrollArea>

      <Modal.Footer>
        <Button
          onClick={handleCloseModal}
          variant={'destructive'}
          disabled={isCreatingFavoritesObservation}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="create-favorite-observation"
          isLoading={isCreatingFavoritesObservation}
        >
          Criar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
