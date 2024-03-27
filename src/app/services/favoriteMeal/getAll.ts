import { TMealFood } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

interface TFavoriteMeal {
  id: string;
  name: string;
  mealFoods: TMealFood[];
}

export async function getAll() {
  const { data } = await httpClient.get<TFavoriteMeal[]>('/favoriteMeal');

  return data;
}
