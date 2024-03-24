import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';

import { PlusIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';

import { CreateMeal } from './components/CreateMeal';
import { FooterBanner } from './components/FooterBanner';
import { useCreatePlanningHook } from './CreatePlanning.hook';

export function CreatePlanning() {
  const {
    methods,
    errors,
    meals,
    isCreatingPlanningMeal,
    register,
    handleSubmit,
    handleAddNewMeal,
    handleRemoveMeal,
    appendMeals,
  } = useCreatePlanningHook();

  return (
    <FormProvider {...methods}>
      <form className="mb-32 sm:mb-20">
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
            />
          </div>

          <div className="mb-2 flex flex-row items-center justify-between">
            <h3 className="pb-3 text-lg font-bold text-foreground">
              Refeições
            </h3>
            <Button
              onClick={handleAddNewMeal}
              disabled={isCreatingPlanningMeal}
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
                />
              ))}
            </div>
            <Button
              onClick={handleAddNewMeal}
              disabled={isCreatingPlanningMeal}
            >
              <PlusIcon className="h-6 w-6" />
              Adicionar refeição
            </Button>
            <div>Analise de macronutrientes</div>
            <Button
              type="submit"
              onClick={handleSubmit}
              isLoading={isCreatingPlanningMeal}
            >
              Criar plano alimentar
            </Button>
          </div>
        </div>
      </form>
      <FooterBanner />
    </FormProvider>
  );
}
