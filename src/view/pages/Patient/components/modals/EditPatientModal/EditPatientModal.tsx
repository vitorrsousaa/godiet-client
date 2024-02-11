import { Modal } from '@godiet-components/Modal';
import { PatientForm } from '@godiet-components/PatientForm';

import { useEditPatientModalHook } from './EditPatientModal.hook';

export interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditPatientModal(props: EditPatientModalProps) {
  const { isOpen, onClose } = props;

  const { patient, controller, handleSubmit } = useEditPatientModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Dados cadastrais</Modal.Title>
        <Modal.Description>Edite as informações do paciente.</Modal.Description>
      </Modal.Header>
      {patient ? (
        <>
          <PatientForm
            onCancel={onClose}
            onSubmit={handleSubmit}
            controller={controller}
            patient={{
              birthDate: new Date(patient.birthDate),
              email: patient.email,
              gender: patient.gender,
              name: patient.name,
            }}
          />
        </>
      ) : (
        <div>Paciente não encontrado</div>
      )}
    </Modal.Root>
  );
}
