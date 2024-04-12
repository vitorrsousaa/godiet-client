import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { Input } from '@godiet-ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@godiet-ui/Select';
import { Separator } from '@godiet-ui/Separator';
import { Tooltip } from '@godiet-ui/Tooltip';

import {
  ClipboardIcon,
  StarIcon,
  SymbolIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { Controller, UseFieldArrayAppend } from 'react-hook-form';

import { AddFoodModal } from '../modals/AddFoodModal';
import { EditFoodModal } from '../modals/EditFoodModal';
import { SaveMealModal } from '../modals/SaveMealModal';
import { SetFavoriteMealModal } from '../modals/SetFavoriteMealModal';
import { SetObservationMeal } from '../modals/SetObservationMeal';
import { TableFoodsByMeal } from '../TableFoodsByMeal';

import { useCreateMealHook } from './create-meal.hook';

export interface CreateMealProps {
  mealIndex: number;
  onAddMeal: UseFieldArrayAppend<TCreatePlanningMealDTO, 'meals'>;
  onRemoveMeal: () => void;
  isSubmitting?: boolean;
}

export function CreateMeal(props: CreateMealProps) {
  const { mealIndex, isSubmitting, onRemoveMeal } = props;

  const {
    defaultMealTitles,
    control,
    modalAddFoodIsOpen,
    hashKeyOfEditFoodModal,
    selectedMealIndex,
    modalUseFavoriteMealIsOpen,
    modalAddFavoriteMealIsOpen,
    hashKeyOfStarMealFood,
    modalEditFoodIsOpen,
    modalRemoveFoodIsOpen,
    selectedFoodToEdit,
    modalAddObservationIsOpen,
    initialObservation,
    toggleModalAddObservationOpen,
    handleCloseModalRemoveFood,
    toggleModalAddFavoriteMealOpen,
    handleCloseModalEditFood,
    handleRemoveMealFood,
    handleOpenModalRemoveFood,
    handleOpenModalEditFood,
    toggleModalUseFavoriteMealOpen,
    register,
    toggleModalAddFoodOpen,
    handleDuplicateMeal,
  } = useCreateMealHook(props);

  return (
    <Card.Root className="text-left">
      <Card.Header>
        <Card.Title className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
          Refeição {mealIndex + 1}
          <div className="space-x-2">
            <Tooltip content="Duplicar refeição">
              <Button
                variant={'outline'}
                className="h-8 px-2"
                onClick={handleDuplicateMeal}
                disabled={isSubmitting}
              >
                <ClipboardIcon />
              </Button>
            </Tooltip>
            <Tooltip content={'Selecionar refeição favorita'}>
              <Button
                variant={'outline'}
                className="h-8 px-2"
                onClick={toggleModalUseFavoriteMealOpen}
                disabled={isSubmitting}
              >
                <SymbolIcon />
              </Button>
            </Tooltip>
            <Tooltip content={'Favoritar refeição'}>
              <Button
                variant={'outline'}
                className="h-8 px-2"
                onClick={toggleModalAddFavoriteMealOpen}
                disabled={isSubmitting}
              >
                <StarIcon />
              </Button>
            </Tooltip>
            <Tooltip content={'Remover refeição'}>
              <Button
                variant={'destructive'}
                className="h-8 px-2"
                onClick={onRemoveMeal}
                disabled={isSubmitting}
              >
                <TrashIcon />
              </Button>
            </Tooltip>
          </div>
        </Card.Title>
        <Card.Description className="text-center sm:text-left">
          Adicione as informações da refeição
        </Card.Description>
      </Card.Header>

      <Card.Content className="flex flex-col items-center gap-2 ">
        <div className="flex w-full flex-col gap-2 min-[400px]:w-full min-[400px]:flex-row">
          <Input
            placeholder="Horário"
            type="time"
            minVersion
            className="h-8 w-full min-[400px]:max-w-24 "
            disabled={isSubmitting}
            {...register(`meals.${mealIndex}.time`)}
          />
          <div className="w-full">
            <Controller
              control={control}
              name={`meals.${mealIndex}.name`}
              render={({ field: { value, onChange, name } }) => {
                if (value.length === 0) {
                  return (
                    <Select
                      onValueChange={onChange}
                      name={name}
                      value={value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-8 w-full">
                        <SelectValue
                          className="bg-red-400"
                          placeholder="Nome da refeição"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {defaultMealTitles.map((title, index) => (
                            <SelectItem
                              key={`select-item-${title.value}-${index}`}
                              value={title.value}
                            >
                              {title.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  );
                }

                return (
                  <Input
                    placeholder="Nome da refeição"
                    className="w-full "
                    minVersion
                    value={value}
                    onChange={onChange}
                    name={name}
                    disabled={isSubmitting}
                  />
                );
              }}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Button onClick={toggleModalAddFoodOpen} disabled={isSubmitting}>
            Adicionar alimento
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={toggleModalAddObservationOpen}
          >
            Adicionar observações
          </Button>
        </div>
      </Card.Content>

      <Separator />

      <Card.Footer className="flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-md mt-4 font-semibold text-muted-foreground">
            Alimentos selecionados
          </h1>
          <small className="text-muted-foreground">
            Você pode editar o título dos alimentos selecionados na tabela
            abaixo.
          </small>
        </div>
        <TableFoodsByMeal
          mealIndex={mealIndex}
          onOpenModalRemove={handleOpenModalRemoveFood}
          onOpenModalEdit={handleOpenModalEditFood}
        />
      </Card.Footer>

      <SaveMealModal
        isOpen={modalAddFavoriteMealIsOpen}
        onClose={toggleModalAddFavoriteMealOpen}
        mealIndex={mealIndex}
        key={hashKeyOfStarMealFood}
      />

      <SetObservationMeal
        onClose={toggleModalAddObservationOpen}
        isOpen={modalAddObservationIsOpen}
        mealIndex={mealIndex}
        initialObservation={initialObservation}
      />

      <SetFavoriteMealModal
        isOpen={modalUseFavoriteMealIsOpen}
        onClose={toggleModalUseFavoriteMealOpen}
        mealIndex={mealIndex}
      />

      <EditFoodModal
        key={hashKeyOfEditFoodModal}
        isOpen={modalEditFoodIsOpen}
        onClose={handleCloseModalEditFood}
        mealIndex={selectedMealIndex}
        initialValues={selectedFoodToEdit!}
      />

      <DangerModal
        isOpen={modalRemoveFoodIsOpen}
        onClose={handleCloseModalRemoveFood}
        onConfirm={handleRemoveMealFood}
        description="Tem certeza que você deseja remover este alimento ?"
        title="Esta ação não pode ser desfeita"
      />

      <AddFoodModal
        onClose={toggleModalAddFoodOpen}
        isOpen={modalAddFoodIsOpen}
        mealIndex={mealIndex}
      />
    </Card.Root>
  );
}
