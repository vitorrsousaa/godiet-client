/**
 * Componente de indicador de dados vazios.
 *
 * Este componente é exibido quando não há dados disponíveis para serem mostrados na página.
 *
 * @returns Retorna o componente de indicador de dados vazios.
 */
export function EnergyCalculationEmpty() {
  return (
    <div className="mb-10 mt-10 grid place-items-center space-y-4 text-center">
      <span className="max-w-[420px] text-lg">
        Nenhum planejamento de cálculo energético para este paciente.
      </span>
      <p className="max-w-[780px] text-sm">
        O planejamento do cálculo energético é uma excelente referência para a
        quantidade de calorias a ser oferecida ao seu paciente durante a
        construção do plano alimentar.
      </p>
    </div>
  );
}
