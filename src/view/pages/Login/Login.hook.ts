import { useAuth } from '@godiet-hooks/auth';
import { authService } from '@godiet-services/auth';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const schema = z.object({
  email: z
    .string()
    .nonempty('E-mail é obrigatório')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

type FormValues = z.infer<typeof schema>;

export function useLoginHook() {
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
    mutationFn: authService.signin,
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
