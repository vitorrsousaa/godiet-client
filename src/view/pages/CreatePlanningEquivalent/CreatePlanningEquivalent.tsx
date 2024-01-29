import { Button } from '@godiet-components/Button';
import { Card } from '@godiet-components/Card';
import { Input } from '@godiet-components/Input';
import { SimpleInput } from '@godiet-components/SimpleInput';

import { PlusIcon, TrashIcon } from '@radix-ui/react-icons';

export function CreatePlanningEquivalent() {
  return (
    <div>
      <div className="">
        <h3 className="pb-3 text-lg font-bold text-foreground">Refeições</h3>
        <h4 className="text-sm">
          Adicione as porções em cada grupo alimentar nas refeições
        </h4>
      </div>
      <Card.Root className="text-left">
        <Card.Header>
          <Card.Title className="flex w-full items-center justify-between">
            {''}
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex w-full flex-col gap-2 sm:gap-8">
            <div className="flex w-full flex-row items-center   gap-4 ">
              <small className="w-24">Horário</small>
              <small className="w-48">Nome da refeição</small>
              <small className="w-[700px]">Icones</small>
              <small className="w-24">Menu</small>
              <small className="w-24">...</small>
            </div>
            <div className="flex w-full flex-row items-center gap-4">
              <div className="w-24">
                <Input type="time" name="time" className="pt-0" />
              </div>
              <div className="w-48">
                <Input type="text" name="ref" placeholder="Refeição" />
              </div>
              <div className="flex w-[700px] flex-row gap-2">
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
                <SimpleInput
                  type="number"
                  name="group"
                  placeholder=" "
                  min={0}
                  className="w-12"
                />
              </div>
              <div className="flex w-24 flex-row gap-2">
                <Button variant="outline" className="">
                  C
                </Button>
                <Button variant={'destructive'} className="">
                  <TrashIcon />
                </Button>
              </div>
              <div className=" w-24">
                <Button variant="outline" className="">
                  0 Kcal
                </Button>
              </div>
            </div>
          </div>
        </Card.Content>

        <Card.Footer>
          <Button>
            <PlusIcon />
            Adicionar nova refeição
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
}
