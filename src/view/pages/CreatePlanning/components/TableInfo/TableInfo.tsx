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
}

export function TableInfo(props: TableInfoProps) {
  const {
    mealIndex,
    mealFoods,
    disabledActions = false,
    onOpenModalRemove,
    onOpenModalEdit,
  } = props;

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
                <TableCell className="text-[12px]">{name}</TableCell>
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
        </TableBody>
      </Table>
    </>
  );
}
