import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { CreatePatientModalProps } from './CreatePatientModal';

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
    .string()
    .nonempty('Data de nascimento é obrigatória')
    .refine((date) => new Date(date) <= new Date(), {
      message: 'Data de nascimento não pode ser no futuro',
    }),
  gender: z.enum(['MASC', 'FEM']),
});

type FormValues = z.infer<typeof schema>;

export function useCreatePatientModalHook(props: CreatePatientModalProps) {
  const { onClose } = props;

  const {
    formState,
    handleSubmit: hookFormSubmit,
    control,
    register,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === '404 - Email already in use') {
        toast.error('Este e-mail já esta em uso');
        setError('email', { message: 'E-mail já cadastrado' });
        return;
      }
      toast.error('Erro ao criar paciente');
      onClose();
    }
  });

  return {
    errors,
    control,
    register,
    handleSubmit,
  };
}
