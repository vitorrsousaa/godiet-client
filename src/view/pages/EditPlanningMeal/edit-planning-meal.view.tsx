import {
  PlanningMealForm,
  TCreatePlanningMealDTO,
  UsePlanningMealFormController,
} from '@godiet-components/PlanningMealForm';
import { Button } from '@godiet-ui/Button';

/**
 * Interface que define as propriedades aceitas pelo componente `EditPlanningMealView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `EditPlanningMealView`.
 *
 * @interface EditPlanningMealViewProps
 */
export interface EditPlanningMealViewProps {
  initialValues: TCreatePlanningMealDTO;
  isSubmitting?: boolean;
  controller: UsePlanningMealFormController;
  onSubmit: (data: TCreatePlanningMealDTO) => Promise<void>;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do EditPlanningMealViewProps. E são encaminhadas para o componente dentro do EditPlanningMealController.
 * @returns Retorna o componente da view.
 */
export function EditPlanningMealView(props: EditPlanningMealViewProps) {
  const { initialValues, isSubmitting, controller, onSubmit } = props;

  return (
    <div className="mb-32 flex w-full flex-col gap-2 sm:mb-24">
      <PlanningMealForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        formID="edit-planning-meal-form"
        isSubmitting={isSubmitting}
        controller={controller}
      />
      <Button
        type="submit"
        form="edit-planning-meal-form"
        className="w-full"
        isLoading={isSubmitting}
      >
        Editar plano alimentar
      </Button>
    </div>
  );
}
