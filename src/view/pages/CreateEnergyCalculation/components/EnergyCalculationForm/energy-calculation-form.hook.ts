import React from 'react';

import { EnergyCalculationFormProps } from './energy-calculation-form';

export function useEnergyCalculationFormHook(
  props: EnergyCalculationFormProps
) {
  const { data } = props;

  const [state] = React.useState(data);

  return {
    state,
  };
}
