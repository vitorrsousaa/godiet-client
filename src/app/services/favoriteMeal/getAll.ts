import { TFood } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

interface TFavoriteMeal {
  id: string;
  name: string;
  mealFoods: {
    id: string;
    measure: {
      qty: number;
      name: string;
    };
    qty: number;
    options: [];
    food: TFood;
  }[];
}

export async function getAll() {
  const { data } = await httpClient.get<TFavoriteMeal[]>('/favoriteMeal');

  return data;
}
