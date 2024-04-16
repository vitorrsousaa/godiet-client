import { AnamnesisForm } from '@godiet-components/AnamnesisForm';
import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';

import { useModalEditAnamnesisHook } from './ModalEditAnamnesis.hook';

export interface ModalEditAnamnesisProps {
  isOpen: boolean;
  onClose: () => void;
  anamnesisId: string | null;
}

export function ModalEditAnamnesis(props: ModalEditAnamnesisProps) {
  const { isOpen, isUpdatingAnamnesis, initialValues, onClose, handleSubmit } =
    useModalEditAnamnesisHook(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-full max-w-[740px] overflow-y-auto"
    >
      <Modal.Header>
        <Modal.Title>Editar uma anamnese</Modal.Title>

        <Modal.Description>Atualize os dados da anamnese.</Modal.Description>
      </Modal.Header>

      <AnamnesisForm
        onSubmit={handleSubmit}
        formId="update-anamnesis"
        initialValues={initialValues}
        isSubmitting={isUpdatingAnamnesis}
      />

      <Modal.Footer>
        <Button
          variant="destructive"
          onClick={onClose}
          disabled={isUpdatingAnamnesis}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="update-anamnesis"
          isLoading={isUpdatingAnamnesis}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
