import { CardMeal } from '@godiet-components/CardMeal';
import { Button } from '@godiet-ui/Button';
import { Spinner } from '@godiet-ui/Spinner';
import { Tooltip } from '@godiet-ui/Tooltip';

import { DownloadIcon } from '@radix-ui/react-icons';

import { ExportedPlanning } from './components/ExportedPlanning';
import { useDetailsPlanningMealHook } from './DetailsPlanningMeal.hook';

export function DetailsPlanningMeal() {
  const {
    isErrorPatient,
    patient,
    isFetchingPatient,
    isFetchingPlanningMeal,
    planningMeal,
    isErrorPlanningMeal,
    isGeneratingPDF,
    exportElementRef,
    handleNavigateToHomePage,
    handleExportPDF,
  } = useDetailsPlanningMealHook();

  return (
    <>
      {isFetchingPatient ? (
        <div className="grid h-full w-full place-items-center">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <>
          {isErrorPatient || !patient ? (
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
              <div>
                <p>Tivemos um erro para encontrar este paciente!</p>
                <p>Por favor. Tente novamente mais tarde!</p>
              </div>
              <Button onClick={handleNavigateToHomePage}>Página inicial</Button>
            </div>
          ) : (
            <>
              <div className="my-8 ">
                <h2 className="text-md font-semibold">
                  Planejamento alimentar
                </h2>
                {isFetchingPlanningMeal ? (
                  <div className="mt-16 grid h-full w-full place-items-center">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    {isErrorPlanningMeal || !planningMeal ? (
                      <div>
                        <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 text-center">
                          <div>
                            <p>
                              Tivemos um erro para encontrar este plano
                              alimentar!
                            </p>
                            <p>Por favor. Tente novamente mais tarde!</p>
                          </div>
                          <Button onClick={handleNavigateToHomePage}>
                            Página inicial
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-row items-center justify-between">
                            <h4>{planningMeal.name}</h4>
                            <Tooltip content="Baixar PDF">
                              <Button
                                onClick={handleExportPDF}
                                isLoading={isGeneratingPDF}
                              >
                                <DownloadIcon />
                              </Button>
                            </Tooltip>
                          </div>
                          <div className="flex flex-col gap-4">
                            {planningMeal.meals.map((meal) => {
                              return (
                                <CardMeal.Root key={meal.id}>
                                  <CardMeal.Header description={meal.time}>
                                    {meal.name}
                                  </CardMeal.Header>

                                  <CardMeal.Content>
                                    {meal.mealFoods.length > 0 && (
                                      <>
                                        <CardMeal.ListHeader />

                                        {meal.mealFoods.map((mealFood) => (
                                          <CardMeal.Options
                                            mealFood={mealFood}
                                            key={mealFood.id}
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
                        <ExportedPlanning
                          ref={exportElementRef}
                          planningMeal={planningMeal}
                        />
                      </>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
