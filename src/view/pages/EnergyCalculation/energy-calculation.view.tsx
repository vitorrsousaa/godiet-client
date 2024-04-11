/**
 * Interface que define as propriedades aceitas pelo componente `EnergyCalculationView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `EnergyCalculationView`.
 *
 * @interface EnergyCalculationViewProps
 */
export interface EnergyCalculationViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do EnergyCalculationViewProps. E são encaminhadas para o componente dentro do EnergyCalculationController.
 * @returns Retorna o componente da view.
 */
export function EnergyCalculationView(props: EnergyCalculationViewProps) {
  const { data } = props;

  return (
    <div>
      <h1>EnergyCalculation view</h1>
      {data}
    </div>
  );
}
