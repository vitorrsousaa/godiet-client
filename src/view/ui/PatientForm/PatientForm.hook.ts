import { useCallback, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { castToInternalUse } from './Patient.controller';
import { PatientFormProps } from './PatientForm';

const schema = z.object({
  email: z
    .string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .transform((text) => {
      return text
        .trim()
        .split(' ')
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(' ');
    }),
  birthDate: z
    .date({ required_error: 'Data é obrigatória' })
    .refine((date) => date <= new Date(), {
      message: 'Data de nascimento não pode ser no futuro',
    }),
  gender: z.enum(['MASC', 'FEM']),
});

export type FormValues = z.infer<typeof schema>;

export function usePatientFormHook(props: PatientFormProps) {
  const { patient, controller, onSubmit, onCancel } = props;

  const {
    formState,
    handleSubmit: hookFormSubmit,
    control,
    register,
    setError: hookFormSetError,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: 'MASC',
    },
  });

  const { errors } = formState;

  const handleSubmit = hookFormSubmit(async (data) => {
    await onSubmit(data);
  });

  const handleCancel = useCallback(() => {
    // reset();
    onCancel();
  }, [onCancel]);

  useEffect(() => {
    if (patient) {
      setValue('name', patient.name);
      setValue('email', patient.email);
      setValue('birthDate', patient.birthDate);
      setValue('gender', patient.gender);
    }
  }, [patient]);

  useEffect(() => {
    if (controller) {
      castToInternalUse(controller)._refs.setValuesRef.current = setValue;
      castToInternalUse(controller)._refs.setErrorRef.current =
        hookFormSetError;
    }
  }, [controller, hookFormSetError, setValue]);

  return {
    errors,
    control,
    hookFormSetError,
    register,
    handleSubmit,
    handleCancel,
    setValue,
  };
}
