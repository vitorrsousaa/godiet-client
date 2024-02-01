import React from 'react';

import { Button } from '@godiet-components/Button';
import { Card } from '@godiet-components/Card';
import { CategoryIcon } from '@godiet-components/icons/CategoryIcon';
import { Input } from '@godiet-components/Input';
import { SimpleInput } from '@godiet-components/SimpleInput';
import { Spinner } from '@godiet-components/Spinner';
import { Tooltip } from '@godiet-components/Tooltip';

import { TrashIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';

import { IncreaseFoodModal } from './components/modals/IncreaseFoodModal';
import { useCreatePlanningEquivalenteHook } from './CreatePlanningEquivalent.hook';

export function CreatePlanningEquivalent() {
  const {
    formatedCategories,
    isFetchingCategories,
    meals,
    formMethods,
    increaseFoodModalOpen,
    errors,
    prefetchFoods,
    hasCategories,
    toggleIncreaseFoodModal,
    register,
    handleSubmit,
    handleAddNewMeal,
    handleRemoveMeal,
  } = useCreatePlanningEquivalenteHook();

  return (
    <div className="h-full">
      <div className="mb-4">
        <h3 className="pb-3 text-lg font-bold text-foreground">Refeições</h3>
        <h4 className="text-sm">
          Adicione as porções em cada grupo alimentar nas refeições
        </h4>
      </div>
      <FormProvider {...formMethods}>
        <form>
          {!isFetchingCategories ? (
            <>
              <div className="mb-4">
                <Input
                  {...register('name')}
                  placeholder="Nome do plano alimentar"
                  type="text"
                  error={errors.name?.message}
                />
              </div>

              <div className="flex flex-col gap-4">
                {meals.map((meal, index) => {
                  return (
                    <React.Fragment key={`meal-form-${index}-${meal.id}}`}>
                      <Card.Root>
                        <Card.Header>
                          <Card.Title className="flex w-full items-center justify-between">
                            Refeição {index + 1}
                            <Button
                              variant={'destructive'}
                              className="h-8 px-2"
                              type="button"
                              onClick={() => handleRemoveMeal(index)}
                            >
                              <TrashIcon />
                            </Button>
                          </Card.Title>
                          <Card.Description>
                            Adicione as informações da refeição
                          </Card.Description>
                        </Card.Header>
                        <Card.Content>
                          <div className="mb-5 flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-8">
                            <div className="w-full">
                              <Input
                                placeholder="Nome da refeição"
                                className="w-full"
                                {...register(`meals.${index}.name`)}
                                error={errors.meals?.[index]?.name?.message}
                              />
                            </div>
                            <div className="w-full">
                              <Input
                                placeholder="Horário"
                                type="time"
                                className="w-full"
                                {...register(`meals.${index}.time`)}
                                error={errors.meals?.[index]?.time?.message}
                              />
                            </div>
                            <Button variant="outline" className="">
                              0 Kcal
                            </Button>
                          </div>
                          <div className="grid w-full grid-cols-3 place-items-center gap-4 sm:grid-cols-5 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-16">
                            {formatedCategories.map(
                              (category, categoryIndex) => (
                                <div
                                  className="flex flex-col items-center gap-2"
                                  key={`category-${category.id}-meal-${meal.id}`}
                                >
                                  <Tooltip
                                    content={
                                      <div className="flex flex-col">
                                        <strong className="text-lg">
                                          {category.name}
                                        </strong>
                                        <p>
                                          Proteínas: {category.baseProtein}{' '}
                                          g/porção
                                        </p>
                                        <p>
                                          Lipídios: {category.baseFat} g/porção
                                        </p>
                                        <p>
                                          Carboidratos: {category.baseCarbo}
                                          g/porção
                                        </p>
                                        <p>
                                          Calorias: {category.baseEnergy}
                                          kcal/porção
                                        </p>
                                      </div>
                                    }
                                  >
                                    <CategoryIcon category={category.name} />
                                  </Tooltip>

                                  <SimpleInput
                                    placeholder="0"
                                    {...register(
                                      `meals.${index}.categories.${categoryIndex}.qty`
                                    )}
                                    onInput={() => prefetchFoods(category.id)}
                                  />

                                  <input
                                    type="hidden"
                                    {...register(
                                      `meals.${index}.categories.${categoryIndex}.id`
                                    )}
                                    value={category.id}
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </Card.Content>

                        <Card.Footer>
                          <Button
                            onClick={toggleIncreaseFoodModal}
                            disabled={!hasCategories(index)}
                          >
                            Selecionar alimentos
                          </Button>
                          <Button>Adicionar observações</Button>
                        </Card.Footer>
                      </Card.Root>
                      <IncreaseFoodModal
                        isOpen={increaseFoodModalOpen}
                        onClose={toggleIncreaseFoodModal}
                        mealIndex={index}
                      />
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="mt-8 space-x-4">
                <Button type="button" onClick={handleAddNewMeal}>
                  Adicionar nova refeição
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Criar plano alimentar
                </Button>
              </div>
            </>
          ) : (
            <div className="grid h-full w-full place-items-center">
              <Spinner />
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
