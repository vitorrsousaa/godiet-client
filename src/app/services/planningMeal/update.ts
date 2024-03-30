import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { httpClient } from '@godiet-services/httpClient';

import { mapper } from './mapper';

export interface UpdatePlanningMealInput {
  planningMeal: TCreatePlanningMealDTO;
  patientId: string;
}

export async function update(updatePlanningMealInput: UpdatePlanningMealInput) {
  const { planningMeal, patientId } = updatePlanningMealInput;

  const planningToDatabase = mapper(planningMeal);

  const { data } = await httpClient.put(
    `/planningMeal/${patientId}`,
    planningToDatabase
  );

  return data;
}
