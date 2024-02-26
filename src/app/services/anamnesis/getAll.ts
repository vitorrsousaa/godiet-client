import { httpClient } from '@godiet-services/httpClient';

export type TAnamnesis = {
  title: string;
  text: string;
  id: string;
  userId: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
};

interface getAllAnamnesisInput {
  patientId: string;
}

export async function getAll(getAllAnamnesisInput: getAllAnamnesisInput) {
  const { patientId } = getAllAnamnesisInput;
  const { data } = await httpClient.get<TAnamnesis[]>(
    `/anamnesis/${patientId}`
  );

  return data;
}
