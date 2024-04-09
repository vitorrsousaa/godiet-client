import { CreateEnergyCalculationEmpty } from './create-energy-calculation.empty';
import { CreateEnergyCalculationError } from './create-energy-calculation.error';
import { CreateEnergyCalculationHookOutput } from './create-energy-calculation.hook';
import { CreateEnergyCalculationLoading } from './create-energy-calculation.loading';
import { CreateEnergyCalculationView } from './create-energy-calculation.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele recebe como propriedade tudo que é retornado do useCreateEnergyCalculationHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function CreateEnergyCalculationController(
  props: CreateEnergyCalculationHookOutput
) {
  const { pageStatus, state } = props;

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <CreateEnergyCalculationLoading />;
  }

  if (isError) {
    return <CreateEnergyCalculationError />;
  }

  if (noData) {
    return <CreateEnergyCalculationEmpty />;
  }

  return <CreateEnergyCalculationView data={state} />;
}
