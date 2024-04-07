import { TFavoritesObservation } from '@godiet-entities';
import { httpClient } from '@godiet-services/httpClient';

export async function getAll() {
  const { data } = await httpClient.get<TFavoritesObservation[]>(
    '/observation-template'
  );

  return data;
}
