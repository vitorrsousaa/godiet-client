import { httpClient } from '@godiet-services/httpClient';

import { mapperPlanningMeal } from './mapper';

interface FoodOption {
  baseQty: number;
  foodId: string;
}

interface Food {
  id: string;
  portion: string;
  categoryId: string;
  options: FoodOption[];
}

interface Categories {
  qty: number;
  id: string;
}

interface Meal {
  categories: Categories[];
  foods: Food[];
}

interface PlanningMeal {
  name: string;
  meals: Meal[];
}

export interface CreatePlanningMealInput {
  planningMeal: PlanningMeal;
  patientId: string;
}

export async function create(createPlanningMealInput: CreatePlanningMealInput) {
  const { planningMeal, patientId } = createPlanningMealInput;

  const planningMealToDatabase = mapperPlanningMeal(planningMeal);

  const { data } = await httpClient.post(
    `/planningMeal/${patientId}`,
    planningMealToDatabase
  );

  return data;
}
