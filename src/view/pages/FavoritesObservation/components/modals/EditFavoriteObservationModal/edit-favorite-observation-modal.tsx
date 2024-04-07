import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';

import {
  FavoriteObservationForm,
  TCreateFavoriteObservationDTO,
} from '../../FavoriteObservationForm';

import { useEditFavoriteObservationModalHook } from './edit-favorite-observation-modal.hook';

export interface EditFavoriteObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: TCreateFavoriteObservationDTO & { id: string };
}

export function EditFavoriteObservationModal(
  props: EditFavoriteObservationModalProps
) {
  const { isOpen } = props;

  const {
    controller,
    isUpdatingFavoritesObservation,
    handleCloseModal,
    handleSubmit,
  } = useEditFavoriteObservationModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Editar uma observação favorita</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para editar sua observação favorita.
        </Modal.Description>
      </Modal.Header>

      <FavoriteObservationForm
        isSubmitting={isUpdatingFavoritesObservation}
        onSubmit={handleSubmit}
        formId="edit-favorite-observation"
        controller={controller}
      />

      <Modal.Footer>
        <Button
          onClick={handleCloseModal}
          variant={'destructive'}
          disabled={isUpdatingFavoritesObservation}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="edit-favorite-observation"
          isLoading={isUpdatingFavoritesObservation}
        >
          Editar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
