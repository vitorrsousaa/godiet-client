import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { Input } from '@godiet-ui/Input';
import { Separator } from '@godiet-ui/Separator';

import { TrashIcon } from '@radix-ui/react-icons';

import { AddFoodModal } from '../modals/AddFoodModal';

import { useCreateMealHook } from './CreateMeal.hook';

export interface CreateMealProps {
  mealIndex: number;
  onRemoveMeal: () => void;
}

export function CreateMeal(props: CreateMealProps) {
  const { mealIndex, onRemoveMeal } = props;

  const { modalAddFoodIsOpen, toggleModalAddFoodOpen, register } =
    useCreateMealHook(props);

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
        <div className="flex items-center gap-4">
          <Button onClick={toggleModalAddFoodOpen}>Adicionar alimento</Button>
          <Button>Adicionar observações</Button>
        </div>

        <Separator />
      </Card.Content>

      <Card.Footer>
        <div>informações sobre os alimentos</div>
      </Card.Footer>

      <AddFoodModal
        onClose={toggleModalAddFoodOpen}
        isOpen={modalAddFoodIsOpen}
      />
    </Card.Root>
  );
}
