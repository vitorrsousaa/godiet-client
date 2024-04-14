import { Button } from '@godiet-ui/Button';
import { Combobox } from '@godiet-ui/Combobox';
import { FormField } from '@godiet-ui/FormField';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';
import { ScrollArea } from '@godiet-ui/ScrollArea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@godiet-ui/Select';
import { Separator } from '@godiet-ui/Separator';
import { SimpleInput } from '@godiet-ui/SimpleInput';
import { Tooltip } from '@godiet-ui/Tooltip';

import { TrashIcon } from '@radix-ui/react-icons';

import { useModalCreateFavoriteMealHook } from './ModalCreateFavoriteMeal.hook';

export interface ModalCreateFavoriteMealProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalCreateFavoriteMeal(props: ModalCreateFavoriteMealProps) {
  const { isOpen } = props;

  const {
    handleCloseModal,
    handleSubmit,
    handleAppendMealFood,
    removeMeal,
    formIsValid,
    isCreatingFavoriteMeal,
    mealFoods,
    foods,
    control,
    internalControl,
    isFetchingFoods,
    foodOptions,
    measureOptions,
  } = useModalCreateFavoriteMealHook(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={handleCloseModal}
      className="max-w-[640px]"
    >
      <Modal.Header>
        <Modal.Title>Criar uma nova refeição favorita</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para criar uma nova refeiçao favorita.
        </Modal.Description>
      </Modal.Header>

      <ScrollArea className="pb-4 pt-4">
        <div className="flex max-h-80 flex-col gap-2">
          <form
            id="modal-create-favorite-meal"
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <FormField.Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <FormField.Item>
                  <FormField.Label>Nome da refeição</FormField.Label>
                  <FormField.Control>
                    <Input
                      name="name"
                      placeholder="Refeição favorita"
                      value={value}
                      onChange={onChange}
                      disabled={isCreatingFavoriteMeal}
                      minVersion
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Dê um nome para a sua refeição favorita
                  </FormField.Description>
                  <FormField.Message />
                </FormField.Item>
              )}
            />

            <FormField.Controller
              control={internalControl}
              name="foodId"
              render={({ field: { value, onChange } }) => (
                <FormField.Item>
                  <FormField.Label>Alimento</FormField.Label>
                  <FormField.Control>
                    <Combobox
                      isLoading={isFetchingFoods || isCreatingFavoriteMeal}
                      placeholder="Selecione um alimento"
                      options={foodOptions}
                      value={value}
                      onChange={onChange}
                      emptyMessage="Nenhum alimento encontrado"
                    />
                  </FormField.Control>
                </FormField.Item>
              )}
            />

            <div className="flex flex-row items-center gap-2">
              <FormField.Controller
                control={internalControl}
                name="measure"
                render={({ field: { value, onChange } }) => (
                  <FormField.Item className="w-full">
                    <FormField.Label>Medida</FormField.Label>
                    <FormField.Control>
                      <Select
                        value={value}
                        onValueChange={onChange}
                        disabled={isCreatingFavoriteMeal}
                      >
                        <SelectTrigger className="h-8  data-[placeholder]:text-muted-foreground sm:h-[3.25rem] ">
                          <SelectValue placeholder="Selecione a unidade de medida" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {measureOptions.map((measure, index) => (
                              <SelectItem
                                value={measure.name}
                                key={`measure-${index}-${measure.name}`}
                              >
                                {measure.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormField.Control>
                  </FormField.Item>
                )}
              />

              <FormField.Controller
                control={internalControl}
                name="qty"
                render={({ field: { value, onChange } }) => (
                  <FormField.Item className="w-full">
                    <FormField.Label>Quantidade</FormField.Label>
                    <FormField.Control>
                      <SimpleInput
                        value={parseFloat(value.toString())}
                        onChange={(event) => {
                          // const newValue = event.target.value.replace(/^0+/, '');
                          // const numberValue = parseFloat(newValue);

                          onChange(event.target.valueAsNumber);
                        }}
                        disabled={isCreatingFavoriteMeal}
                        placeholder="Adicione a quantidade"
                      />
                    </FormField.Control>
                  </FormField.Item>
                )}
              />
            </div>
          </form>

          <Button
            onClick={handleAppendMealFood}
            disabled={isCreatingFavoriteMeal}
          >
            Adicionar
          </Button>

          <Separator />

          {mealFoods.map((mealFood, index) => {
            const selectedFood = foods.find(
              (food) => food.id === mealFood.foodId
            );

            if (!selectedFood) return;

            return (
              <div
                key={`meal-food-${mealFood.id}`}
                className="flex items-center justify-between"
              >
                <div className="flex flex-col ">
                  <small>{selectedFood.name}</small>
                  <small>
                    {mealFood.qty} - {mealFood.measure}
                  </small>
                </div>

                <div>
                  <Tooltip content="Remover alimento">
                    <Button
                      variant={'destructive'}
                      className="h-6 px-1"
                      onClick={() => removeMeal(index)}
                      disabled={isCreatingFavoriteMeal}
                    >
                      <TrashIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      <Modal.Footer>
        <Button
          onClick={handleCloseModal}
          variant={'destructive'}
          disabled={isCreatingFavoriteMeal}
        >
          Cancelar
        </Button>
        <Button
          disabled={!formIsValid}
          type="submit"
          form="modal-create-favorite-meal"
          isLoading={isCreatingFavoriteMeal}
        >
          Criar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
