import { useMemo } from 'react';

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

import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useFormContext, useWatch } from 'react-hook-form';

interface openModalEditParams {
  mealFoodIndex: number;
  mealIndex: number;
}

interface FoodsByMeal {
  id: string;
  measure: { name: string; qty: number };
  qty: number;
  prot: number;
  fat: number;
  carb: number;
  energy: number;
  name: string;
}

interface TableInfoProps {
  mealIndex: number;
  onOpenModalRemove: (index: number) => void;
  onOpenModalEdit: (params: openModalEditParams) => void;
}

export function TableInfo(props: TableInfoProps) {
  const { mealIndex, onOpenModalRemove, onOpenModalEdit } = props;

  const { control } = useFormContext<TCreatePlanningMealDTO>();

  const watchMeal = useWatch({
    control,
    name: `meals.${mealIndex}`,
  });

  const foodsByMeal = useMemo<FoodsByMeal[]>(() => {
    const initialFoodsByMeal: FoodsByMeal[] = [];
    watchMeal.mealFoods.forEach((food) => {
      initialFoodsByMeal.push({
        id: food.id,
        measure: food.measure,
        qty: food.qty,
        prot: 0.6 * 20,
        fat: 0.1 * 20,
        carb: 7 * 10,
        energy: 120,
        name: food.name,
      });
    });

    return initialFoodsByMeal;
  }, [watchMeal.mealFoods]);

  return (
    <>
      {foodsByMeal.length > 0 ? (
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
              <TableHead className="flex  items-center justify-center">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foodsByMeal.map((foods, index) => {
              const { carb, energy, fat, id, name, prot, qty, measure } = foods;

              return (
                <TableRow key={`mealfood-${id}-${index}`}>
                  <TableCell>{name}</TableCell>
                  <TableCell className="hidden min-[430px]:table-cell">
                    {qty} {measure.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {prot} (g)
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {carb} (g)
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {fat} (g)
                  </TableCell>
                  <TableCell>{energy} Kcal</TableCell>
                  <TableCell>
                    <span className="flex w-full flex-row items-center justify-center gap-1">
                      <Button
                        variant={'outline'}
                        className="h-6 px-1 transition-colors hover:bg-red-400 "
                        onClick={() => onOpenModalRemove(index)}
                      >
                        <TrashIcon />
                      </Button>
                      <Button
                        variant={'outline'}
                        className="h-6 px-1 transition-colors hover:bg-gray-300 "
                        onClick={() => {
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div>
          <p className="text-sm">
            Você não adicionou alimentos para esta refeição.
          </p>
        </div>
      )}
    </>
  );
}
