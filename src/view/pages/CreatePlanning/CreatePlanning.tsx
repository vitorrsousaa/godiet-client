import { PlanningMealForm } from '@godiet-components/PlanningMealForm';
import { Button } from '@godiet-ui/Button';

import { useCreatePlanningHook } from './CreatePlanning.hook';

export function CreatePlanning() {
  const {
    isCreatingPlanningMeal,
    controller,
    getStoragePlanningMeal,
    handleSubmit,
  } = useCreatePlanningHook();

  return (
    <div className="mb-32 flex w-full flex-col gap-2 sm:mb-24">
      <PlanningMealForm
        initialValues={getStoragePlanningMeal()}
        isSubmitting={isCreatingPlanningMeal}
        formID="create-planning-form"
        onSubmit={handleSubmit}
        controller={controller}
      />

      <div>Analise de macronutrientes</div>
      <Button
        type="submit"
        form="create-planning-form"
        isLoading={isCreatingPlanningMeal}
        className="w-full"
      >
        Criar plano alimentar2
      </Button>
    </div>
  );
}
