import { TableInfo } from '../TableInfo';

import { useTableFoodsByMealHook } from './TableFoodsByMeal.hook';

interface openModalEditParams {
  mealFoodIndex: number;
  mealIndex: number;
}

export interface TableFoodsByMealProps {
  mealIndex: number;
  onOpenModalRemove: (index: number) => void;
  onOpenModalEdit: (params: openModalEditParams) => void;
  showActions?: boolean;
}

export function TableFoodsByMeal(props: TableFoodsByMealProps) {
  const { mealIndex, onOpenModalRemove, onOpenModalEdit } = props;

  const { foodsByMeal, handleUpdateMealFoods } = useTableFoodsByMealHook(props);

  return (
    <>
      {foodsByMeal.length > 0 ? (
        <TableInfo
          mealFoods={foodsByMeal}
          mealIndex={mealIndex}
          onOpenModalEdit={onOpenModalEdit}
          onOpenModalRemove={onOpenModalRemove}
          editable
          onUpdateMealFoods={handleUpdateMealFoods}
        />
      ) : (
        <div>
          <p className="text-center text-sm">
            Você não adicionou alimentos para esta refeição.
          </p>
        </div>
      )}
    </>
  );
}
