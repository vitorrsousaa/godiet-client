import { Modal } from '@godiet-components/Modal';
import { PatientForm } from '@godiet-components/PatientForm';

import { useEditPatientModalHook } from './EditPatientModal.hook';

export interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditPatientModal(props: EditPatientModalProps) {
  const { isOpen, onClose } = props;

  const { patientFormRef, patient, handleSubmit } =
    useEditPatientModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Dados cadastrais</Modal.Title>
        <Modal.Description>Edite as informações do paciente.</Modal.Description>
      </Modal.Header>
      <PatientForm
        onCancel={onClose}
        onSubmit={handleSubmit}
        ref={patientFormRef}
        patient={patient}
      />
    </Modal.Root>
  );
}
