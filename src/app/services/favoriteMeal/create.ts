import { httpClient } from '@godiet-services/httpClient';

interface createFavoriteMealInput {
  name: string;
  mealFoods: {
    measure: { name: string; qty: number };
    qty: number;
    foodId: string;
  }[];
}

export async function create(createFavoriteMealInput: createFavoriteMealInput) {
  const mappedFavoriteMealInput = {
    name: createFavoriteMealInput.name,
    mealFoods: createFavoriteMealInput.mealFoods.map((mealFood) => ({
      ...mealFood,
      options: [],
    })),
  };

  const { data } = await httpClient.post(
    '/favoriteMeal',
    mappedFavoriteMealInput
  );

  return data;
}
