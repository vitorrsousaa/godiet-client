import { ReactNode } from 'react';

import { Button } from '@godiet-ui/Button';
import { Card } from '@godiet-ui/Card';
import { Input } from '@godiet-ui/Input';

import { TrashIcon } from '@radix-ui/react-icons';

import { useCreateMealHook } from './CreateMeal.hook';

export interface CreateMealProps {
  children: ReactNode;
  mealIndex: number;
  onRemoveMeal: () => void;
}

export function CreateMeal(props: CreateMealProps) {
  const { children, mealIndex, onRemoveMeal } = props;

  const { register } = useCreateMealHook(props);

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
      <Card.Content>
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
      </Card.Content>

      <Card.Footer>{children}</Card.Footer>
    </Card.Root>
  );
}
