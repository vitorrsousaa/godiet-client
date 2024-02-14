import { Button } from '@godiet-ui/Button';
import { Modal } from '@godiet-ui/Modal';
import { Spinner } from '@godiet-ui/Spinner';

import { CrossCircledIcon } from '@radix-ui/react-icons';

import { DataTableFood } from '../../DataTableFood';

import { useIncreaseFoodModalHook } from './IncreaseFoodModal.hook';

export interface IncreaseFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealIndex: number;
  selectedCategories: {
    mealIndex: number;
    categories: {
      qty: number;
      id: string;
    }[];
  };
}

export function IncreaseFoodModal(props: IncreaseFoodModalProps) {
  const { isOpen, mealIndex, onClose } = props;

  const {
    foodsByCategories,
    isFetchingFoodsByCategories,
    optionsFoods,
    hasMoreFoodsSelected,
    hasOptionsFood,
    selectedFoodIsValid,
    handleFoodsSelected,
    handleAddFoods,
    handleCloseModal,
  } = useIncreaseFoodModalHook(props);

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={onClose}
      className="h-full max-w-3xl overflow-y-auto "
    >
      <Modal.Header>
        <Modal.Title>Adicionando um novo alimento</Modal.Title>
        <Modal.Description>
          Selecione os alimentos para a refeição
        </Modal.Description>
      </Modal.Header>
      {isFetchingFoodsByCategories ? (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      ) : (
        foodsByCategories.map((category) => {
          return (
            <div key={category.categoryId}>
              <div className="mb-8 flex flex-col gap-2">
                <h3 className="text-md mb-4 font-bold">
                  {category.categoryName} - {category.portion} porções
                </h3>

                {hasOptionsFood[category.categoryId] && (
                  <div className="flex w-full flex-row justify-between gap-4">
                    {optionsFoods[category.categoryId].map((option, index) => (
                      <div
                        className="flex w-full flex-col items-center justify-center rounded-sm border-[1px] p-4 text-center"
                        key={`card-${option.name}-${index}`}
                      >
                        <small>Opção 0{index + 1}</small>
                        <strong className="font-medium">{option.name}</strong>
                        <strong className="font-medium">
                          {option.baseQty} ({option.baseUnit})
                        </strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {hasMoreFoodsSelected[category.categoryId] && (
                <small className="mb-4 flex items-center gap-2 font-medium text-red-600">
                  <CrossCircledIcon />
                  Selecione apenas 3 porções para esta categoria.
                </small>
              )}

              <DataTableFood
                portion={category.portion}
                data={category.data}
                mealIndex={mealIndex}
                onSelectedFood={(updater) =>
                  handleFoodsSelected(updater, category.categoryId)
                }
                categoryId={category.categoryId}
              />
              <hr className="my-4" />
            </div>
          );
        })
      )}

      <Modal.Footer className="h-auto">
        <Button onClick={handleCloseModal} variant={'destructive'}>
          Cancelar
        </Button>
        <Button
          onClick={() => handleAddFoods(mealIndex)}
          disabled={!selectedFoodIsValid}
        >
          Adicionar
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
}
