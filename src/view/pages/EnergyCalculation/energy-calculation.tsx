import { EnergyCalculationController } from './energy-calculation.controller';
import { withHook } from './energy-calculation.hoc';
import { EnergyCalculationHookOutput } from './energy-calculation.hook';
import { EnergyCalculationLayout } from './energy-calculation.layout';

export type EnergyCalculationProps = EnergyCalculationHookOutput;

function EnergyCalculationWithoutHook(props: EnergyCalculationProps) {
  return (
    <EnergyCalculationLayout>
      <EnergyCalculationController {...props} />
    </EnergyCalculationLayout>
  );
}

const EnergyCalculation = withHook(EnergyCalculationWithoutHook);

export { EnergyCalculation };
