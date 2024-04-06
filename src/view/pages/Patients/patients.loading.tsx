import { Spinner } from '@godiet-ui/Spinner';

/**
 * Componente de indicador de carregamento.
 *
 * Este componente é exibido enquanto os dados estão sendo carregados na página.
 *
 * @returns Retorna o componente de indicador de carregamento.
 */
export function PatientsLoading() {
  return (
    <div className="m-auto grid h-full place-items-center">
      <Spinner />
    </div>
  );
}
