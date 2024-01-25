import { useCallback, useRef } from 'react';

import { FormValues, PatientFormRef } from '@godiet-components/PatientForm';

import toast from 'react-hot-toast';

import { CreatePatientModalProps } from './CreatePatientModal';

export function useCreatePatientModalHook(props: CreatePatientModalProps) {
  const { onClose } = props;

  const patientFormRef = useRef<PatientFormRef>(null);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      try {
        console.log(data);

        toast.success('Paciente criado com sucesso');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === '404 - Email already in use') {
          toast.error('Este e-mail já esta em uso');
          patientFormRef?.current?.setError('email', {
            message: 'E-mail já cadastrado',
          });
          return;
        }
        toast.error('Erro ao criar paciente');
      } finally {
        onClose();
      }
    },
    [onClose]
  );

  return {
    patientFormRef,
    handleSubmit,
  };
}
