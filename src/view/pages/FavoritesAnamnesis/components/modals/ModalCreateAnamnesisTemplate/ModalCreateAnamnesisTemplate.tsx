import { AnamnesisForm } from '@godiet-components/AnamnesisForm';
import { TAnamnesisTemplate } from '@godiet-entities';
import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';

import { useModalCreateAnamnesisTemplateHook } from './ModalCreateAnamnesisTemplate.hook';

export interface ModalCreateAnamnesisTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  initialAnamnesis: TAnamnesisTemplate | null;
}

export function ModalCreateAnamnesisTemplate(
  props: ModalCreateAnamnesisTemplateProps
) {
  const { initialAnamnesis, onClose } = props;
  const { isOpen, initialValues, isCreatingAnamnesisTemplate, handleSubmit } =
    useModalCreateAnamnesisTemplateHook(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
      className="max-h-full max-w-[740px] overflow-y-auto"
    >
      <Modal.Header>
        <Modal.Title>
          {initialAnamnesis?.text ? 'Editar a anamnese' : 'Criar nova anamnese'}
        </Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para{' '}
          {initialAnamnesis?.text ? 'editar' : 'criar'} um template de anamnese.
        </Modal.Description>
      </Modal.Header>

      <AnamnesisForm
        formId="create-favorite-anamnesis"
        onSubmit={handleSubmit}
        isSubmitting={isCreatingAnamnesisTemplate}
        initialValues={initialValues}
        titleDescription="Crie um nome para esta anamnese."
      />

      <Modal.Footer>
        <Button
          variant="destructive"
          onClick={onClose}
          disabled={isCreatingAnamnesisTemplate}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="create-favorite-anamnesis"
          isLoading={isCreatingAnamnesisTemplate}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
