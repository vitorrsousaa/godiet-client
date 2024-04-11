/**
 * Componente de indicador de dados vazios.
 *
 * Este componente é exibido quando não há dados disponíveis para serem mostrados na página.
 *
 * @returns Retorna o componente de indicador de dados vazios.
 */
export function FavoritesObservationEmpty() {
  return (
    <div className="text-center">
      <p>Você ainda não cadastrou nenhuma observação favorita.</p>
      <small>
        Clique no botão acima para criar sua primeira observação favorita!
      </small>
    </div>
  );
}
