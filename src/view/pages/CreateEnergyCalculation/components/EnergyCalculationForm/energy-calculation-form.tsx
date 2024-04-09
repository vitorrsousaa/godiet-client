import { useEnergyCalculationFormHook } from './energy-calculation-form.hook';

export interface EnergyCalculationFormProps {
  data: string;
}

export function EnergyCalculationForm(props: EnergyCalculationFormProps) {
  const { data } = props;

  const { state } = useEnergyCalculationFormHook(props);
  return (
    <div>
      <h1>EnergyCalculationForm</h1>
      {data} {state}
    </div>
  );
}
