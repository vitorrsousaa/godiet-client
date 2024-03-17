import { httpClient } from '@godiet-services/httpClient';

interface removeInput {
  favoriteMealId: string;
}

export async function remove(removeInput: removeInput) {
  const { favoriteMealId } = removeInput;

  const { data } = await httpClient.delete(`/favoriteMeal/${favoriteMealId}`);

  return data;
}
