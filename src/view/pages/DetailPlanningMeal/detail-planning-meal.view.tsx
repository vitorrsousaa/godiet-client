/**
 * Interface que define as propriedades aceitas pelo componente `DetailPlanningMealView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `DetailPlanningMealView`.
 *
 * @interface DetailPlanningMealViewProps
 */
export interface DetailPlanningMealViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do DetailPlanningMealViewProps. E são encaminhadas para o componente dentro do DetailPlanningMealController.
 * @returns Retorna o componente da view.
 */
export function DetailPlanningMealView(props: DetailPlanningMealViewProps) {
  const { data } = props;

  return (
    <div>
      <h1>DetailPlanningMeal view</h1>
      {data}
    </div>
  );
}
