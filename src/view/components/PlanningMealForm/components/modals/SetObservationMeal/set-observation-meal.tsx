import { Button } from '@godiet-ui/Button';
import { Combobox } from '@godiet-ui/Combobox';
import { FormField } from '@godiet-ui/FormField';
import { Modal } from '@godiet-ui/Modal';
import { ScrollArea } from '@godiet-ui/ScrollArea';
import { TextEditor } from '@godiet-ui/TextEditor';

import { useSetObservationMealHook } from './set-observation-meal.hook';

export interface SetObservationMealProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
}

export function SetObservationMeal(props: SetObservationMealProps) {
  const { isOpen, onClose } = props;

  const {
    favoritesObservationsOptions,
    isErrorFavoritesObservation,
    isFetchingFavoritesObservation,
    internalControl,
    handleAppendText,
    handleSubmit,
  } = useSetObservationMealHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose} className="max-w-[640px]">
      <Modal.Header>
        <Modal.Title>Adicionando uma observação alimentar</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>

      {isErrorFavoritesObservation ? (
        <div>Tivemos um erro para localizar as observações favoritas</div>
      ) : (
        <ScrollArea>
          <form
            id="form-add-observation"
            onSubmit={(event) => {
              event?.stopPropagation();
              handleSubmit(event);
            }}
            className="flex max-h-80 flex-col gap-4"
          >
            <FormField.Controller
              control={internalControl}
              name="id"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField.Item error={error?.message}>
                  <FormField.Label>Observação favorita</FormField.Label>
                  <FormField.Control>
                    <Combobox
                      isLoading={isFetchingFavoritesObservation}
                      placeholder="Selecione uma observação"
                      options={favoritesObservationsOptions}
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        handleAppendText(event);
                      }}
                      emptyMessage="Nenhuma observação encontrada"
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Selecione uma observação favorita para adicionar ao texto.
                    Caso não encontre a observação desejada, você pode digitar
                    diretamente no campo de texto.
                  </FormField.Description>
                  <FormField.Message />
                </FormField.Item>
              )}
            />

            <FormField.Controller
              control={internalControl}
              name="text"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <FormField.Item error={error?.message}>
                  <FormField.Label>Observação alimentar</FormField.Label>
                  <TextEditor value={value} onChange={onChange} />
                  <FormField.Message />
                </FormField.Item>
              )}
            />
          </form>
        </ScrollArea>
      )}

      <Modal.Footer>
        <Button onClick={onClose} variant={'destructive'}>
          Cancelar
        </Button>
        <Button
          form="form-add-observation"
          type="submit"
          // disabled={!formIsValid}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
