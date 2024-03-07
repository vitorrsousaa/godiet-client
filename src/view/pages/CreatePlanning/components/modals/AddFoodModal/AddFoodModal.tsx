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

import { Controller } from 'react-hook-form';

import { useAddFoodModalHook } from './AddFoodModal.hook';

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
    internalFormIsValid,
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
        onSubmit={handleInternalFormSubmit}
        id="form-meal-food"
        className="flex flex-col gap-4"
      >
        <Controller
          control={internalControl}
          name="id"
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
        <div className="flex flex-col justify-between gap-2.5 sm:flex-row">
          <span className="w-full">
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
                      <SelectItem value="colher">Colher</SelectItem>
                      <SelectItem value="colher2">Colher2</SelectItem>
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

      {internalFormIsValid && (
        <>
          <Separator />
          <div>Adicionar informações sobre o alimento selecionado</div>
        </>
      )}

      <Modal.Footer>
        <Button onClick={handleOnCloseModal} variant={'destructive'}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form="form-meal-food"
          disabled={!internalFormIsValid}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
