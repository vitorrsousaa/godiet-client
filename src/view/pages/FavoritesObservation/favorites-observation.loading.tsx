import { Spinner } from '@godiet-ui/Spinner';

/**
 * Componente de indicador de carregamento.
 *
 * Este componente é exibido enquanto os dados estão sendo carregados na página.
 *
 * @returns Retorna o componente de indicador de carregamento.
 */
export function FavoritesObservationLoading() {
  return (
    <div className="mt-4 grid w-full place-items-center">
      <Spinner />
    </div>
  );
}
