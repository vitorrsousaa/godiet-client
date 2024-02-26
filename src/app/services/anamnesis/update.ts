import { httpClient } from '@godiet-services/httpClient';

interface updateAnamnesisInput {
  title: string;
  text: string;
  id: string;
  patientId: string;
}

export async function update(updateAnamnesisInput: updateAnamnesisInput) {
  const { data } = await httpClient.put(
    `/anamnesis/${updateAnamnesisInput.patientId}`,
    {
      title: updateAnamnesisInput.title,
      text: updateAnamnesisInput.text,
      id: updateAnamnesisInput.id,
    }
  );

  return data;
}
