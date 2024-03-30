import { TableInfo } from '@godiet-components/TableInfo';
import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';

import { useSaveMealModalHook } from './save-meal-modal.hook';

export interface SaveMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
}

export function SaveMealModal(props: SaveMealModalProps) {
  const { isOpen, mealIndex } = props;

  const {
    isCreatingFavoriteMeal,
    isValid,
    watchMealFoods,
    mealFoods,
    nameOfFavoriteMeal,
    setTableFoods,
    handleChangeNameOfFavoriteMeal,
    handleCloseModal,
    handleSubmit,
  } = useSaveMealModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Favoritar esta refeição</Modal.Title>
        <Modal.Description>
          Você pode salvar esta refeição como uma refeição favorita para usar
          novamente em outros planos alimentares.
        </Modal.Description>
      </Modal.Header>

      <Input
        name="nameOfFavoriteMeal"
        placeholder="Nome da refeição favorita"
        value={nameOfFavoriteMeal}
        onChange={handleChangeNameOfFavoriteMeal}
      />

      {watchMealFoods?.length > 0 ? (
        <TableInfo
          mealIndex={mealIndex}
          disabledActions={true}
          mealFoods={mealFoods}
          onUpdateMealFoods={setTableFoods}
          disableColumns={['prot', 'carb', 'fat']}
        />
      ) : (
        <div>
          <p className="text-center text-red-300">
            Você precisa adicionar alimentos para favoritar a refeição!
          </p>
        </div>
      )}

      <Modal.Footer>
        <Button
          variant={'destructive'}
          onClick={handleCloseModal}
          disabled={isCreatingFavoriteMeal}
          type="button"
        >
          Cancelar
        </Button>
        <Button
          disabled={!isValid}
          isLoading={isCreatingFavoriteMeal}
          onClick={handleSubmit}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
