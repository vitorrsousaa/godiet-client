import { useMemo } from 'react';
import React from 'react';

import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';
import { Button } from '@godiet-ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@godiet-ui/Table';
import { cn } from '@godiet-utils/cn';

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

interface openModalEditParams {
  mealFoodIndex: number;
  mealIndex: number;
}

interface FoodsByMeal {
  id: string;
  measure: { name: string; qty: number };
  qty: number;
  prot: string;
  fat: string;
  carb: string;
  energy: string;
  name: string;
}

export interface TableInfoProps {
  mealIndex: number;
  onOpenModalRemove?: (index: number) => void;
  onOpenModalEdit?: (params: openModalEditParams) => void;
  disabledActions?: boolean;
  mealFoods: FoodsByMeal[];
  editable?: boolean;
}

type HandleChangeInputFunction = ({
  value,
  mealFoodIndex,
}: {
  value: string;
  mealFoodIndex: number;
}) => void;

export function TableInfo(props: TableInfoProps) {
  const {
    mealIndex,
    mealFoods,
    disabledActions = false,
    editable = false,
    onOpenModalRemove,
    onOpenModalEdit,
  } = props;

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const { update } = useFieldArray({
    name: `meals.${mealIndex}.mealFoods`,
    control,
  });

  const watchMealFoods = useWatch({
    control,
    name: `meals.${mealIndex}.mealFoods`,
  });

  const totalFoods = useMemo(() => {
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

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Alimento</TableHead>
            <TableHead className="hidden min-[430px]:table-cell">
              Quantidade
            </TableHead>
            <TableHead className="hidden sm:table-cell">Prot</TableHead>
            <TableHead className="hidden sm:table-cell">Carb</TableHead>
            <TableHead className="hidden sm:table-cell">Gord</TableHead>
            <TableHead>Cal</TableHead>
            {!disabledActions && (
              <TableHead className={cn('flex items-center justify-center')}>
                Ações
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {mealFoods.map((foods, index) => {
            const { carb, energy, fat, id, name, prot, qty, measure } = foods;

            return (
              <TableRow key={`mealfood-${id}-${index}`}>
                <TableCell className="text-[12px]">
                  {editable ? (
                    <input
                      value={name}
                      name={name}
                      className="w-full bg-muted/40 outline-none"
                      onChange={(event) =>
                        handleChangeInputEditable({
                          value: event.target.value,
                          mealFoodIndex: index,
                        })
                      }
                    />
                  ) : (
                    name
                  )}
                </TableCell>
                <TableCell className="hidden text-[12px] min-[430px]:table-cell">
                  {qty} {measure.name}
                </TableCell>
                <TableCell className="hidden text-[12px] sm:table-cell">
                  {prot} (g)
                </TableCell>
                <TableCell className="hidden text-[12px] sm:table-cell">
                  {carb} (g)
                </TableCell>
                <TableCell className="hidden text-[12px] sm:table-cell">
                  {fat} (g)
                </TableCell>
                <TableCell className="text-[12px]">{energy} Kcal</TableCell>
                {!disabledActions && (
                  <TableCell>
                    <span className="flex w-full flex-row items-center justify-center gap-1">
                      <Button
                        variant={'outline'}
                        className="h-6 px-1 transition-colors hover:bg-red-400 "
                        onClick={() =>
                          onOpenModalRemove && onOpenModalRemove(index)
                        }
                      >
                        <TrashIcon />
                      </Button>
                      <Button
                        variant={'outline'}
                        className="h-6 px-1 transition-colors hover:bg-gray-300 "
                        onClick={() => {
                          onOpenModalEdit &&
                            onOpenModalEdit({
                              mealFoodIndex: index,
                              mealIndex,
                            });
                        }}
                      >
                        <Pencil1Icon />
                      </Button>
                    </span>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
          {totalFoods.length > 0 && (
            <TableRow>
              <TableHead className="text-[12px]">Total</TableHead>
              {totalFoods.map((total, index) => {
                return (
                  <TableHead
                    key={`total-${index}`}
                    className={cn(
                      'text-[12px]',
                      // total.attribute !== 'energy' && total.attribute === 'qty'
                      //   ? 'hidden min-[430px]:table-cell'
                      //   : 'hidden sm:table-cell'
                      total.attribute === 'energy'
                        ? ''
                        : total.attribute === 'qty'
                          ? 'hidden text-[12px] min-[430px]:table-cell'
                          : 'hidden text-[12px] sm:table-cell'
                    )}
                  >
                    {total.value} {total.attribute === 'energy' ? 'Kcal' : 'g'}
                  </TableHead>
                );
              })}
              <TableCell></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
