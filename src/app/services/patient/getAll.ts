import { TPatient } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

export async function getAll() {
  const { data } = await httpClient.get<TPatient[]>('/patient');

  return data;
}
