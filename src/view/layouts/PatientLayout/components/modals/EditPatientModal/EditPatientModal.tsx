import { Modal } from '@godiet-ui/Modal';
import { PatientForm } from '@godiet-ui/PatientForm';

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
              phone: patient.phone,
            }}
          />
        </>
      ) : (
        <div>Paciente não encontrado</div>
      )}
    </Modal.Root>
  );
}
