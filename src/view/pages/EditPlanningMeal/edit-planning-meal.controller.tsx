import { EditPlanningMealEmpty } from './edit-planning-meal.empty';
import { EditPlanningMealError } from './edit-planning-meal.error';
import { useEditPlanningMealHook } from './edit-planning-meal.hook';
import { EditPlanningMealLoading } from './edit-planning-meal.loading';
import { EditPlanningMealView } from './edit-planning-meal.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele utiliza o hook useEditPlanningMealHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function EditPlanningMealController() {
  const { pageStatus, state } = useEditPlanningMealHook();

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <EditPlanningMealLoading />;
  }

  if (isError) {
    return <EditPlanningMealError />;
  }

  if (noData) {
    return <EditPlanningMealEmpty />;
  }

  return <EditPlanningMealView data={state} />;
}
