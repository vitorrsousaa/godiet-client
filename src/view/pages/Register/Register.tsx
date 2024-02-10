import logo from '@godiet-assets/logo.svg';
import { Button } from '@godiet-components/Button';
import { Input } from '@godiet-components/Input';
import { ROUTES } from '@godiet-config';

import { Link } from 'react-router-dom';

import { useRegisterHook } from './Register.hook';

export function Register() {
  const { errors, isLoading, handleSubmit, register } = useRegisterHook();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-100">
      <header className="flex flex-col items-center gap-5 text-center">
        <img src={logo} className="w-9" />
        <h1 className="text-2xl font-bold">Crie sua conta</h1>
        <p className="space-x-2">
          <span className="tracking-[-0.5px] text-gray-500">
            Já possui uma conta?
          </span>
          <Link to={ROUTES.LOGIN} className="text-teal-600 hover:underline">
            Fazer login
          </Link>
        </p>
      </header>
      <div className="bg-red-440 flex w-full items-center justify-center p-4">
        <form
          className="flex w-full max-w-[504px] flex-col gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm md:p-8"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="Seu nome"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            type="email"
            placeholder="Email de acesso"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            type="password"
            placeholder="Senha"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            type="password"
            placeholder="Confirme sua senha"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" isLoading={isLoading}>
            Criar sua conta
          </Button>
        </form>
      </div>
    </div>
  );
}
