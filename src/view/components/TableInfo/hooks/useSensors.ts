import {
  PointerSensor,
  useSensor as useSensorCore,
  useSensors as useSensorsCore,
} from '@dnd-kit/core';

import { SmartPointerSensor } from '../table-info.utils';

export function useSensors() {
  const smartPointerSensor = useSensorCore(SmartPointerSensor);

  const sensors = useSensorsCore(
    useSensorCore(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    smartPointerSensor
  );

  return sensors;
}
