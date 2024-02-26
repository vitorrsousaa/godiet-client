import { TFood } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

interface TPlanningMeal {
  id: string;
  patientId: string;
  date: string;
  meals: string[];
  name: string;
  createdAt: string;
}

interface TPlanningMealDetails {
  id: string;
  patientId: string;
  date: string;
  meals: TMealsDetails[];
  name: string;
  createdAt: string;
}

interface TMealsDetails {
  id: string;
  name: string;
  planningMealId: string;
  time: string;
  foods: TFoodDetails[];
}

interface TFoodDetails {
  id: string;
  categoryNameId: string;
  portion: number;
  options: TFood[];
}

interface getAllByPatientParams<TPlanning> {
  patientId: string;
  planningId?: TPlanning;
}

type TPlanningMealResponse<TPlanning extends string | undefined> =
  TPlanning extends string ? TPlanningMealDetails : TPlanningMeal[];

export async function getAllByPatient<TPlanning extends string | undefined>(
  params: getAllByPatientParams<TPlanning>
) {
  const { patientId, planningId } = params;
  const { data } = await httpClient.get<TPlanningMealResponse<TPlanning>>(
    `/planningMeal/${patientId}${planningId ? `?planningId=${planningId}` : ''}`
  );

  return data;
}
