import { useAuth } from '@godiet-hooks/auth';

export function Dashboard() {
  const { name } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-medium">Bem vindo (a), {name}.</h1>
      <small className="tracking-wide text-gray-500">
        Acompanhe todas as atividades por aqui.
      </small>
    </div>
  );
}
