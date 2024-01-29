import { type User } from '@godiet-entities';

import { httpClient } from '../httpClient';

type MeResponse = User;

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/user/me');

  return data;
}
