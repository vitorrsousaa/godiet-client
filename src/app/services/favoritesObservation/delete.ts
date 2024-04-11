import { httpClient } from '@godiet-services/httpClient';

interface RemoveInput {
  favoriteObservationId: string;
}

export async function remove(input: RemoveInput) {
  const { favoriteObservationId } = input;

  const data = await httpClient.delete(
    `/observation-template/${favoriteObservationId}`
  );

  return data;
}
