import * as z from 'zod';

import { CreateEnergyCalculationSchema } from './energy-calculation-form.schema';

export type TCreateEnergyCalculationDTO = z.infer<
  typeof CreateEnergyCalculationSchema
>;

export interface TEnergyCalculationInitialValues
  extends Omit<
    TCreateEnergyCalculationDTO,
    'weight' | 'height' | 'freeMass' | 'activityLevel'
  > {
  weight: number | undefined;
  height: number | undefined;
  freeMass: number | undefined;
  activityLevel: 1 | 1.2 | 1.375 | 1.55 | 1.725 | 1.9 | undefined;
}

type DefaulInputToFormula = {
  freeMass: number;
  height: number;
  weight: number;
  sex: 'MASC' | 'FEM';
  age: number;
  activityLevel: number;
};

export const FORMULA_NAME = {
  HARRIS_BENEDICT_1984: 'harris-benedict-1984',
  HARRIS_BENEDICT_1919: 'harris-benedict-1919',
  FAO_WHO_2004: 'fao-who-2004',
  FAO_WHO_INFANTIL_2004: 'fao-who-infantil-2004',
  EER_IOM_2005: 'eer-iom-2005',
  EER_IOM_INFANTIL_2005: 'eer-iom-infantil-2005',
  KATCH_MCARDLE_1996: 'katch-mcardle-1996',
  CUNNINGHAM_1980: 'cunningham-1980',
  MIFFLIN_OBESIDADE_1990: 'mifflin-obesidade-1990',
  MIFFLIN_SOBREPESO_1990: 'mifflin-sobrepeso-1990',
  HENRY_REES_1991: 'henry-rees-1991',
  TINSLEY_POR_PESO_2018: 'tinsley-por-peso-2018',
  TINSLEY_POR_MLG_2018: 'tinsley-por-MLG-2018',
  MIN_SAUDE_GESTANTE_2018: 'min-saude-gestante-2018',
  SCHOFIELD_INFANTIL_1985: 'schofield-infantil-1985',
} as const;

export type FormulaKey = (typeof FORMULA_NAME)[keyof typeof FORMULA_NAME];

type FormulaToCalculationFn = (data: DefaulInputToFormula) => number;

export type DefaultFormulaToCalculation = Record<
  FormulaKey,
  FormulaToCalculationFn
>;
