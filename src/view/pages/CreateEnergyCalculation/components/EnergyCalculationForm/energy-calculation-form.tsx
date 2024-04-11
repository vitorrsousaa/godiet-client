import { DatePicker } from '@godiet-ui/DatePicker';
import { Input } from '@godiet-ui/Input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@godiet-ui/Select';

import { Controller } from 'react-hook-form';

import { useEnergyCalculationFormHook } from './energy-calculation-form.hook';
import {
  defaultOptionsToActivityLevel,
  defaultOptionsToFormula,
} from './energy-calculation-form.schema';
import {
  TCreateEnergyCalculationDTO,
  TEnergyCalculationInitialValues,
} from './energy-calculation-form.types';

export interface EnergyCalculationFormProps {
  formId?: string;
  onSubmit: (
    data: TCreateEnergyCalculationDTO & { energyCalculation: number }
  ) => Promise<void>;
  initialValues?: TEnergyCalculationInitialValues;
  isSubmitting?: boolean;
}

export function EnergyCalculationForm(props: EnergyCalculationFormProps) {
  const { formId, isSubmitting } = props;

  const { errors, control, energyCalculation, handleSubmit, register } =
    useEnergyCalculationFormHook(props);

  return (
    <form
      id={formId || 'energy-calculation'}
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <span className="font-medium">Dados básicos</span>
        <Input
          placeholder="Título do cálculo"
          minVersion
          {...register('title')}
          error={errors.title?.message}
          disabled={isSubmitting}
        />
        <DatePicker placeholder="Data do exame" value={new Date()} />
        <div className="flex w-full flex-col items-start justify-between gap-2 min-[740px]:flex-row">
          <div className="w-full">
            <Input
              placeholder="Peso (kg)"
              type="number"
              minVersion
              min={0}
              {...register('weight')}
              error={errors.weight?.message}
              disabled={isSubmitting}
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Altura (cm)"
              type="number"
              minVersion
              min={0}
              {...register('height')}
              error={errors.height?.message}
              disabled={isSubmitting}
            />
          </div>
          <div className="w-full">
            <Input
              placeholder="Massa livre de gordura (Kg)"
              type="number"
              minVersion
              min={0}
              {...register('freeMass')}
              error={errors.freeMass?.message}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-medium">Fórmula e planejamento energético</span>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Controller
            name="activityLevel"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Select
                onValueChange={onChange}
                name={name}
                value={value}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-8 w-full">
                  <SelectValue placeholder="Escolha fator de atividade física" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {defaultOptionsToActivityLevel.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="formula"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Select
                onValueChange={onChange}
                name={name}
                value={value}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-8 w-full">
                  <SelectValue placeholder="Escolha sua fórmula" />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectGroup>
                    {defaultOptionsToFormula.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-medium">Resultado obtido</span>
        <small>{energyCalculation} kcal</small>
      </div>
    </form>
  );
}
