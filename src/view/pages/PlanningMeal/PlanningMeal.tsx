import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { Tooltip } from '@godiet-ui/Tooltip';
import { formatDate } from '@godiet-utils/formatDate';

import {
  ExternalLinkIcon,
  Pencil1Icon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { PlanningMealError } from './PlanningMeal.error';
import { usePlanningMealHook } from './PlanningMeal.hook';

export function PlanningMeal() {
  const {
    isFetching,
    planningMeals,
    isDeletingPlanningMeal,
    isDeletePlanningModalOpen,
    isErrorPlanningMeals,
    isFetchingPlanningMeals,
    toggleModalDeletePlanning,
    handleDeletePlanningMeal,
    handleNavigateToCreatePlanning,
    handleNavigateToShowPlanning,
    handleNavigateToEditPlanning,
  } = usePlanningMealHook();

  return (
    <div className="mb-8 flex flex-col gap-6">
      <section className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold ">Planejamento alimentar</h1>
        <Button
          onClick={handleNavigateToCreatePlanning}
          isLoading={isFetchingPlanningMeals}
        >
          Criar novo
        </Button>
      </section>
      {isFetching ? (
        <div>Carregando...</div>
      ) : isErrorPlanningMeals ? (
        <PlanningMealError />
      ) : planningMeals.length > 0 ? (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 ">
          {planningMeals.map((planningMeal) => {
            return (
              <Card.Root key={`planning-meal-${planningMeal.id}`}>
                <Card.Header>
                  <Card.Title className="flex w-full items-center justify-between">
                    {planningMeal.name}
                    <div className="flex gap-1 [&>button]:h-8 [&>button]:px-2">
                      <Tooltip content="Editar plano">
                        <Button
                          variant={'outline'}
                          onClick={() =>
                            handleNavigateToEditPlanning(planningMeal.id)
                          }
                        >
                          <Pencil1Icon />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Exibir plano">
                        <Button
                          onClick={() =>
                            handleNavigateToShowPlanning(planningMeal.id)
                          }
                        >
                          <ExternalLinkIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Deletar plano">
                        <Button
                          variant={'destructive'}
                          type="button"
                          onClick={() =>
                            toggleModalDeletePlanning(planningMeal.id)
                          }
                        >
                          <TrashIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </Card.Title>
                  <Card.Description>
                    Criado em: {formatDate(planningMeal.createdAt, 'PP')}
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <div className="flex flex-col">
                    <small>
                      Carboidratos: {planningMeal.summary.carb.toFixed(2)}g
                    </small>
                    <small>
                      Proteína: {planningMeal.summary.prot.toFixed(2)}g
                    </small>
                    <small>
                      Lipídeos: {planningMeal.summary.fat.toFixed(2)}g
                    </small>
                    <small>
                      Calorias: {planningMeal.summary.energy.toFixed(2)}kcal
                    </small>
                  </div>
                </Card.Content>
              </Card.Root>
            );
          })}
        </div>
      ) : (
        <>
          <div className="mt-10 flex flex-col items-center justify-center gap-8 text-center">
            <p className="max-w-[540px]">
              Esse paciente ainda não possui planejamento alimentar. Clique no
              botão abaixo para criar um novo planejamento alimentar para o
              paciente.
            </p>
            <Button
              onClick={handleNavigateToCreatePlanning}
              isLoading={isFetchingPlanningMeals}
            >
              Adicionar novo plano
            </Button>
          </div>
        </>
      )}

      <DangerModal
        isOpen={isDeletePlanningModalOpen}
        description="Atenção, esta ação não pode ser desfeita."
        onClose={() => toggleModalDeletePlanning(null)}
        onConfirm={handleDeletePlanningMeal}
        title="Deletar plano alimentar"
        isLoading={isDeletingPlanningMeal}
      />
    </div>
  );
}
