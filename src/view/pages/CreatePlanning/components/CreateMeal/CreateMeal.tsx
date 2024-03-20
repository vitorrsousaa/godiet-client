import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { Input } from '@godiet-ui/Input';
import { Separator } from '@godiet-ui/Separator';
import { Tooltip } from '@godiet-ui/Tooltip';

import {
  ClipboardIcon,
  StarIcon,
  SymbolIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { AddFoodModal } from '../modals/AddFoodModal';
import { EditFoodModal } from '../modals/EditFoodModal';
import { SetFavoriteMealModal } from '../modals/SetFavoriteMealModal';
import { StarMealModal } from '../modals/StarMealModal';
import { TableFoodsByMeal } from '../TableFoodsByMeal';

import { useCreateMealHook } from './CreateMeal.hook';

export interface CreateMealProps {
  mealIndex: number;
  onRemoveMeal: () => void;
}

export function CreateMeal(props: CreateMealProps) {
  const { mealIndex, onRemoveMeal } = props;

  const {
    modalAddFoodIsOpen,
    modalRemoveFoodIsOpen,
    modalEditFoodIsOpen,
    selectedFoodToEdit,
    generateHashKey,
    selectedMealIndex,
    modalAddFavoriteMealIsOpen,
    modalUseFavoriteMealIsOpen,
    toggleModalUseFavoriteMealOpen,
    toggleModalAddFavoriteMealOpen,
    handleCloseModalEditFood,
    handleOpenModalEditFood,
    handleRemoveMealFood,
    handleOpenModalRemoveFood,
    handleCloseModalRemoveFood,
    toggleModalAddFoodOpen,
    register,
  } = useCreateMealHook(props);

  return (
    <Card.Root className="text-left">
      <Card.Header>
        <Card.Title className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
          Refeição {mealIndex + 1}
          <div className="space-x-2">
            <Tooltip content="Duplicar refeição">
              <Button variant={'outline'} className="h-8 px-2">
                <ClipboardIcon />
              </Button>
            </Tooltip>
            <Tooltip content={'Selecionar refeição favorita'}>
              <Button
                variant={'outline'}
                className="h-8 px-2"
                onClick={toggleModalUseFavoriteMealOpen}
              >
                <SymbolIcon />
              </Button>
            </Tooltip>
            <Tooltip content={'Favoritar refeição'}>
              <Button
                variant={'outline'}
                className="h-8 px-2"
                onClick={toggleModalAddFavoriteMealOpen}
              >
                <StarIcon />
              </Button>
            </Tooltip>
            <Tooltip content={'Remover refeição'}>
              <Button
                variant={'destructive'}
                className="h-8 px-2"
                onClick={onRemoveMeal}
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
        <div className="flex flex-col gap-2 min-[400px]:w-full min-[400px]:flex-row">
          <Input
            placeholder="Horário"
            type="time"
            minVersion
            className="h-8 w-full min-[400px]:max-w-24 "
            {...register(`meals.${mealIndex}.time`)}
          />
          <div className="w-full">
            <Input
              placeholder="Nome da refeição"
              className="w-full "
              minVersion
              {...register(`meals.${mealIndex}.name`)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Button onClick={toggleModalAddFoodOpen}>Adicionar alimento</Button>
          <Button className="">Adicionar observações</Button>
        </div>
      </Card.Content>

      <Separator />

      <Card.Footer className="flex flex-col gap-2">
        <h1 className="text-md mt-4 font-semibold text-muted-foreground">
          Alimentos selecionados
        </h1>
        <TableFoodsByMeal
          mealIndex={mealIndex}
          onOpenModalRemove={handleOpenModalRemoveFood}
          onOpenModalEdit={handleOpenModalEditFood}
        />
      </Card.Footer>

      <StarMealModal
        isOpen={modalAddFavoriteMealIsOpen}
        onClose={toggleModalAddFavoriteMealOpen}
        mealIndex={mealIndex}
      />

      <SetFavoriteMealModal
        isOpen={modalUseFavoriteMealIsOpen}
        onClose={toggleModalUseFavoriteMealOpen}
        mealIndex={mealIndex}
      />

      <EditFoodModal
        key={generateHashKey}
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
