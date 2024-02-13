import { httpClient } from '@godiet-services/httpClient';

interface TPlanningMeal {
  id: string;
  patientId: string;
  date: string;
  meals: string[];
  name: string;
  createdAt: string;
}

interface getAllByPatientParams {
  patientId: string;
  planningId?: string;
}

type TPlanningMealResponse<HasPlanningId extends boolean> =
  HasPlanningId extends true ? TPlanningMeal : TPlanningMeal[];

export async function getAllByPatient<T extends boolean>(
  params: getAllByPatientParams
) {
  const { patientId, planningId } = params;
  const { data } = await httpClient.get<TPlanningMealResponse<T>>(
    `/planningMeal/${patientId}${planningId ? `?planningId=${planningId}` : ''}`
  );

  return data;
}
