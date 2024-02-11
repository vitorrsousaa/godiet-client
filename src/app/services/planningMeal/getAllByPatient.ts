import { httpClient } from '@godiet-services/httpClient';

interface TPlanningMeal {
  id: string;
  patientId: string;
  date: string;
  meals: string[];
  name: string;
  createdAt: string;
}

export async function getAllByPatient(patientId: string) {
  const { data } = await httpClient.get<TPlanningMeal[]>(
    `/planningMeal/${patientId}`
  );

  return data;
}
