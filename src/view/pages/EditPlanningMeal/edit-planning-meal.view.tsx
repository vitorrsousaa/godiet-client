/**
 * Interface que define as propriedades aceitas pelo componente `EditPlanningMealView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `EditPlanningMealView`.
 *
 * @interface EditPlanningMealViewProps
 */
export interface EditPlanningMealViewProps {
  data: number;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do EditPlanningMealViewProps. E são encaminhadas para o componente dentro do EditPlanningMealController.
 * @returns Retorna o componente da view.
 */
export function EditPlanningMealView(props: EditPlanningMealViewProps) {
  const { data } = props;

  return (
    <div>
      <h1>EditPlanningMeal view</h1>
      {data}
    </div>
  );
}
