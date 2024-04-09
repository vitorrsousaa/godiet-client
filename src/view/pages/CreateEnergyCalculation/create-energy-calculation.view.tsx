/**
 * Interface que define as propriedades aceitas pelo componente `CreateEnergyCalculationView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `CreateEnergyCalculationView`.
 *
 * @interface CreateEnergyCalculationViewProps
 */
export interface CreateEnergyCalculationViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do CreateEnergyCalculationViewProps. E são encaminhadas para o componente dentro do CreateEnergyCalculationController.
 * @returns Retorna o componente da view.
 */
export function CreateEnergyCalculationView(
  props: CreateEnergyCalculationViewProps
) {
  const { data } = props;

  return (
    <div>
      <h1>CreateEnergyCalculation view</h1>
      {data}
    </div>
  );
}
