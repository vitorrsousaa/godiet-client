import { httpClient } from '@godiet-services/httpClient';

interface SignupParams {
  email: string;
  password: string;
  name: string;
}

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post<{ accessToken: string }>(
    '/auth/signup',
    params
  );

  return data;
}
