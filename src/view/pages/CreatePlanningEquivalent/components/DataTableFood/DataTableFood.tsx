import { DataTable } from '@godiet-components/DataTable';
import { TFood } from '@godiet-entities';

import { columns } from './columns';
import { useDataTableFoodHook } from './DataTableFood.hook';

export interface DataTableFoodProps {
  portion: number;
  data: TFood[];
  mealIndex: number;
  onSelectedFood: (foods: TFood[]) => void;
  categoryId: string;
}

export function DataTableFood(props: DataTableFoodProps) {
  const { formatedData, handleSelectedRow, rowSelection } =
    useDataTableFoodHook(props);

  return (
    <>
      <DataTable
        columns={columns}
        data={formatedData}
        rowSelection={rowSelection}
        onRowSelection={handleSelectedRow}
      />
      <div className="flex-1 text-sm text-muted-foreground">
        {Object.entries(rowSelection).length} de 3 opções selecionadas.
      </div>
    </>
  );
}
