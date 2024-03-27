import { TableInfo } from '@godiet-components/TableInfo';
import { Button } from '@godiet-ui/Button';
import { Input } from '@godiet-ui/Input';
import { Modal } from '@godiet-ui/Modal';

import { useStartMealModalHook } from './StartMealModal.hook';

export interface StarMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
}

export function StarMealModal(props: StarMealModalProps) {
  const { isOpen, mealIndex } = props;

  const {
    isCreatingFavoriteMeal,
    mealFoods,
    isValid,
    watchMealFoods,
    register,
    setTableFoods,
    handleSubmit,
    handleCloseModal,
  } = useStartMealModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Favoritar esta refeição</Modal.Title>
        <Modal.Description>
          Você pode salvar esta refeição como uma refeição favorita para usar
          novamente em outros planos alimentares.
        </Modal.Description>
      </Modal.Header>

      <form id="form-input" onSubmit={handleSubmit}>
        <Input placeholder="Nome da refeição favorita" {...register('name')} />
      </form>

      {watchMealFoods.length > 0 ? (
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
        >
          Cancelar
        </Button>
        <Button
          disabled={!isValid}
          form="form-input"
          type="submit"
          isLoading={isCreatingFavoriteMeal}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
