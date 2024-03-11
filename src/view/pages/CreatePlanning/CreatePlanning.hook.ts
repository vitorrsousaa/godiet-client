import { useCallback } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import * as z from 'zod';

export const CreateMealFoodSchema = z.object({
  name: z.string(),
  id: z.string().uuid(),
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

export type TCreatePlanningMealDTO = z.infer<typeof CreatePlanningMealSchema>;

export function useCreatePlanningHook() {
  const methods = useForm<TCreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
    defaultValues: {
      meals: [
        {
          name: '',
          time: '',
          mealFoods: [],
        },
      ],
    },
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    register,
  } = methods;

  const {
    append: appendMeals,
    remove: removeMeal,
    fields: meals,
  } = useFieldArray({
    control,
    name: 'meals',
  });

  const watchMeals = useWatch({ control, name: 'meals' });

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);
  });

  const handleAddNewMeal = useCallback(() => {
    appendMeals({
      name: '',
      time: '',
      mealFoods: [],
    });
  }, [appendMeals]);

  const handleRemoveMeal = useCallback(
    (index: number) => {
      if (watchMeals.length > 1) {
        removeMeal(index);
      }
    },
    [removeMeal, watchMeals]
  );

  return {
    control,
    methods,
    errors,
    meals,
    register,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  };
}
