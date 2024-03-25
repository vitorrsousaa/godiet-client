import { Button } from '@godiet-ui/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@godiet-ui/Table';
import { cn } from '@godiet-utils/cn';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

import { DraggableRow } from './components/DraggableRow';
import { Row } from './components/Row';
import { useTableInfoHook } from './table-info.hook';
import { TableInfoProps } from './table-info.types';

export function TableInfo(props: TableInfoProps) {
  const {
    mealIndex,
    disabledActions = false,
    editable = false,
    onOpenModalRemove,
    onOpenModalEdit,
  } = props;

  const {
    totalFoods,
    mealFoodsWithCustomId,
    handleChangeInputEditable,
    handleDragEnd,
  } = useTableInfoHook(props);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={mealFoodsWithCustomId}>
        <Table className="overflow-x-hidden">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
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
            {mealFoodsWithCustomId.map((foods, index) => {
              const { id } = foods;

              return (
                <DraggableRow key={`mealfood-${id}-${index}`} id={foods.id}>
                  <Row
                    editable={editable}
                    onChangeEditable={(event) =>
                      handleChangeInputEditable({
                        value: event.target.value,
                        mealFoodIndex: index,
                      })
                    }
                    mealFood={foods}
                  >
                    {!disabledActions && (
                      <TableCell>
                        <span className="flex w-full flex-row items-center justify-center gap-1">
                          <Button
                            variant={'outline'}
                            className="h-6 px-1 transition-colors hover:bg-red-400 "
                            onClick={() =>
                              onOpenModalRemove && onOpenModalRemove(index)
                            }
                            data-testid="remove-food-button"
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
                            data-testid="edit-food-button"
                          >
                            <Pencil1Icon />
                          </Button>
                        </span>
                      </TableCell>
                    )}
                  </Row>
                </DraggableRow>
              );
            })}
          </TableBody>

          <TableFooter>
            {totalFoods.length > 0 && (
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="text-[12px]">Total</TableHead>
                {totalFoods.map((total, index) => {
                  return (
                    <TableHead
                      key={`total-${index}`}
                      className={cn(
                        'text-[12px]',
                        total.attribute === 'energy'
                          ? ''
                          : total.attribute === 'qty'
                            ? 'hidden text-[12px] min-[430px]:table-cell'
                            : 'hidden text-[12px] sm:table-cell'
                      )}
                    >
                      {total.value}{' '}
                      {total.attribute === 'energy' ? 'Kcal' : 'g'}
                    </TableHead>
                  );
                })}
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </SortableContext>
    </DndContext>
  );
}
