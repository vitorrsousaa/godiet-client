import { httpClient } from '@godiet-services/httpClient';

interface CreateAnamnesisInput {
  anamnesis: {
    title: string;
    text: string;
  };
  patientId: string;
}

export async function create(createAnamnesisInput: CreateAnamnesisInput) {
  const { data } = await httpClient.post(
    `/anamnesis/${createAnamnesisInput.patientId}`,
    {
      title: createAnamnesisInput.anamnesis.title,
      text: createAnamnesisInput.anamnesis.text,
    }
  );

  return data;
}
