import React from 'react';

import { TableCell, TableRow } from '@godiet-ui/Table';

import { CSS } from '@dnd-kit/utilities';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';

import { useDraggableRowHook } from './draggable-row.hook';

export interface DraggableRowProps {
  children?: React.ReactNode;
  id: string;
}

export function DraggableRow(props: DraggableRowProps) {
  const { children } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggableRowHook(props);

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      {...listeners}
    >
      <TableCell className="flex items-center" {...attributes}>
        <DragHandleDots2Icon />
      </TableCell>
      {children}
    </TableRow>
  );
}
