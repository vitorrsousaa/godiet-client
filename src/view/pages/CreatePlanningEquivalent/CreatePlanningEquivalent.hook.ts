import { useCallback, useEffect, useMemo, useState } from 'react';

import { useGetAllCategoryName } from '@godiet-hooks/categoryName';
import { usePrefetchFoods } from '@godiet-hooks/foods';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

export const CategorySchema = z.object({
  qty: z.number().pipe(z.coerce.number()),
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
      (value) => value.filter((category) => category.qty > 0).length > 0,
      'Selecione pelo menos uma categoria.'
    ),
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

  const methods = useForm<TCreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
    defaultValues: {
      meals: [
        {
          name: '',
          time: '',
          categories: [],
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
    fields,
  } = useFieldArray({
    control,
    name: 'meals',
  });

  const watchMeals = useWatch({ control, name: 'meals' });

  const { categoriesName, isFetchingCategories, isErrorCategories } =
    useGetAllCategoryName();

  const prefetchFoods = usePrefetchFoods();

  console.log(errors);

  const handleSubmit = hookFormSubmit((data) => {
    console.log('submit', data);
  });

  const handleAddNewMeal = useCallback(() => {
    appendMeals({
      name: '',
      time: '',
      categories: [],
    });
  }, [appendMeals]);

  const handleRemoveMeal = useCallback(
    (index: number) => {
      if (index === 0) return;
      removeMeal(index);
    },
    [removeMeal]
  );

  const toggleIncreaseFoodModal = useCallback(() => {
    setIncreaseFoodModalOpen((prev) => !prev);
  }, []);

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
    isFetchingCategories,
    meals: fields,
    control,
    formMethods: methods,
    increaseFoodModalOpen,
    errors,
    hasCategories,
    prefetchFoods,
    handleSubmit,
    toggleIncreaseFoodModal,
    register,
    handleAddNewMeal,
    handleRemoveMeal,
  };
}
