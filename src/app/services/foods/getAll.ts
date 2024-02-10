import { TFood } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

interface GetAllFoodParamsInput {
  categoryId?: string;
  portion?: number;
}

export async function getAll(input: GetAllFoodParamsInput) {
  const { categoryId, portion } = input;
  const categoryParams = categoryId ? `?categoryId=${categoryId}` : '';
  const portionParams = portion ? `&portion=${portion}` : '';

  const { data } = await httpClient.get<TFood[]>(
    `/foods${categoryParams}${portionParams}`
  );

  return data;
}
