import { useAuth } from '@godiet-hooks/auth';
import { useMutation } from '@godiet-query';
import { authService } from '@godiet-services/auth';

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
    phone: z.string().min(8),
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

  const { signin } = useAuth();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: authService.signup,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      signin(accessToken);
    } catch {
      toast.error('Credenciais inválidas');
    }
  });

  return {
    errors,
    isLoading: isPending,
    handleSubmit,
    register,
  };
}
