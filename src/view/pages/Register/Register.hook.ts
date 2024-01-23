import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const schema = z
  .object({
    email: z
      .string()
      .nonempty('E-mail é obrigatório')
      .email('Informe um e-mail válido'),
    password: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
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
    confirmPassword: z
      .string()
      .nonempty('A senha é obrigatória')
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas diferentes',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof schema>;

export function useRegisterHook() {
  const {
    formState,
    handleSubmit: hookFormSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      console.log(data);
    } catch {
      toast.error('Credenciais inválidas');
    }
  });

  return {
    errors,
    isLoading: false,
    handleSubmit,
    register,
  };
}
