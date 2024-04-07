import { httpClient } from '@godiet-services/httpClient';

export async function getAll() {
  const { data } = await httpClient.get('/observation-template');

  return data;
}
