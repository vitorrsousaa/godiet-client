import { Editor } from '@godiet-ui/Editor';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';

import { useModalEditAnamnesisHook } from './ModalEditAnamnesis.hook';

export interface ModalEditAnamnesisProps {
  isOpen: boolean;
  onClose: () => void;
  anamnesisId: string | null;
}

export function ModalEditAnamnesis(props: ModalEditAnamnesisProps) {
  const {
    isOpen,
    errors,
    isUpdatingAnamnesis,
    initialText,
    onClose,
    register,
    handleSubmit,
  } = useModalEditAnamnesisHook(props);

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

      <form className="flex flex-col space-y-4">
        <Input
          placeholder="Título da anamnese"
          {...register('title')}
          error={errors.title?.message}
        />

        <Editor
          initialContent={initialText}
          hasFooter
          onBackButton={onClose}
          isValid
          isLoading={isUpdatingAnamnesis}
          onSave={handleSubmit}
        />
      </form>
    </Modal.Root>
  );
}
