import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { DangerModal } from '@godiet-ui/DangerModal';
import { Input } from '@godiet-ui/Input';
import { Separator } from '@godiet-ui/Separator';

import { TrashIcon } from '@radix-ui/react-icons';

import { AddFoodModal } from '../modals/AddFoodModal';
import { EditFoodModal } from '../modals/EditFoodModal';
import { TableInfo } from '../TableInfo';

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
        <Card.Title className="flex w-full items-center justify-between">
          Refeição {mealIndex + 1}
          <Button
            variant={'destructive'}
            className="h-8 px-2"
            onClick={onRemoveMeal}
          >
            <TrashIcon />
          </Button>
        </Card.Title>
        <Card.Description>Adicione as informações da refeição</Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-8">
          <div className="w-full">
            <Input
              placeholder="Nome da refeição"
              className="w-full"
              {...register(`meals.${mealIndex}.name`)}
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Horário"
              type="time"
              className="w-full"
              {...register(`meals.${mealIndex}.time`)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 min-[430px]:flex-row min-[430px]:items-center">
          <Button onClick={toggleModalAddFoodOpen}>Adicionar alimento</Button>
          <Button>Adicionar observações</Button>
        </div>

        <Separator />
      </Card.Content>

      <Card.Footer className="flex flex-col">
        <h1 className="text-md mt-4 font-semibold text-muted-foreground">
          Alimentos selecionados
        </h1>
        <TableInfo
          mealIndex={mealIndex}
          onOpenModalRemove={handleOpenModalRemoveFood}
          onOpenModalEdit={handleOpenModalEditFood}
        />
      </Card.Footer>

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