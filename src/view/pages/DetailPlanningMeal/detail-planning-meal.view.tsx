import { CardMeal } from '@godiet-components/CardMeal';
import { TMeal } from '@godiet-entities';
import { Button } from '@godiet-ui/Button';
import { Tooltip } from '@godiet-ui/Tooltip';

import { DownloadIcon } from '@radix-ui/react-icons';

import { ExportedPlanning } from './components/Exported';

/**
 * Interface que define as propriedades aceitas pelo componente `DetailPlanningMealView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `DetailPlanningMealView`.
 *
 * @interface DetailPlanningMealViewProps
 */
export interface DetailPlanningMealViewProps {
  name: string;
  onGeneratePDF: () => void;
  meals: TMeal[];
  exportElementRef: React.RefObject<HTMLDivElement>;
  isGeneratingPDF?: boolean;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do DetailPlanningMealViewProps. E são encaminhadas para o componente dentro do DetailPlanningMealController.
 * @returns Retorna o componente da view.
 */
export function DetailPlanningMealView(props: DetailPlanningMealViewProps) {
  const { name, meals, exportElementRef, isGeneratingPDF, onGeneratePDF } =
    props;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h4>{name}</h4>
          <Tooltip content="Baixar PDF">
            <Button
              onClick={onGeneratePDF}
              isLoading={isGeneratingPDF}
              className="h-8 px-2"
              aria-label="Baixar PDF"
            >
              <DownloadIcon />
            </Button>
          </Tooltip>
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
      <ExportedPlanning name={name} meals={meals} ref={exportElementRef} />
    </>
  );
}
