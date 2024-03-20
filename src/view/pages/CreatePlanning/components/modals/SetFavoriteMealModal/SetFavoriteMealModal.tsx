import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@godiet-ui/Select';

import { useSetFavoriteMealModalHook } from './SetFavoriteMealModal.hook';

export interface SetFavoriteMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
}

export function SetFavoriteMealModal(props: SetFavoriteMealModalProps) {
  const { isOpen } = props;

  const {
    selectedFavoriteMeal,
    isErrorFavoriteMeal,
    isFetchingFavoriteMeal,
    favoritesMeals,
    isValid,
    handleCloseModal,
    setSelectedFavoriteMeal,
    handleSubmit,
  } = useSetFavoriteMealModalHook(props);

  return (
    <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>Usar uma refeição favorita</Modal.Title>
        <Modal.Description>
          Você pode adicionar os elementos que foram cadastrados como favoritos
          nesta refeição. Selecione uma das refeições favoritas criadas
          anteriormente para usar neste plano alimentar.
        </Modal.Description>
      </Modal.Header>

      {isErrorFavoriteMeal ? (
        <div className="text-center text-muted-foreground">
          <p>Tivemos um erro para encontrar suas refeições favoritas</p>
          <p>Por favor, tente novamente mais tarde!</p>
        </div>
      ) : favoritesMeals.length === 0 ? (
        <div className="text-center">
          <p className="tracking-tigh">Nenhuma refeição favorita cadastrada!</p>
          <p className="text-muted-foreground">
            Você pode criar uma nova refeição favorita na página de favoritos ou
            adicionando os elementos e cadastrando a refeição como favorito
            nesta própria página.
          </p>
        </div>
      ) : (
        <Select
          value={selectedFavoriteMeal}
          onValueChange={(value) => setSelectedFavoriteMeal(value)}
        >
          <SelectTrigger isLoading={isFetchingFavoriteMeal}>
            <SelectValue placeholder="Selecione uma refeição favorita" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {favoritesMeals.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name} - {option.energy} kcal
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      <Modal.Footer>
        <Button variant={'destructive'} onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
