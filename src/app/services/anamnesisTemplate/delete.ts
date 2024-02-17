import { httpClient } from '@godiet-services/httpClient';

export async function remove(anamnesisId: string) {
  const { data } = await httpClient.delete(`/anamnesisTemplate/${anamnesisId}`);

  return data;
}
