import { forwardRef } from 'react';

import { CardMeal } from '@godiet-components/CardMeal';
import { TPlanningMealDetails } from '@godiet-entities';
import { usePatient } from '@godiet-hooks/patient';

interface ExportedPlanningProps {
  planningMeal: TPlanningMealDetails;
}

export const ExportedPlanning = forwardRef<
  HTMLDivElement,
  ExportedPlanningProps
>((props, ref) => {
  const { planningMeal } = props;

  const { patient } = usePatient();

  return (
    <div ref={ref} className=" hidden flex-col gap-4 ">
      {patient && (
        <>
          <div className="ga-3 flex w-full flex-col items-center justify-center">
            <strong className="text-2xl text-black">{patient.name}</strong>
            <small className="text-xl dark:text-black">
              Planejamento alimentar
            </small>
          </div>

          {planningMeal && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center justify-between">
                <h4>{planningMeal.name}</h4>
              </div>
              <div className="flex flex-col gap-4">
                {planningMeal.meals.map((meal) => {
                  return (
                    <CardMeal.Root key={meal.id}>
                      <CardMeal.Header description={meal.time}>
                        {meal.name}
                      </CardMeal.Header>
                      <CardMeal.Content>
                        {meal.foods.length > 0 && (
                          <>
                            <CardMeal.ListHeader className="dark:bg-teal-800" />

                            {meal.foods
                              .filter((food) => food.options.length > 0)
                              .map((food) => (
                                <CardMeal.Options
                                  foods={food}
                                  key={food.id}
                                  className="dark:bg-teal-600"
                                />
                              ))}
                          </>
                        )}
                      </CardMeal.Content>
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
