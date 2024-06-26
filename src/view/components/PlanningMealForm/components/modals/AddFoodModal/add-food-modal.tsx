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
import { Separator } from '@godiet-ui/Separator';

import { Controller } from 'react-hook-form';

import { useAddFoodModalHook } from './add-food-modal.hook';

export interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
}

export function AddFoodModal(props: AddFoodModalProps) {
  const { isOpen } = props;

  const {
    foodOptions,
    isFetchingFoods,
    internalControl,
    formIsValid,
    measureOptions,
    handleInternalFormSubmit,
    handleOnCloseModal,
  } = useAddFoodModalHook(props);

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
        <Modal.Title>Adicionando um novo alimento</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>

      <form
        id="form-add-meal-food"
        onSubmit={(event) => {
          event?.stopPropagation();
          handleInternalFormSubmit(event);
        }}
        className="mb-4 mt-4 flex flex-col gap-4"
      >
        <Controller
          control={internalControl}
          name="id"
          render={({ field: { value, onChange } }) => (
            <Combobox
              isLoading={isFetchingFoods}
              placeholder="Selecione um alimento"
              options={foodOptions}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <div className="flex flex-col justify-between gap-2.5 sm:flex-row">
          <span className="w-full">
            <Controller
              control={internalControl}
              name="measure"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value.name}
                  onValueChange={(value) => {
                    const selectedMeasure = measureOptions.find(
                      (measure) => measure.name === value
                    );

                    onChange(selectedMeasure);
                  }}
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
              )}
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
                  minVersion={false}
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
        <Button form="form-add-meal-food" type="submit" disabled={!formIsValid}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
