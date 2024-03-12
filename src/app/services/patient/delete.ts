import { httpClient } from '@godiet-services/httpClient';

interface IDeletePatientInput {
  patientId: string;
}

export async function remove(deletePatientInput: IDeletePatientInput) {
  const { data } = await httpClient.delete(
    `/patient/${deletePatientInput.patientId}`
  );

  return data;
}
