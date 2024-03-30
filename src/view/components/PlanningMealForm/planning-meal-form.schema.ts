import * as z from 'zod';

export const CreateMealFoodSchema = z.object({
  name: z.string(),
  foodId: z.string().uuid(),
  qty: z.number().min(1),
  measure: z.object({
    name: z.string(),
    qty: z.number(),
  }),
});

export const CreateMealSchema = z.object({
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  mealFoods: z.array(CreateMealFoodSchema),
});

export const CreatePlanningMealSchema = z.object({
  name: z.string().min(1, 'O nome do plano alimentar é obrigatório.'),
  meals: z
    .array(CreateMealSchema)
    .min(1, 'O plano alimentar deve conter pelo menos uma refeição'),
});

export const defaultInitialValues = {
  meals: [
    {
      name: '',
      time: '',
      mealFoods: [],
    },
  ],
};

export type TCreatePlanningMealDTO = z.infer<typeof CreatePlanningMealSchema>;

export type TCreateMealDTO = z.infer<typeof CreateMealSchema>;

export type TCreateMealFoodDTO = z.infer<typeof CreateMealFoodSchema>;
