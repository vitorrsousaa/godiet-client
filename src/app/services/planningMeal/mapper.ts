import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';

interface TCreatePlanningMealToDatabase {
  name: string;
  meals: {
    name: string;
    time: string;
    observation: string;
    mealFoods: {
      foodId: string;
      name: string;
      qty: number;
      measure: {
        name: string;
        qty: number;
      };
    }[];
  }[];
}

export function mapper(
  planningMeal: TCreatePlanningMealDTO
): TCreatePlanningMealToDatabase {
  return {
    name: planningMeal.name,
    meals: planningMeal.meals.map((meal) => ({
      time: meal.time,
      name: meal.name,
      observation: meal.observation || '',
      mealFoods: meal.mealFoods.map((mealFood) => ({
        foodId: mealFood.foodId,
        name: mealFood.name,
        qty: mealFood.qty,
        measure: mealFood.measure,
      })),
    })),
  };
}
