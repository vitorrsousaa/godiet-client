import { TCreatePlanningMealDTO } from '@godiet-pages/CreatePlanningEquivalent/CreatePlanningEquivalent.hook';
import { httpClient } from '@godiet-services/httpClient';

import { mapperPlanningMeal } from './mapper';

export interface CreatePlanningMealInput {
  planningMeal: TCreatePlanningMealDTO;
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
