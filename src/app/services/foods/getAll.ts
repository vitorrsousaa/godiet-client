import { TFood } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

interface GetAllFoodParamsInput {
  categoryId?: string;
}

export async function getAll(input: GetAllFoodParamsInput) {
  const { categoryId } = input;
  const categoryParams = categoryId ? `?categoryId=${categoryId}` : '';

  const { data } = await httpClient.get<TFood[]>(`/foods${categoryParams}`);

  return data;
}
