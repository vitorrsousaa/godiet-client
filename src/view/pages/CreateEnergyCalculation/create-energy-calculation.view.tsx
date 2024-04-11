import { Button } from '@godiet-ui/Button';

import {
  EnergyCalculationForm,
  TCreateEnergyCalculationDTO,
} from './components/EnergyCalculationForm';

/**
 * Interface que define as propriedades aceitas pelo componente `CreateEnergyCalculationView`.
 *
 * Este tipo de dados descreve as propriedades que podem ser passadas para o componente `CreateEnergyCalculationView`.
 *
 * @interface CreateEnergyCalculationViewProps
 */
export interface CreateEnergyCalculationViewProps {
  onSubmit: (data: TCreateEnergyCalculationDTO) => Promise<void>;
}

/**
 * Esse componente representa a view da página de exemplo.
 * @param props - As propriedades são definidas dentro do CreateEnergyCalculationViewProps. E são encaminhadas para o componente dentro do CreateEnergyCalculationController.
 * @returns Retorna o componente da view.
 */
export function CreateEnergyCalculationView(
  props: CreateEnergyCalculationViewProps
) {
  const { onSubmit } = props;

  return (
    <div className="mb-10">
      <h1 className="font-bold">Estimativa de gasto energético</h1>

      <EnergyCalculationForm
        formId="create-energy-calculation"
        onSubmit={onSubmit}
      />

      <Button type="submit" form="create-energy-calculation">
        Criar
      </Button>
    </div>
  );
}
