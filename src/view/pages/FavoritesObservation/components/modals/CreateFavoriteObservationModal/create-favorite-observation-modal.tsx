import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';
import { TextEditor } from '@godiet-ui/TextEditor';

import { Controller } from 'react-hook-form';

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
    control,
    isValid,
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
      <form
        id="create-favorite-observation"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder="Nome da observação"
              value={value}
              name="title"
              onChange={onChange}
              error={error?.message}
              minVersion
              disabled={isCreatingFavoritesObservation}
            />
          )}
        />

        <Controller
          control={control}
          name="text"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextEditor
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </form>

      <Modal.Footer>
        <Button
          onClick={handleCloseModal}
          variant={'destructive'}
          disabled={isCreatingFavoritesObservation}
        >
          Cancelar
        </Button>
        <Button
          disabled={!isValid}
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
