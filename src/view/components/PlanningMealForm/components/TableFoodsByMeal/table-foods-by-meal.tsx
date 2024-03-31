import { TableInfo } from '@godiet-components/TableInfo';
import { Spinner } from '@godiet-ui/Spinner';

import { useTableFoodsByMealHook } from './table-foods-by-meal.hook';

interface OpenModalEditParams {
  mealFoodIndex: number;
  mealIndex: number;
}

export interface TableFoodsByMealProps {
  mealIndex: number;
  onOpenModalRemove: (index: number) => void;
  onOpenModalEdit: (params: OpenModalEditParams) => void;
  showActions?: boolean;
}

export function TableFoodsByMeal(props: TableFoodsByMealProps) {
  const { mealIndex, onOpenModalRemove, onOpenModalEdit } = props;

  const { foodsByMeal, isFetchingFoods, handleUpdateMealFoods } =
    useTableFoodsByMealHook(props);

  if (isFetchingFoods) return <Spinner />;

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
