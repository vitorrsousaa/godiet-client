import { useCallback } from 'react';

import {
  FormValues,
  usePatientFormController,
} from '@godiet-components/PatientForm';

import toast from 'react-hot-toast';

import { CreatePatientModalProps } from './CreatePatientModal';

export function useCreatePatientModalHook(props: CreatePatientModalProps) {
  const { onClose } = props;

  const controller = usePatientFormController();

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      try {
        console.log(data);
        controller.setError('email', { message: 'E-mail já cadastrado' });

        toast.success('Paciente criado com sucesso');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === '404 - Email already in use') {
          toast.error('Este e-mail já esta em uso');

          return;
        }
        toast.error('Erro ao criar paciente');
      } finally {
        onClose();
      }
    },
    [controller, onClose]
  );

  return {
    controller,
    handleSubmit,
  };
}
