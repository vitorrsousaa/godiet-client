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

import { useTableInfoHook } from './TableInfo.hook';

interface openModalEditParams {
  mealFoodIndex: number;
  mealIndex: number;
}

export interface TableInfoProps {
  mealIndex: number;
  onOpenModalRemove: (index: number) => void;
  onOpenModalEdit: (params: openModalEditParams) => void;
}

export function TableInfo(props: TableInfoProps) {
  const { mealIndex, onOpenModalRemove, onOpenModalEdit } = props;

  const { foodsByMeal } = useTableInfoHook(props);

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
