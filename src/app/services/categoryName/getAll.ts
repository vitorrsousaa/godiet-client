import { httpClient } from '@godiet-services/httpClient';

export type TCategoryName = {
  name: string;
  id: string;
  baseProtein: number;
  baseFat: number;
  baseCarbo: number;
  baseEnergy: number;
};

export async function getAll() {
  const { data } = await httpClient.get<TCategoryName[]>('/categoryName');

  return data;
}
