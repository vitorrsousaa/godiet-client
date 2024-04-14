import { DetailPlanningMealEmpty } from './detail-planning-meal.empty';
import { DetailPlanningMealError } from './detail-planning-meal.error';
import { DetailPlanningMealHookOutput } from './detail-planning-meal.hook';
import { DetailPlanningMealLoading } from './detail-planning-meal.loading';
import { DetailPlanningMealView } from './detail-planning-meal.view';

/**
 * Componente que controla a lógica da página de exemplo.
 *
 * Este componente gerencia o estado da página de exemplo, lidando com casos de carregamento, erro e dados vazios.
 * Ele recebe como propriedade tudo que é retornado do useDetailPlanningMealHook para obter os dados e o estado da página.
 *
 * As propriedades necessárias para renderizar a view são encaminhadas no controller. E devem ser definidas
 * dentro do componente de view.
 *
 * @returns Retorna o componente da página de exemplo.
 */
export function DetailPlanningMealController(
  props: DetailPlanningMealHookOutput
) {
  const {
    pageStatus,
    planningMeal,
    exportElementRef,
    isGeneratingPDF,
    handleGeneratePDF,
  } = props;

  const { isError, isLoading, noData } = pageStatus;

  if (isLoading) {
    return <DetailPlanningMealLoading />;
  }

  if (isError) {
    return <DetailPlanningMealError />;
  }

  if (noData) {
    return <DetailPlanningMealEmpty />;
  }

  return (
    <DetailPlanningMealView
      name={planningMeal?.name || ''}
      meals={planningMeal?.meals || []}
      onGeneratePDF={handleGeneratePDF}
      exportElementRef={exportElementRef}
      isGeneratingPDF={isGeneratingPDF}
    />
  );
}
