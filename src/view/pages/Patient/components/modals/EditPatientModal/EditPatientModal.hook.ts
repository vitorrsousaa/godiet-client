import { useCallback } from 'react';

import {
  FormValues,
  usePatientFormController,
} from '@godiet-components/PatientForm';
import { useGetByPatientId } from '@godiet-hooks/patient';

import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { EditPatientModalProps } from './EditPatientModal';

export function useEditPatientModalHook(props: EditPatientModalProps) {
  const { onClose } = props;

  const { id } = useParams<{ id: string }>();

  const { patient } = useGetByPatientId(id);

  const controller = usePatientFormController();

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      try {
        console.log(data);

        toast.success('Paciente editado com sucesso');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === '404 - Email already in use') {
          toast.error('Este e-mail já esta em uso');
          controller.setError('email', {
            message: 'E-mail já cadastrado',
          });
          return;
        }
        toast.error('Erro ao editar o paciente');
      } finally {
        onClose();
      }
    },
    [controller, onClose]
  );

  return { patient, controller, handleSubmit };
}
