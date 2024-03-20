import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@godiet-ui/Select';
import { SelectAutoComplete } from '@godiet-ui/SelectAutoComplete';
import { Separator } from '@godiet-ui/Separator';
import { SimpleInput } from '@godiet-ui/SimpleInput';
import { Tooltip } from '@godiet-ui/Tooltip';

import { TrashIcon } from '@radix-ui/react-icons';
import { Controller } from 'react-hook-form';

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
      className="max-h-full overflow-y-auto"
    >
      <Modal.Header>
        <Modal.Title>Criar uma nova refeição favorita</Modal.Title>

        <Modal.Description>
          Preencha os dados abaixo para criar uma nova refeiçao favorita.
        </Modal.Description>
      </Modal.Header>
      <form
        id="modal-create-favorite-meal"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              name="name"
              placeholder="Nome da refeição"
              value={value}
              onChange={onChange}
            />
          )}
        />

        <div>
          <Controller
            control={internalControl}
            name="foodId"
            render={({ field: { value, onChange } }) => (
              <SelectAutoComplete
                isLoading={isFetchingFoods}
                placeholder="Selecione um alimento"
                options={foodOptions}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Controller
          control={internalControl}
          name="measure"
          render={({ field: { value, onChange } }) => (
            <Select value={value} onValueChange={onChange}>
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
          )}
        />

        <Controller
          control={internalControl}
          name="qty"
          render={({ field: { value, onChange } }) => (
            <SimpleInput
              value={parseFloat(value.toString())}
              onChange={(event) => {
                // const newValue = event.target.value.replace(/^0+/, '');
                // const numberValue = parseFloat(newValue);

                onChange(event.target.valueAsNumber);
              }}
              placeholder="Adicione a quantidade"
            />
          )}
        />
      </form>

      <Button onClick={handleAppendMealFood} disabled={isCreatingFavoriteMeal}>
        Adicionar
      </Button>

      <Separator />

      {mealFoods.map((mealFood, index) => {
        const selectedFood = foods.find((food) => food.id === mealFood.foodId);

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
                >
                  <TrashIcon />
                </Button>
              </Tooltip>
            </div>
          </div>
        );
      })}

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
