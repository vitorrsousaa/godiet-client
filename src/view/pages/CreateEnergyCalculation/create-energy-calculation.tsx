import { CreateEnergyCalculationController } from './create-energy-calculation.controller';
import { withHook } from './create-energy-calculation.hoc';
import { CreateEnergyCalculationHookOutput } from './create-energy-calculation.hook';
import { CreateEnergyCalculationLayout } from './create-energy-calculation.layout';

export type CreateEnergyCalculationProps = CreateEnergyCalculationHookOutput;

function CreateEnergyCalculationWithoutHook(
  props: CreateEnergyCalculationProps
) {
  return (
    <CreateEnergyCalculationLayout>
      <CreateEnergyCalculationController {...props} />
    </CreateEnergyCalculationLayout>
  );
}

const CreateEnergyCalculation = withHook(CreateEnergyCalculationWithoutHook);

export { CreateEnergyCalculation };
