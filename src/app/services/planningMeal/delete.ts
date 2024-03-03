import { httpClient } from '@godiet-services/httpClient';

interface removeInput {
  patientId: string;
  planningMealId: string;
}

export async function remove(removeInput: removeInput) {
  const { planningMealId, patientId } = removeInput;
  const { data } = await httpClient.delete(
    `/planningMeal/${patientId}?planningMealId=${planningMealId}`
  );

  return data;
}
