/**
 * Componente de indicador de erro.
 *
 * Este componente é exibido quando ocorre um erro durante o carregamento dos dados na página.
 *
 * @returns Retorna o componente de indicador de erro.
 */
export function EditPlanningMealError() {
  return (
    <div className="w-full text-center">
      <span>Tivemos um erro para carregar esta página!</span>
      <p>Por favor, tente novamente</p>
    </div>
  );
}
