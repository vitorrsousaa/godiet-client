/**
 * Componente de indicador de erro.
 *
 * Este componente é exibido quando ocorre um erro durante o carregamento dos dados na página.
 *
 * @returns Retorna o componente de indicador de erro.
 */
export function FavoritesObservationError() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <strong>Ops! Algo deu errado para carregar as observações!</strong>
      <p>Por favor, reinicie a página e tente novamente.</p>
    </div>
  );
}
