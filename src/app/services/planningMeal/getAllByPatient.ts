import { TPlanningMeal, TPlanningMealWithSummary } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

interface getAllByPatientParams<TPlanning> {
  patientId: string;
  planningId?: TPlanning;
}

type TPlanningMealResponse<TPlanning extends string | undefined> =
  TPlanning extends string ? TPlanningMeal : TPlanningMealWithSummary[];

export async function getAllByPatient<TPlanning extends string | undefined>(
  params: getAllByPatientParams<TPlanning>
) {
  const { patientId, planningId } = params;
  const { data } = await httpClient.get<TPlanningMealResponse<TPlanning>>(
    `/planningMeal/${patientId}${planningId ? `?planningId=${planningId}` : ''}`
  );

  return data;
}
