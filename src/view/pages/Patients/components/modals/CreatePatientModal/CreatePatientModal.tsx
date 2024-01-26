import { Modal } from '@godiet-components/Modal';
import { PatientForm } from '@godiet-components/PatientForm';

import { useCreatePatientModalHook } from './CreatePatientModal.hook';

export interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePatientModal(props: CreatePatientModalProps) {
  const { isOpen, onClose } = props;

  const { controller, handleSubmit } = useCreatePatientModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Criar novo paciente</Modal.Title>
        <Modal.Description>
          Preencha as informações abaixo. Os demais dados podem ser completados
          na ficha do paciente.
        </Modal.Description>
      </Modal.Header>
      <PatientForm
        controller={controller}
        onCancel={onClose}
        onSubmit={handleSubmit}
      />
    </Modal.Root>
  );
}
