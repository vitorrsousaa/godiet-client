import logo from '@godiet-assets/logo.svg';
import { Button } from '@godiet-components/Button';
import { Input } from '@godiet-components/Input';
import { ROUTES } from '@godiet-config';

import { Link } from 'react-router-dom';

import { useLoginHook } from './Login.hook';

export function Login() {
  const { errors, isLoading, handleSubmit, register } = useLoginHook();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-100">
      <header className="flex flex-col items-center gap-5 text-center">
        <img src={logo} className="w-9" />
        <h1 className="text-2xl font-bold">Entre em sua conta</h1>
        <p className="space-x-2">
          <span className="tracking-[-0.5px] text-gray-500">
            Novo por aqui?
          </span>
          <Link to={ROUTES.REGISTER} className="text-teal-600 hover:underline">
            Crie uma conta
          </Link>
        </p>
      </header>
      <div className="bg-red-440 flex w-full items-center justify-center p-4">
        <form
          className="flex w-full max-w-[504px] flex-col gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-sm md:p-8"
          onSubmit={handleSubmit}
        >
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
          <Button type="submit" isLoading={isLoading}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
