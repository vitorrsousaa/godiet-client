import React from 'react';

import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { Input } from '@godiet-ui/Input';
import { Spinner } from '@godiet-ui/Spinner';

import { DevTool } from '@hookform/devtools';
import { TrashIcon } from '@radix-ui/react-icons';
import { FormProvider } from 'react-hook-form';

import { CreateCategoriesInput } from './components/CreateCategoriesInput';
import { HeaderContent } from './components/HeaderContent';
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
    selectedCategories,
    control,
    formIsValid,
    isFetchingPatient,
    isErrorPatient,
    isCreatingPlanningMeal,
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
      {isFetchingPatient ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="h-14 w-14" />
        </div>
      ) : isErrorPatient ? (
        <div className="mt-8 flex w-full items-center justify-center text-center">
          <p className="max-w-[540px] text-center text-xl">
            Tivemos um erro para encontrar este paciente, por favor. Reinicie e
            tente novamente.
          </p>
        </div>
      ) : (
        <>
          <FormProvider {...formMethods}>
            <DevTool control={control} />
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
                              <HeaderContent mealIndex={index} />
                              <div className="grid w-full grid-cols-3 place-items-center gap-4 sm:grid-cols-5 md:grid-cols-9 lg:grid-cols-12 xl:grid-cols-16">
                                {formatedCategories.map(
                                  (category, categoryIndex) => (
                                    <CreateCategoriesInput
                                      category={category}
                                      categoryIndex={categoryIndex}
                                      mealIndex={index}
                                      key={`category-${category.id}-meal-${meal.id}`}
                                    />
                                  )
                                )}
                              </div>
                            </Card.Content>

                            <Card.Footer>
                              <Button
                                onClick={toggleIncreaseFoodModal}
                                disabled={
                                  !hasCategories(index) ||
                                  isCreatingPlanningMeal
                                }
                              >
                                Selecionar alimentos
                              </Button>
                              <Button disabled={isCreatingPlanningMeal}>
                                Adicionar observações
                              </Button>
                            </Card.Footer>
                          </Card.Root>
                          <IncreaseFoodModal
                            isOpen={increaseFoodModalOpen}
                            onClose={toggleIncreaseFoodModal}
                            mealIndex={index}
                            selectedCategories={selectedCategories[index]}
                          />
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="mt-8 space-x-4">
                    <Button
                      type="button"
                      onClick={handleAddNewMeal}
                      disabled={isCreatingPlanningMeal}
                    >
                      Adicionar nova refeição
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!formIsValid}
                      isLoading={isCreatingPlanningMeal}
                    >
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
        </>
      )}
    </div>
  );
}
