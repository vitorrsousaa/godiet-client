import React from 'react';

import { EnergyCalculationProps } from './energy-calculation';
import { useEnergyCalculationHook } from './energy-calculation.hook';

export function withHook(
  Component: React.ComponentType<EnergyCalculationProps>
) {
  return function ComponentWithHook() {
    const hook = useEnergyCalculationHook();

    return <Component {...hook} />;
  };
}
