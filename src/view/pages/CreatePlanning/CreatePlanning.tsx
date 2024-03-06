import { useCallback, useState } from 'react';

import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';

import { DevTool } from '@hookform/devtools';
import { PlusIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';

import { CreateMeal } from './components/CreateMeal';
import { AddFoodModal } from './components/modals/AddFoodModal';
import { useCreatePlanningHook } from './CreatePlanning.hook';

export function CreatePlanning() {
  const [addFoodModalOpen, setAddFoodModalOpen] = useState(false);

  const toggleAddFoodModal = useCallback(() => {
    setAddFoodModalOpen((prevState) => !prevState);
  }, []);

  const {
    control,
    methods,
    errors,
    meals,
    register,
    handleSubmit,
    handleAddNewMeal,
    handleRemoveMeal,
  } = useCreatePlanningHook();

  return (
    <FormProvider {...methods}>
      <DevTool control={control} />
      <form>
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
            <Button>Adicionar nova refeição</Button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {meals.map((meal, index) => (
                <CreateMeal
                  key={`meal-form-${meal.id}`}
                  mealIndex={index}
                  onRemoveMeal={() => handleRemoveMeal(index)}
                >
                  <Button onClick={toggleAddFoodModal}>
                    Adicionar alimento
                  </Button>
                  <Button>Adicionar observações</Button>
                </CreateMeal>
              ))}
            </div>
            <Button onClick={handleAddNewMeal}>
              <PlusIcon className="h-6 w-6" />
              Adicionar refeição
            </Button>
            <div>Analise de macronutrientes</div>
            <Button type="submit" onClick={handleSubmit}>
              Criar plano alimentar
            </Button>
          </div>

          <AddFoodModal
            onClose={toggleAddFoodModal}
            isOpen={addFoodModalOpen}
          />
        </div>
      </form>
    </FormProvider>
  );
}
