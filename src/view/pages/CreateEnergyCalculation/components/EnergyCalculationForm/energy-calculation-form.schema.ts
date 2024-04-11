import * as z from 'zod';

import {
  DefaultFormulaToCalculation,
  FormulaKey,
  TCreateEnergyCalculationDTO,
} from './energy-calculation-form.types';

export const CreateEnergyCalculationSchema = z.object({
  title: z.string().min(1, 'O título do cálculo é obrigatório'),
  weight: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: 'O peso deve ser um número válido',
    })
    .refine((value) => Number(value) > 0, {
      message: 'O peso deve ser maior que 0',
    })
    .or(z.undefined())
    .or(z.number().pipe(z.coerce.string())),
  height: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: 'A altura deve ser um número válido',
    })
    .refine((value) => Number(value) > 0, {
      message: 'A altura deve ser maior que 0',
    })
    .or(z.undefined())
    .or(z.number().pipe(z.coerce.string())),
  freeMass: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: 'A altura deve ser um número válido',
    })
    .refine((value) => Number(value) > 0, {
      message: 'A altura deve ser maior que 0',
    })
    .or(z.undefined())
    .or(z.number().pipe(z.coerce.string())),
  activityLevel: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: 'O fator de atividade deve ser um número válido',
    })
    .refine((value) => Number(value) >= 1, {
      message: 'A altura deve ser maior que 0',
    })
    .refine((value) => Number(value) < 2, {
      message: 'A altura deve ser menor que 2',
    })
    .or(z.undefined())
    .or(z.number().min(1).pipe(z.coerce.string())),
  formula: z.string().or(z.undefined()),
});

export const defaultInitialValues: TCreateEnergyCalculationDTO = {
  title: '',
  weight: undefined,
  height: undefined,
  freeMass: undefined,
  activityLevel: undefined,
  formula: undefined,
};

type Options = {
  value: string;
  label: string;
};

export const defaultOptionsToActivityLevel: Options[] = [
  { value: '1', label: '1 - Normal' },
  { value: '1.2', label: '1.2 - Sedentário' },
  { value: '1.375', label: '1.375 - Leve' },
  { value: '1.550', label: '1.550 - Moderada' },
  { value: '1.725', label: '1.725 - Intensa' },
  { value: '1.900', label: '1.900 - Muito intensa' },
];

export const defaultOptionsToFormula: {
  value: FormulaKey;
  label: string;
}[] = [
  { value: 'harris-benedict-1984', label: 'Harris Benedict (1984)' }, //
  { value: 'harris-benedict-1919', label: 'Harris Benedict (1919)' }, //
  { value: 'fao-who-2004', label: 'FAO/WHO (2004)' }, //
  { value: 'fao-who-infantil-2004', label: 'FAO/WHO - Infantil (2004)' }, //
  { value: 'eer-iom-2005', label: 'EER/IOM (2005)' }, //
  { value: 'eer-iom-infantil-2005', label: 'EER/IOM - Infantil(2005)' }, //
  { value: 'katch-mcardle-1996', label: 'Katch-McArdle (1996)' }, //
  { value: 'cunningham-1980', label: 'Cunningham (1980)' }, //
  { value: 'mifflin-obesidade-1990', label: 'Mifflin - Obesidade (1990)' }, //
  { value: 'mifflin-sobrepeso-1990', label: 'Mifflin - Sobrepeso (1990)' },
  { value: 'henry-rees-1991', label: 'Henry & Rees (1991)' }, //
  { value: 'tinsley-por-peso-2018', label: 'Tinsley - Por peso (2018)' }, //
  { value: 'tinsley-por-MLG-2018', label: 'Tinsley - Por MLG (2018)' }, //
  { value: 'min-saude-gestante-2018', label: 'Min. saúde - gestante (2018)' },
  { value: 'schofield-infantil-1985', label: 'Schofield - Infantil (1985)' }, //
];

export const defaultFormulaToCalculation: DefaultFormulaToCalculation = {
  'harris-benedict-1984': (data) => {
    if (data.sex === 'MASC') {
      return (
        88.362 + 13.397 * data.weight + 4.799 * data.height - 5.677 * data.age
      );
    }
    return (
      447.593 + 9.247 * data.weight + 3.098 * data.height - 4.33 * data.age
    );
  },
  'harris-benedict-1919': (data) => {
    if (data.sex === 'MASC') {
      return 66.5 + 13.75 * data.weight + 5.003 * data.height - 6.8 * data.age;
    }

    return 655.1 + 9.563 * data.weight + 1.7 * data.height - 4.676 * data.age;
  },
  'fao-who-2004': (data) => {
    if (data.sex === 'MASC') {
      return 15.057 * data.weight + 692.2;
    }

    return 14.818 * data.weight + 486.6;
  },
  'fao-who-infantil-2004': (data) => {
    return 152 + 92 * data.weight;
  },
  'eer-iom-2005': (data) => {
    if (data.sex === 'MASC') {
      662 -
        9.53 * data.age +
        data.activityLevel *
          (15.91 * data.weight + 539.6 * (data.height / 100));
    }

    return (
      354 -
      6.91 * data.age +
      data.activityLevel * (9.36 * data.weight + 726 * (data.height / 100))
    );
  },
  'eer-iom-infantil-2005': (data) => {
    if (data.sex === 'MASC') {
      return 17.686 * data.weight + 658.2;
    }

    return 13.384 * data.weight + 692.6;
  },
  'katch-mcardle-1996': (data) => {
    return 370 + 9.82 * data.freeMass;
  },
  'cunningham-1980': (data) => {
    return 500 + 22 * data.freeMass;
  },
  'mifflin-obesidade-1990': (data) => {
    if (data.sex === 'MASC') {
      return 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    }

    return 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  },
  'mifflin-sobrepeso-1990': (data) => {
    if (data.sex === 'MASC') {
      return 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    }

    return 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  },
  'henry-rees-1991': (data) => {
    if (data.sex === 'MASC') {
      return (0.056 * data.weight + 2.8) * 239;
    }

    return (0.048 * data.weight + 2.562) * 239;
  },
  'tinsley-por-peso-2018': (data) => {
    return 24.8 * data.weight + 10;
  },
  'tinsley-por-MLG-2018': (data) => {
    return 25.9 * data.freeMass + 284;
  },
  'min-saude-gestante-2018': (data) => {
    return 14.7 * data.weight + 496 + 300;
  },
  'schofield-infantil-1985': (data) => {
    if (data.sex === 'MASC') {
      return 59.48 * data.weight - 30.33;
    }

    return 58.29 * data.weight - 31.05;
  },
};
