import { useCallback, useRef, useState } from 'react';

import { FormValues, PatientFormRef } from '@godiet-components/PatientForm';
import { delay } from '@godiet-utils/delay';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { EditPatientModalProps } from './EditPatientModal';

function usePatient(id: string | undefined) {
  const [loadingPatient, setLoadingPatient] = useState(true);

  const patient = {
    name: 'Paciente',
    email: 'paciente99@email.com',
    id: id || '1',
    birthDate: new Date(2003, 0, 1),
    gender: 'FEM',
  };

  delay().then(() => setLoadingPatient(false));

  return {
    patient,
    isLoading: loadingPatient,
  };
}

export function useEditPatientModalHook(props: EditPatientModalProps) {
  const { onClose } = props;

  const patientFormRef = useRef<PatientFormRef>(null);

  const { id } = useParams<{ id: string }>();

  const { patient, isLoading } = usePatient(id);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      try {
        console.log(data);

        toast.success('Paciente editado com sucesso');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === '404 - Email already in use') {
          toast.error('Este e-mail já esta em uso');
          patientFormRef?.current?.setError('email', {
            message: 'E-mail já cadastrado',
          });
          return;
        }
        toast.error('Erro ao editar o paciente');
      } finally {
        onClose();
      }
    },
    [onClose]
  );

  return { patient, patientFormRef, isLoading, handleSubmit };
}
