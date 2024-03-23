import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanning/CreatePlanning.hook';
import { httpClient } from '@godiet-services/httpClient';

export interface CreatePlanningMealInput {
  planningMeal: TCreatePlanningMealDTO;
  patientId: string;
}

interface TCreatePlanningMeal {
  name: string;
  meals: {
    name: string;
    time: string;
    mealFoods: {
      foodId: string;
      name: string;
      qty: number;
      measure: {
        name: string;
        qty: number;
      };
      options: [];
    }[];
  }[];
}

export async function create(createPlanningMealInput: CreatePlanningMealInput) {
  const { planningMeal, patientId } = createPlanningMealInput;

  const planningToDatabase = mapper(planningMeal);

  const { data } = await httpClient.post(
    `/planningMeal/${patientId}`,
    planningToDatabase
  );

  return data;
}

function mapper(planningMeal: TCreatePlanningMealDTO): TCreatePlanningMeal {
  return {
    name: planningMeal.name,
    meals: planningMeal.meals.map((meal) => ({
      time: meal.time,
      name: meal.name,
      mealFoods: meal.mealFoods.map((mealFood) => ({
        foodId: mealFood.foodId,
        name: mealFood.name,
        qty: mealFood.qty,
        measure: mealFood.measure,
        options: [],
      })),
    })),
  };
}
