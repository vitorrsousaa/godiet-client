import { forwardRef } from 'react';

import { CardMeal } from '@godiet-components/CardMeal';
import { TMeal } from '@godiet-entities';
import { usePatient } from '@godiet-hooks/patient';

interface ExportedPlanningProps {
  name: string;
  meals: TMeal[];
}

export const ExportedPlanning = forwardRef<
  HTMLDivElement,
  ExportedPlanningProps
>((props, ref) => {
  const { name, meals } = props;

  const { patient } = usePatient();

  return (
    <div ref={ref} className="hidden flex-col gap-4 ">
      {patient && (
        <>
          <div className="ga-3 flex w-full flex-col items-center justify-center">
            <strong className="text-2xl text-black">{patient.name}</strong>
            <small className="text-xl dark:text-black">
              Planejamento alimentar
            </small>
          </div>

          {name && meals && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center justify-between">
                <h4>{name}</h4>
              </div>
              <div className="flex flex-col gap-4">
                {meals.map((meal) => {
                  return (
                    <CardMeal.Root key={meal.id}>
                      <CardMeal.Header description={meal.time}>
                        {meal.name}
                      </CardMeal.Header>

                      <CardMeal.Content mealFoods={meal.mealFoods} />
                      {meal.observation && (
                        <CardMeal.Footer>{meal.observation}</CardMeal.Footer>
                      )}
                    </CardMeal.Root>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
});

ExportedPlanning.displayName = 'ExportedPlanning';
