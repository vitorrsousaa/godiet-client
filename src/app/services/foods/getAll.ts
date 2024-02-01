import { TFood } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

export async function getAll(categoryId?: string) {
  const { data } = await httpClient.get<TFood[]>(
    `/foods${categoryId && `?categoryId=${categoryId}`}`
  );

  return data;
}
