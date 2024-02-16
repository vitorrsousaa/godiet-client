import { httpClient } from '@godiet-services/httpClient';

export type TAnamnesisTemplate = {
  title: string;
  text: string;
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export async function getAll() {
  const { data } =
    await httpClient.get<TAnamnesisTemplate[]>('/anamnesisTemplate');

  return data;
}
