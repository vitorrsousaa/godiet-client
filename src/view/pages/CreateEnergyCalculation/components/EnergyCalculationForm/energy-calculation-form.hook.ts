import React from 'react';

import { usePatient } from '@godiet-hooks/patient';

import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInCalendarYears } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';

import { EnergyCalculationFormProps } from './energy-calculation-form';
import {
  CreateEnergyCalculationSchema,
  defaultFormulaToCalculation,
  defaultInitialValues,
} from './energy-calculation-form.schema';
import {
  FormulaKey,
  TCreateEnergyCalculationDTO,
} from './energy-calculation-form.types';

export function useEnergyCalculationFormHook(
  props: EnergyCalculationFormProps
) {
  const { initialValues, onSubmit } = props;

  const { patient } = usePatient();

  const methods = useForm<TCreateEnergyCalculationDTO>({
    resolver: zodResolver(CreateEnergyCalculationSchema),
    defaultValues: initialValues
      ? CreateEnergyCalculationSchema.parse(initialValues)
      : defaultInitialValues,
  });

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = methods;

  const watch = useWatch({
    control,
  });

  const energyCalculation = React.useMemo(() => {
    if (!patient) return 0;

    const { gender, birthDate } = patient;

    const { activityLevel, formula, freeMass, height, weight } = watch;

    if (
      !formula ||
      !activityLevel ||
      !Number(height) ||
      !Number(freeMass) ||
      !Number(weight)
    )
      return 0;

    const fnFormula = defaultFormulaToCalculation[formula as FormulaKey];

    const age = differenceInCalendarYears(new Date(), birthDate);

    const result = fnFormula({
      activityLevel: Number(activityLevel) || 0,
      freeMass: Number(freeMass) || 0,
      height: Number(height) || 0,
      weight: Number(weight) || 0,
      sex: gender,
      age,
    });

    return Math.ceil(result);
  }, [patient, watch]);

  const handleSubmit = hookFormSubmit(async (data) => {
    if (energyCalculation === 0) return;
    await onSubmit({ ...data, energyCalculation });
  });

  return { errors, control, energyCalculation, handleSubmit, register };
}
