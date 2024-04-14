import { Spinner } from '@godiet-ui/Spinner';

/**
 * Componente de indicador de carregamento.
 *
 * Este componente é exibido enquanto os dados estão sendo carregados na página.
 *
 * @returns Retorna o componente de indicador de carregamento.
 */
export function DetailPlanningMealLoading() {
  return (
    <div className="mt-16 grid h-full w-full place-items-center">
      <Spinner />
    </div>
  );
}
