import { TAnamnesisTemplate } from '@godiet-entities';
import { Editor } from '@godiet-ui/Editor';
import { Input } from '@godiet-ui/Input';
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
  const { initialAnamnesis } = props;
  const {
    isOpen,
    errors,
    isCreatingAnamnesisTemplate,
    handleCloseModal,
    register,
    handleSubmit,
  } = useModalCreateAnamnesisTemplateHook(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="max-h-full max-w-[740px] overflow-y-auto"
    >
      <Modal.Header>
        <Modal.Title>Criar nova anamnese</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para criar um template de anamnese.
        </Modal.Description>
      </Modal.Header>

      <form className="flex flex-col space-y-4">
        <Input
          placeholder="Título da anamnese"
          {...register('title')}
          error={errors.title?.message}
        />

        <Editor
          hasFooter
          onBackButton={handleCloseModal}
          isValid
          isLoading={isCreatingAnamnesisTemplate}
          onSave={handleSubmit}
          initialContent={initialAnamnesis?.text || ''}
        />
      </form>
    </Modal.Root>
  );
}
