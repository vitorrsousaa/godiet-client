/**
 * Componente de indicador de dados vazios.
 *
 * Este componente é exibido quando não há dados disponíveis para serem mostrados na página.
 *
 * @returns Retorna o componente de indicador de dados vazios.
 */
export function DetailPlanningMealEmpty() {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
      <div>
        <p>Tivemos um erro para encontrar este plano alimentar!</p>
        <p>Por favor. Tente novamente mais tarde!</p>
      </div>
    </div>
  );
}
