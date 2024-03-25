import { useSortable } from '@dnd-kit/sortable';

import { DraggableRowProps } from './draggable-row';

export function useDraggableRowHook(props: DraggableRowProps) {
  const { id } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  };
}
