import { httpClient } from '@godiet-services/httpClient';

interface CreateFavoriteObservationInput {
  title: string;
  text: string;
}

export async function create(
  createFavoriteObservationInput: CreateFavoriteObservationInput
) {
  const { data } = await httpClient.post(
    '/observation-template',
    createFavoriteObservationInput
  );

  return data;
}
