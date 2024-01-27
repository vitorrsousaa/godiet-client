import { useCallback, useState } from 'react';

import { Button } from '@godiet-components/Button';
import { Card } from '@godiet-components/Card';
import { Input } from '@godiet-components/Input';

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

import { AddFoodModal } from './components/modals/AddFoodModal';

export function CreatePlanning() {
  const [hasMeals, setHasMeals] = useState(false);
  const [addFoodModalOpen, setAddFoodModalOpen] = useState(false);

  const toggleAddFoodModal = useCallback(() => {
    setAddFoodModalOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="pb-2 text-lg font-bold text-foreground">Informações</h3>
        <Input name="description" placeholder="Descrição" />
      </div>
      <div>
        <h3 className="pb-3 text-lg font-bold text-foreground">Refeições</h3>
        <div className="flex flex-col items-center justify-center gap-4">
          {hasMeals ? (
            <>
              <span>
                Este planejamento alimentar ainda não possui refeições.
              </span>
              <Button onClick={() => setHasMeals((prevState) => !prevState)}>
                <PlusIcon className="h-6 w-6" />
                Adicionar refeição
              </Button>
            </>
          ) : (
            <div className="w-full text-center">
              <Card.Root className="text-left">
                <Card.Header>
                  <Card.Title className="flex w-full items-center justify-between">
                    Refeição 1
                    <Button variant={'destructive'} className="h-8 px-2">
                      <TrashIcon />
                    </Button>
                  </Card.Title>
                  <Card.Description>
                    Adicione as informações da refeição
                  </Card.Description>
                </Card.Header>
                <Card.Content>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-8">
                    <div className="w-full">
                      <Input
                        name="name"
                        placeholder="Nome da refeição"
                        className="w-full"
                      />
                    </div>
                    <div className="w-full">
                      <Input
                        name="time"
                        placeholder="Horário"
                        type="time"
                        className="w-full"
                      />
                    </div>
                  </div>
                </Card.Content>

                <Card.Footer>
                  <Button onClick={toggleAddFoodModal}>
                    Adicionar alimento
                  </Button>
                </Card.Footer>
              </Card.Root>
              <Button>
                <PlusIcon className="h-6 w-6" />
                Adicionar refeição
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddFoodModal onClose={toggleAddFoodModal} isOpen={addFoodModalOpen} />
    </div>
  );
}
