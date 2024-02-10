import { Checkbox } from '@godiet-components/Checkbox';
import type { DataTableSearchableColumn } from '@godiet-components/DataTable';
import { DataTableColumnHeader } from '@godiet-components/DataTable';

import { ColumnDef } from '@tanstack/react-table';

export type FoodColumn = {
  id: string;
  energy: number;
  qty: number;
  name: string;
};

export const columns: ColumnDef<FoodColumn>[] = [
  {
    id: 'select',
    header: () => <Checkbox aria-label="Select all" />,
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader title={'Nome'} column={column} />
    ),
  },
  {
    accessorKey: 'qty',
    header: ({ column }) => (
      <DataTableColumnHeader title={'Quantidade (g)'} column={column} />
    ),
  },
  {
    accessorKey: 'energy',
    header: ({ column }) => (
      <DataTableColumnHeader title="Calorias (kcal)" column={column} />
    ),
  },
];

export const searchableColumns: DataTableSearchableColumn<FoodColumn>[] = [
  {
    id: 'name',
    title: 'Nome',
  },
];
