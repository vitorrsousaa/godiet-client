import { useCallback } from 'react';

import { useCreatePatient } from '@godiet-hooks/patient';
import { FormValues, usePatientFormController } from '@godiet-ui/PatientForm';

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
            phone: data.phone,
          },
        });

        toast.success('Paciente criado com sucesso');
        onClose();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response.status === 409) {
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
