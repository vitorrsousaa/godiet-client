import { PatientForm } from '@godiet-components/PatientForm';
import { Modal } from '@godiet-ui/Modal';

import { useCreatePatientModalHook } from './CreatePatientModal.hook';

export interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePatientModal(props: CreatePatientModalProps) {
  const { isOpen, onClose } = props;

  const { controller, isCreatingPatient, handleSubmit } =
    useCreatePatientModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header className="mb-4">
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
        isLoading={isCreatingPatient}
      />
    </Modal.Root>
  );
}
