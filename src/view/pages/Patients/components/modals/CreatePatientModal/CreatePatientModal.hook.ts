import { useCallback } from 'react';

import {
  FormValues,
  usePatientFormController,
} from '@godiet-components/PatientForm';
import { useCreatePatient } from '@godiet-hooks/patient';

import toast from 'react-hot-toast';

import { CreatePatientModalProps } from './CreatePatientModal';

export function useCreatePatientModalHook(props: CreatePatientModalProps) {
  const { onClose } = props;

  const controller = usePatientFormController();

  const { createPatient, isCreatingPatient } = useCreatePatient();

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      try {
        await createPatient({
          patient: {
            birthDate: data.birthDate,
            email: data.email,
            gender: data.gender,
            name: data.name,
          },
        });

        toast.success('Paciente criado com sucesso');
        onClose();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === '404 - Email already in use') {
          toast.error('Este e-mail já esta em uso');
          controller.setError('email', { message: 'E-mail já cadastrado' });

          return;
        }
        toast.error('Erro ao criar paciente');
      }
    },
    [controller, createPatient, onClose]
  );

  return {
    controller,
    isCreatingPatient,
    handleSubmit,
  };
}
