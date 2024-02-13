import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetAllCategoryName } from '@godiet-hooks/categoryName';
import { useGetByPatientId } from '@godiet-hooks/patient';
import { useCreatePlanningMeal } from '@godiet-hooks/planningMeal';
import { useNavigate } from '@godiet-hooks/routes';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import * as z from 'zod';

export const FoodSchema = z.object({
  id: z.string(),
  portion: z
    .string()
    .or(z.number())
    .refine((value) => Number(value)),
  categoryId: z.string(),
  options: z.array(
    z.object({
      foodId: z.string(),
      baseQty: z.number(),
    })
  ),
});

export const CategorySchema = z.object({
  qty: z
    .string()
    .pipe(z.coerce.number().min(0, 'A quantidade deve ser maior que 0')),
  id: z.string(),
});

export const CreateMealSchema = z.object({
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  categories: z
    .array(CategorySchema)
    .refine(
      (value) =>
        value
          .map((category) => ({ qty: Number(category.qty) }))
          .filter((category) => Number(category.qty) > 0).length > 0,
      'Selecione pelo menos uma categoria.'
    ),
  foods: z.array(FoodSchema).refine((value) => value.length > 0),
});

export const CreatePlanningMealSchema = z.object({
  name: z.string().min(1, 'O nome do plano alimentar é obrigatório.'),
  meals: z
    .array(CreateMealSchema)
    .min(1, 'O plano alimentar deve conter pelo menos uma refeição.'),
});

export type TCreatePlanningMealDTO = z.infer<typeof CreatePlanningMealSchema>;

export function useCreatePlanningEquivalenteHook() {
  const [increaseFoodModalOpen, setIncreaseFoodModalOpen] = useState(false);

  const { id } = useParams<{ id: string }>();

  const { isFetchingPatient, isErrorPatient, patient } = useGetByPatientId(id);

  const { createPlanningMeal, isCreatingPlanningMeal } =
    useCreatePlanningMeal();

  const { navigate } = useNavigate();

  const methods = useForm<TCreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
    defaultValues: {
      meals: [
        {
          name: '',
          time: '',
          categories: [],
          foods: [],
        },
      ],
    },
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid },
    control,
    register,
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

  const { categoriesName, isFetchingCategories, isErrorCategories } =
    useGetAllCategoryName();

  const handleSubmit = hookFormSubmit(async (data) => {
    // Remover o local storage
    try {
      await createPlanningMeal({
        planningMeal: data,
        patientId: patient?.id || '',
      });

      toast.success('Plano alimentar criado com sucesso');

      navigate('PLANNING_MEAL_BY_PATIENT', { id: patient?.id || '' });
    } catch {
      toast.error('Erro ao criar o plano alimentar');
    }
  });

  const handleAddNewMeal = useCallback(() => {
    appendMeals({
      name: '',
      time: '',
      categories: [],
      foods: [],
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

  const toggleIncreaseFoodModal = useCallback(() => {
    setIncreaseFoodModalOpen((prev) => !prev);
  }, []);

  const hasCategories = useCallback(
    (index: number) => {
      if (watchMeals[index]) {
        return watchMeals[index].categories.some(
          (category) => category.qty > 0
        );
      }

      return false;
    },
    [watchMeals]
  );

  const selectedCategories = useMemo(() => {
    return watchMeals.map((meal, index) => ({
      mealIndex: index,
      categories: meal.categories.filter((category) => category.qty > 0),
    }));
  }, [watchMeals]);

  const formatedCategories = useMemo(() => {
    if (isFetchingCategories) return [];

    if (isErrorCategories) return [];

    return categoriesName.map((category) => ({
      id: category.id,
      name: category.name,
      baseProtein: category.baseProtein.toFixed(2),
      baseCarbo: category.baseCarbo.toFixed(2),
      baseFat: category.baseFat.toFixed(2),
      baseEnergy: category.baseEnergy.toFixed(2),
    }));
  }, [categoriesName, isFetchingCategories, isErrorCategories]);

  const formIsValid = useMemo(() => {
    const categories = watchMeals.map((meal) => meal.categories).flat();
    const foods = watchMeals.map((meal) => meal.foods).flat();

    const quantityCategories = categories.filter(
      (category) => Number(category.qty) > 0
    );

    const allCategoriesHasFoods = quantityCategories.every((category) => {
      return foods.some((food) => food.categoryId === category.id);
    });

    return isValid || allCategoriesHasFoods;
  }, [isValid, watchMeals]);

  useEffect(() => {
    if (errors) {
      const mealsErrors = errors.meals;

      if (
        mealsErrors &&
        Array.isArray(mealsErrors) &&
        mealsErrors.length &&
        mealsErrors.length > 0 &&
        mealsErrors.some((mealError) => mealError && mealError)
      ) {
        toast.error('Preencha uma refeição');
      }
    }
  }, [errors]);

  return {
    formatedCategories,
    selectedCategories,
    isFetchingCategories,
    meals: fields,
    control,
    formMethods: methods,
    increaseFoodModalOpen,
    errors,
    formIsValid,
    isFetchingPatient,
    isErrorPatient,
    isCreatingPlanningMeal,
    hasCategories,
    handleSubmit,
    toggleIncreaseFoodModal,
    register,
    handleAddNewMeal,
    handleRemoveMeal,
  };
}
