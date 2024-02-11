import { TPatient } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

export async function getById(patientId: string) {
  const { data } = await httpClient.get<TPatient>(`/patient/${patientId}`);

  return data;
}
