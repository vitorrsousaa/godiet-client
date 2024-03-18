import { useCallback, useMemo } from 'react';

import { useCreateFavoriteMeal } from '@godiet-hooks/favoriteMeal';
import { useGetAllFoods } from '@godiet-hooks/foods';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { ModalCreateFavoriteMealProps } from './ModalCreateFavoriteMeal';

const CreateMealFoodSchema = z.object({
  foodId: z.string().uuid(),

  measure: z.string(),

  qty: z.z.number().nonnegative().min(1),
});

const CreateFavoriteMealSchema = z.object({
  name: z.string().min(1),

  mealFood: z.array(CreateMealFoodSchema).min(1),
});

type TCreateMealFoodDTO = z.infer<typeof CreateMealFoodSchema>;

type TCreateFavoriteMealDTO = z.infer<typeof CreateFavoriteMealSchema>;

export function useModalCreateFavoriteMealHook(
  props: ModalCreateFavoriteMealProps
) {
  const { onClose } = props;

  const { foods, isFetchingFoods } = useGetAllFoods();

  const { createFavoriteMeal, isCreatingFavoriteMeal } =
    useCreateFavoriteMeal();

  const methods = useForm<TCreateFavoriteMealDTO>({
    resolver: zodResolver(CreateFavoriteMealSchema),

    defaultValues: {
      name: '',
    },
  });

  const { control: internalControl, reset: resetInternalForm } =
    useForm<TCreateMealFoodDTO>({
      resolver: zodResolver(CreateMealFoodSchema),

      defaultValues: {
        foodId: '',
        measure: '',
        qty: 0,
      },
    });

  const watchFood = useWatch({
    control: internalControl,
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { isValid: formIsValid },
    reset,
    control,
  } = methods;

  const {
    append: appendMeals,
    remove: removeMeal,
    fields: mealFoods,
  } = useFieldArray({
    control,
    name: 'mealFood',
  });

  const foodOptions = useMemo(
    () => foods.map((food) => ({ label: food.name, value: food.id })),
    [foods]
  );

  const measureOptions = useMemo(() => {
    if (!watchFood) return [];

    if (!watchFood.foodId) return [];

    const selectedFood = foods.find((food) => food.id === watchFood.foodId);

    if (!selectedFood) return [];

    return selectedFood.measures;
  }, [foods, watchFood]);

  const handleSubmit = hookFormSubmit(async (data) => {
    const mapperMealFoods = data.mealFood.map((mealFoodUnit) => {
      const selectedFood = foods.find(
        (food) => food.id === mealFoodUnit.foodId
      )!;

      const selectedMeasure = selectedFood.measures.find(
        (measure) => measure.name === mealFoodUnit.measure
      );

      return {
        ...mealFoodUnit,
        measure: selectedMeasure ?? selectedFood.measures[0],
        options: [],
      };
    });

    const newData = {
      name: data.name,
      mealFoods: mapperMealFoods,
    };

    try {
      await createFavoriteMeal({
        name: newData.name,
        mealFoods: newData.mealFoods,
      });

      toast.success('Refeição criada com sucesso!');
    } catch {
      toast.error('Tivemos um erro ao criar');
    } finally {
      handleCloseModal();
    }
  });

  const handleAppendMealFood = useCallback(() => {
    const selectedFood = foods.find((food) => food.id === watchFood.foodId);

    if (!selectedFood) {
      return;
    }

    const selectedMeasure = selectedFood.measures.find(
      (measure) => measure.name === watchFood.measure
    );

    if (!selectedMeasure) {
      return;
    }

    if (!watchFood.qty) return;

    if (watchFood.qty < 0) return;

    appendMeals({
      foodId: selectedFood.id,
      measure: selectedMeasure.name,
      qty: watchFood.qty,
    });

    resetInternalForm();
  }, [appendMeals, foods, resetInternalForm, watchFood]);

  const handleCloseModal = useCallback(() => {
    onClose();
    reset();
    resetInternalForm();
    removeMeal();
  }, [onClose, removeMeal, reset, resetInternalForm]);

  return {
    handleCloseModal,
    handleSubmit,
    handleAppendMealFood,
    removeMeal,
    formIsValid,
    foods,
    isCreatingFavoriteMeal,
    mealFoods,
    control,
    internalControl,
    isFetchingFoods,
    foodOptions,
    measureOptions,
  };
}
