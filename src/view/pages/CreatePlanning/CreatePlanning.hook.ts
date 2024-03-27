import { useCallback, useEffect, useMemo } from 'react';

import { useAuth } from '@godiet-hooks/auth';
import { usePatient } from '@godiet-hooks/patient';
import { useCreatePlanningMeal } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlanningMealStorage } from '@storage/planningMeal';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
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

const defaultInitialValues = {
  meals: [
    {
      name: '',
      time: '',
      mealFoods: [],
    },
  ],
};

export type TCreatePlanningMealDTO = z.infer<typeof CreatePlanningMealSchema>;

export function useCreatePlanningHook() {
  const { patient } = usePatient();

  const { createPlanningMeal, isCreatingPlanningMeal } = useCreatePlanningMeal(
    patient?.id || ''
  );

  const { navigate } = useNavigate();

  const { email } = useAuth();

  const planningMealKey = useMemo(() => {
    const userEmail = email || '';
    const patientId = patient?.id || '';

    const object = {
      email: userEmail,
      patientId: patientId,
    };

    return JSON.stringify(object);
  }, [email, patient?.id]);

  const storage = useMemo(
    () =>
      new PlanningMealStorage<TCreatePlanningMealDTO>(
        planningMealKey,
        defaultInitialValues
      ),
    [planningMealKey]
  );

  const removeStoragePlanningMeal = useCallback(() => {
    storage.remove();
  }, [storage]);

  const getStoragePlanningMeal = useCallback(() => {
    const data = storage.get();

    return data;
  }, [storage]);

  const methods = useForm<TCreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
    defaultValues: getStoragePlanningMeal(),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    register,
    getValues,
  } = methods;

  const {
    append: appendMeals,
    remove: removeMeal,
    fields,
  } = useFieldArray({
    control,
    name: 'meals',
  });

  const watchMeals = useWatch({ control, name: 'meals' });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await createPlanningMeal({
        patientId: patient?.id || '',
        planningMeal: data,
      });

      removeStoragePlanningMeal();

      toast.success('Plano alimentar criado!');
    } catch (error) {
      toast.error('Erro ao criar o plano alimentar');
    } finally {
      navigate('PLANNING_MEAL_BY_PATIENT', {
        replace: {
          id: patient?.id || '',
        },
      });
    }
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

  useEffect(() => {
    const timer = setInterval(() => {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
        error: '',
        loading: 'Salvando...',
        success: 'Salvo com sucesso! Próximo em 60s',
      });
      storage.set(getValues());
    }, 60000);

    return () => clearInterval(timer);
  }, [getValues, storage]);

  return {
    methods,
    errors,
    meals: fields,
    isCreatingPlanningMeal,
    appendMeals,
    register,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  };
}
