import { httpClient } from '@godiet-services/httpClient';

interface removeInput {
  patientId: string;
  anamnesisId: string;
}

export async function remove(removeInput: removeInput) {
  const { anamnesisId, patientId } = removeInput;
  const { data } = await httpClient.delete(
    `/anamnesis/${patientId}/${anamnesisId}`
  );

  return data;
}
