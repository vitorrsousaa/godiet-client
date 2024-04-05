import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';
import { cn } from '@godiet-utils/cn';

import { PlusIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';

import { CreateMeal } from './components/CreateMeal';
import { FooterBanner } from './components/FooterBanner';
import { UsePlanningMealFormController } from './planning-meal-form.controller';
import { usePlanningMealFormHook } from './planning-meal-form.hook';
import { TCreatePlanningMealDTO } from './planning-meal-form.schema';

export interface PlanningMealFormProps {
  className?: string;
  initialValues?: TCreatePlanningMealDTO;
  formID?: string;
  isSubmitting?: boolean;
  onSubmit: (data: TCreatePlanningMealDTO) => Promise<void>;
  controller?: UsePlanningMealFormController;
}

export function PlanningMealForm(props: PlanningMealFormProps) {
  const { className, isSubmitting } = props;

  const {
    errors,
    methods,
    formId,
    meals,
    register,
    handleSubmit,
    handleAddNewMeal,
    handleRemoveMeal,
    appendMeals,
  } = usePlanningMealFormHook(props);

  return (
    <FormProvider {...methods}>
      <form
        className={cn(className)}
        id={formId}
        aria-label="form"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <h3 className="pb-2 text-lg font-bold text-foreground">
            Plano alimentar
          </h3>
          <div>
            <Input
              {...register('name')}
              placeholder="Nome do plano alimentar"
              type="text"
              error={errors.name?.message}
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-2 flex flex-row items-center justify-between">
            <h3 className="pb-3 text-lg font-bold text-foreground">
              Refeições
            </h3>
            <Button
              onClick={handleAddNewMeal}
              disabled={isSubmitting}
              className="hidden min-[400px]:block"
            >
              Adicionar nova refeição
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {meals.map((_, index) => (
                <CreateMeal
                  key={`meal-form-${index}`}
                  mealIndex={index}
                  onRemoveMeal={() => handleRemoveMeal(index)}
                  onAddMeal={appendMeals}
                  isSubmitting={isSubmitting}
                />
              ))}
            </div>
            <Button onClick={handleAddNewMeal} disabled={isSubmitting}>
              <PlusIcon className="h-6 w-6" />
              Adicionar refeição
            </Button>
          </div>
        </div>
      </form>
      <FooterBanner />
    </FormProvider>
  );
}
