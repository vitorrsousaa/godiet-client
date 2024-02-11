import { Button } from '@godiet-components/Button';
import { Card } from '@godiet-components/Card';
import { formatDate } from '@godiet-utils/formatDate';

import {
  DownloadIcon,
  ExternalLinkIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { usePlanningMealHook } from './PlanningMeal.hook';

export function PlanningMeal() {
  const { isFetching, planningMeals, handleNavigateToCreatePlanning } =
    usePlanningMealHook();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold ">Planejamento alimentar</h1>
        <Button onClick={handleNavigateToCreatePlanning}>Criar novo</Button>
      </section>
      {isFetching ? (
        <div>Carregando...</div>
      ) : planningMeals.length > 0 ? (
        <>
          {planningMeals.map((planningMeal) => {
            return (
              <Card.Root key={`planning-meal-${planningMeal.id}`}>
                <Card.Header>
                  <Card.Title className="flex w-full items-center justify-between">
                    {planningMeal.name}{' '}
                    <div className="flex gap-2 [&>button]:h-8 [&>button]:px-2">
                      <Button>
                        <DownloadIcon />
                      </Button>
                      <Button>
                        <ExternalLinkIcon />
                      </Button>
                      <Button variant={'destructive'} type="button">
                        <TrashIcon />
                      </Button>
                    </div>
                  </Card.Title>
                  <Card.Description>
                    Criado em: {formatDate(planningMeal.createdAt, 'PP')}
                  </Card.Description>
                </Card.Header>
              </Card.Root>
            );
          })}
        </>
      ) : (
        <>
          <div className="mt-10 flex flex-col items-center justify-center gap-8 text-center">
            <p className="max-w-[540px]">
              Esse paciente ainda não possui planejamento alimentar. Clique no
              botão abaixo para criar um novo planejamento alimentar para o
              paciente.
            </p>
            <Button onClick={handleNavigateToCreatePlanning}>
              Adicionar novo plano
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
