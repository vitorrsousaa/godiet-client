import { CreateMealFoodSchema } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';
import { FoodsByMeal } from '@godiet-pages/CreatePlanning/utils/calculateMealFoods';

import * as z from 'zod';

export type TCreateMealFood = z.infer<typeof CreateMealFoodSchema>;

export type CallbackUpdateMealFoodsFunction = (
  oldMealFoods: TCreateMealFood[]
) => TCreateMealFood[];

interface OpenModalEditParams {
  mealFoodIndex: number;
  mealIndex: number;
}

export type HandleChangeInputFunction = ({
  value,
  mealFoodIndex,
}: {
  value: string;
  mealFoodIndex: number;
}) => void;

export type TParamsDisableColumns = 'prot' | 'carb' | 'fat' | 'energy';

export interface TableInfoProps {
  /**
   * The index of the meal.
   */
  mealIndex: number;

  /**
   * Function to open the modal for removing a meal food item.
   * @param index The index of the meal food item to remove.
   */
  onOpenModalRemove?: (index: number) => void;

  /**
   * Function to open the modal for editing a meal food item.
   * @param params Parameters for opening the modal for editing.
   */
  onOpenModalEdit?: (params: OpenModalEditParams) => void;
  /**
   * Boolean flag to disable actions (removing and editing).
   */
  disabledActions?: boolean;
  /**
   * List of meal foods.
   */
  mealFoods: FoodsByMeal[];
  /**
   * Boolean flag to indicate if the table is editable.
   */
  editable?: boolean;
  /**
   * Function to update meal foods.
   * @param callback The function to update meal foods.
   */
  onUpdateMealFoods?: (callback: CallbackUpdateMealFoodsFunction) => void;
  /**
   *
   * @param disableColumns The columns to disable.
   */
  disableColumns?: TParamsDisableColumns[];
}
