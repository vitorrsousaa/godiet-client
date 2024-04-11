import { PlanningMealForm } from '@godiet-components/PlanningMealForm';
import { Button } from '@godiet-ui/Button';
import { Tooltip } from '@godiet-ui/Tooltip';

import { StarIcon } from '@radix-ui/react-icons';

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
        header={
          <div className="flex items-center justify-between">
            <h3 className="pb-2 text-lg font-bold text-foreground">
              Plano alimentar
            </h3>
            <Tooltip content="Favoritar plano">
              <Button className="flex items-center gap-2">
                <StarIcon />
                <span className="hidden min-[480px]:block">
                  Favoritar plano alimentar
                </span>
              </Button>
            </Tooltip>
          </div>
        }
      />

      <div>Analise de macronutrientes</div>
      <Button
        type="submit"
        form="create-planning-form"
        isLoading={isCreatingPlanningMeal}
        className="w-full"
      >
        Criar plano alimentar
      </Button>
    </div>
  );
}
