import React from 'react';

import { CreateEnergyCalculationProps } from './create-energy-calculation';
import { useCreateEnergyCalculationHook } from './create-energy-calculation.hook';

export function withHook(
  Component: React.ComponentType<CreateEnergyCalculationProps>
) {
  return function ComponentWithHook() {
    const hook = useCreateEnergyCalculationHook();

    return <Component {...hook} />;
  };
}
