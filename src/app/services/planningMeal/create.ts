import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { httpClient } from '@godiet-services/httpClient';

import { mapper } from './mapper';

export interface CreatePlanningMealInput {
  planningMeal: TCreatePlanningMealDTO;
  patientId: string;
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
