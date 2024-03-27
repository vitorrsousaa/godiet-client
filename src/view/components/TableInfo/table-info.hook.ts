import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';

import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { HandleChangeInputFunction, TableInfoProps } from './table-info.types';

export function useTableInfoHook(props: TableInfoProps) {
  const { mealIndex, mealFoods, onUpdateMealFoods } = props;

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { update } = useFieldArray({
    name: `meals.${mealIndex}.mealFoods`,
    control,
  });

  const watchMealFoods = useWatch({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const totalFoods = React.useMemo(() => {
    if (mealFoods.length === 0) return [];

    const totalQty = mealFoods
      .reduce((acc, food) => {
        return acc + Number(food.qty * food.measure.qty);
      }, 0)
      .toFixed(2);

    const totalEnergy = mealFoods
      .reduce((acc, food) => {
        return acc + Number(food.energy);
      }, 0)
      .toFixed(2);

    const totalProt = mealFoods
      .reduce((acc, food) => {
        return acc + Number(food.prot);
      }, 0)
      .toFixed(2);

    const totalCarb = mealFoods
      .reduce((acc, food) => {
        return acc + Number(food.carb);
      }, 0)
      .toFixed(2);

    const totalFat = mealFoods
      .reduce((acc, food) => {
        return acc + Number(food.fat);
      }, 0)
      .toFixed(2);

    return [
      { attribute: 'qty', value: totalQty },
      { attribute: 'prot', value: totalProt },
      { attribute: 'carb', value: totalCarb },
      { attribute: 'fat', value: totalFat },
      { attribute: 'energy', value: totalEnergy },
    ];
  }, [mealFoods]);

  const mealFoodsWithCustomId = React.useMemo(
    () =>
      mealFoods.map((mealFood, index) => ({
        ...mealFood,
        id: `${mealFood.id}-${index}`,
      })),
    [mealFoods]
  );

  const handleChangeInputEditable =
    React.useCallback<HandleChangeInputFunction>(
      (params) => {
        const { value, mealFoodIndex } = params;

        const mealFood = watchMealFoods[mealFoodIndex];

        const mealFoodToUpdate = {
          ...mealFood,
          name: value,
        };

        update(mealFoodIndex, mealFoodToUpdate);
      },
      [watchMealFoods, update]
    );

  const getIndexAndId = React.useCallback((uuid: string) => {
    const lastDashIndex = uuid.lastIndexOf('-'); // Encontra o índice do último traço
    const result = uuid.substring(lastDashIndex + 1);

    const id = uuid.substring(0, lastDashIndex);

    return {
      index: result,
      id,
    };
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over) return;

    const composeIdActiveElement = event.active.id.toString();
    const composeIdEventElement = event.over!.id.toString();

    const indexAndIdActiveElement = getIndexAndId(composeIdActiveElement);
    const indexAndIdEventElement = getIndexAndId(composeIdEventElement);

    onUpdateMealFoods &&
      onUpdateMealFoods((oldMealFoods) => {
        const mealFoodWithIdAndIndex = oldMealFoods.map((food, index) => ({
          id: food.foodId,
          index,
        }));

        const oldIndex = mealFoodWithIdAndIndex.find(
          (element) =>
            element.id === indexAndIdActiveElement.id &&
            element.index === Number(indexAndIdActiveElement.index)
        );

        const newIndex = mealFoodWithIdAndIndex.find(
          (element) =>
            element.id === indexAndIdEventElement.id &&
            element.index === Number(indexAndIdEventElement.index)
        );

        return arrayMove(oldMealFoods, oldIndex!.index, newIndex!.index);
      });
  };

  return {
    totalFoods,
    mealFoodsWithCustomId,
    handleChangeInputEditable,
    handleDragEnd,
  };
}
