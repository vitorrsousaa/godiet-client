import { TCreatePlanningMealDTO } from '@godiet-components/PlanningMealForm';
import { httpClient } from '@godiet-services/httpClient';

export type TEditPlanningMealDTO = TCreatePlanningMealDTO & {
  id: string;
  createdAt: string;
};

export interface UpdatePlanningMealInput {
  planningMeal: TEditPlanningMealDTO;
  patientId: string;
}

export async function update(updatePlanningMealInput: UpdatePlanningMealInput) {
  const { planningMeal, patientId } = updatePlanningMealInput;

  const mappedPlanningMeal = mapperEditPlanningMeal(planningMeal);

  const { data } = await httpClient.put(`/planningMeal/${patientId}`, {
    planningMeal: mappedPlanningMeal,
    id: planningMeal.id,
  });

  return data;
}

function mapperEditPlanningMeal(planningMeal: TEditPlanningMealDTO) {
  return {
    ...planningMeal,
    meals: planningMeal.meals.map((meal) => ({
      ...meal,
      observation: meal.observation || '',
    })),
  };
}
