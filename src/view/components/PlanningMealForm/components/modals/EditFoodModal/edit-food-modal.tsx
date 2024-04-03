import { TCreateMealFoodDTO } from '@godiet-components/PlanningMealForm';
import { Button } from '@godiet-ui/Button';
import { Combobox } from '@godiet-ui/Combobox';
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

import { Separator } from '@radix-ui/react-separator';
import { Controller } from 'react-hook-form';

import { useEditFoodModalHook } from './edit-food-modal.hook';

type InitialValues = TCreateMealFoodDTO & { mealFoodIndex: number };

export interface EditFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
  initialValues: InitialValues;
}

export function EditFoodModal(props: EditFoodModalProps) {
  const { isOpen } = props;

  const {
    foodOptions,
    isFetchingFoods,
    internalControl,
    formIsValid,
    measureOptions,
    handleInternalFormSubmit,
    handleOnCloseModal,
    handleChangeSelectAutoComplete,
  } = useEditFoodModalHook(props);

  // TODO- ADICIONAR ITENS QUANDO ESTIVER PESQUISANDO PELO ALIMENTO
  // - Medida caseira usual
  // - Porção (quantas gramas tem)
  // - Referência (tabela TACO)

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={handleOnCloseModal}
      className="max-w-[740px]"
    >
      <Modal.Header>
        <Modal.Title>Editando o alimento</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>

      <form
        onSubmit={(event) => {
          event?.stopPropagation();
          handleInternalFormSubmit(event);
        }}
        id="form-meal-food"
        className="flex flex-col gap-4"
      >
        <Controller
          control={internalControl}
          name="foodId"
          render={({ field: { value, onChange } }) => (
            <Combobox
              isLoading={isFetchingFoods}
              placeholder="Selecione um alimento"
              options={foodOptions}
              value={value}
              onChange={(newValue) =>
                handleChangeSelectAutoComplete({
                  onChange,
                  newValue,
                })
              }
            />
          )}
        />
        <div className="flex flex-col justify-between gap-2.5 sm:flex-row">
          <span className="w-full">
            <Controller
              control={internalControl}
              name="measure"
              render={({ field: { value, onChange } }) => {
                return (
                  <Select
                    value={value.name}
                    onValueChange={(event) => {
                      const selectedMeasure = measureOptions.find(
                        (measure) => measure.name === event
                      );

                      if (!selectedMeasure) {
                        onChange(measureOptions[0]);
                      }

                      onChange(selectedMeasure);
                    }}
                  >
                    <SelectTrigger className="h-8 data-[placeholder]:text-muted-foreground sm:h-[3.25rem] ">
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
                );
              }}
            />
          </span>
          <span className="w-full">
            <Controller
              control={internalControl}
              name="qty"
              render={({ field: { value, onChange, name } }) => (
                <Input
                  placeholder="Quantidade do alimento"
                  type="number"
                  value={value}
                  onChange={(event) => {
                    const newValue = event.target.value.replace(/^0+/, '');
                    const numberValue = parseFloat(newValue);

                    if (numberValue) {
                      onChange(parseFloat(newValue));
                    } else {
                      onChange(0);
                    }
                  }}
                  name={name}
                />
              )}
            />
          </span>
        </div>
      </form>

      {formIsValid && (
        <>
          <Separator />
          <div>Adicionar informações sobre o alimento selecionado</div>
        </>
      )}

      <Modal.Footer>
        <Button onClick={handleOnCloseModal} variant={'destructive'}>
          Cancelar
        </Button>
        <Button type="submit" form="form-meal-food" disabled={!formIsValid}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
