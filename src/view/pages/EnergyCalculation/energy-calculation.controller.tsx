import { EnergyCalculationEmpty } from './energy-calculation.empty';
import { EnergyCalculationError } from './energy-calculation.error';
import { EnergyCalculationHookOutput } from './energy-calculation.hook';
import { EnergyCalculationLoading } from './energy-calculation.loading';
import { EnergyCalculationView } from './energy-calculation.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele recebe como propriedade tudo que é retornado do useEnergyCalculationHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function EnergyCalculationController(
  props: EnergyCalculationHookOutput
) {
  const { pageStatus, state } = props;

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <EnergyCalculationLoading />;
  }

  if (isError) {
    return <EnergyCalculationError />;
  }

  if (noData) {
    return <EnergyCalculationEmpty />;
  }

  return <EnergyCalculationView data={state} />;
}
